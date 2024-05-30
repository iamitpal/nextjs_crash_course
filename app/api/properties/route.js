import connectDB from "@/config/database";
import Property from "@/models/Property";
import cloudinary from "@/config/cloudinary";
import { authOptions } from "@/utils/authOptions";
import { getSessionUser } from "@/utils/getSessionUser";
import { getServerSession } from "next-auth/next";

//GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return Response.json(properties);
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

    //Access all values from the amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images").filter((image) => image.name !== "");
    // console.log(amenities, images);

    //Create propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    //upload images to cloudinary
    // const imageUploadPromises = images.map((image) => cloudinary.uploader.upload(image));
    // const imageUploadResults = await Promise.all(imageUploadPromises);

    const imageUploadPromises = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      //convert imageData to base64
      const imageBase64 = imageData.toString("base64");

      //make request to upload to cloudinary
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
        folder: "propertypulse",
      });

      //add result to imageUploadPromises array
      imageUploadPromises.push(result.secure_url);

      //wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      //add uploaded images to propertyData object
      propertyData.images = uploadedImages;
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);

    // return new Response(JSON.stringify({ message: "Property created successfully" }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create property", { status: 500 });
  }
};
