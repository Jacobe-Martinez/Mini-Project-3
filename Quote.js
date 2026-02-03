import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    itemType: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    details: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
