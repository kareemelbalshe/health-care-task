import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_CLOUD_URI || process.env.MONGO_URI
    );
    console.log("connect To MongoDB ^_^");
  } catch (error) {
    console.log("connect Failed ", error);
  }
};
