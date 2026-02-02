import fs from "fs/promises";
import path from "path";
import Product from "../models/Product.js";

export async function seedProductsIfEmpty() {
  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(`ℹ️ Products already exist (${count}). Skipping seed.`);
    return;
  }

  console.log("🌱 Seeding products from Mini Project 2 data...");

  const filePath = path.resolve("data/products.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const products = JSON.parse(raw);

  const mapped = products.map((p, index) => ({
    externalId: index + 1,
    name: p.name || p.title,
    price: Number(p.price),
    description: p.description || "",
    category: p.category || "general",
    image: p.image || ""
  }));

  await Product.insertMany(mapped);
  console.log(`✅ Seeded ${mapped.length} products from Project 2.`);
}
