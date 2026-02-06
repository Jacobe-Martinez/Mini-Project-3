import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // for external products
    externalId: { type: Number, index: true },

    // indicates whether the product is from our local database/ external api
    source: { type: String, enum: ["local", "external"], default: "local", index: true },

    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "general" },
    image: { type: String, default: "" }
  },
  { timestamps: true }
);

// prevents duplicates
productSchema.index({ source: 1, externalId: 1 }, { unique: true, sparse: true });

export default mongoose.model("Product", productSchema);
