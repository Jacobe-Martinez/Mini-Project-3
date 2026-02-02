import mongoose from "mongoose";

export async function dbConnect(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");
}
