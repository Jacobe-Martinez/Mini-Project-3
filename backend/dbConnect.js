import mongoose from "mongoose";

export default async function dbConnect(uri) {
  if (!uri) throw new Error("Missing MongoDB connection URI");

  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(uri);
}
