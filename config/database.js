import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true); //ensures that fields that are specifies in our schema only those fields will be there in our db.

  //if the database is already connected don't connect again
  if (connected) {
    console.log("MongoDB is Already connected");
    return;
  }

  //connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected....");
    // await mongoose.connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
