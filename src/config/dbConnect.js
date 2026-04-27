import "dotenv/config";
import mongoose from "mongoose";

const url = process.env.DB_STRING;

export default async function dbConnect() {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Failed to connect: ${error}`);
  }
}