import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Connection Error: ", err);
  }
};

export default connectDB;
