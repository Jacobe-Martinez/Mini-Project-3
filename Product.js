import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    externalId: { type: Number, index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "general" },
    image: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

