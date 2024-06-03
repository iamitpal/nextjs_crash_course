import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//GET /api/bookmarks
export const GET = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { userId } = sessionUser;

    //Find user in database
    const user = await User.findOne({ _id: userId });

    //Get bookmarks from user
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { userId } = sessionUser;

    //Find user in database
    const user = await User.findOne({ _id: userId });

    //check if property is already bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookmarked) {
      //if already bookmarked, remove from bookmarks
      user.bookmarks.pull(propertyId);
      message = "Property removed successfully";
      isBookmarked = false;
    } else {
      //if not bookmarked, add to bookmarks
      user.bookmarks.push(propertyId);
      message = "Property added to bookmarks";
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
