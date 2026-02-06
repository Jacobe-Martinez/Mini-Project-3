import fs from "fs/promises";
import path from "path";
import Product from "../models/Product.js";

async function seedExternalProductsIfMissing() {
  const externalCount = await Product.countDocuments({ source: "external" });
  if (externalCount > 0) {
    console.log(`ℹ️ External API products already exist (${externalCount}). Skipping external seed.`);
    return;
  }

  console.log("🌍 Fetching products from Fake Store API...");

  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error(`Fake Store API error: ${res.status}`);

    const products = await res.json();

    const mapped = products.map((p) => ({
      source: "external",
      externalId: p.id,
      name: p.title,
      price: Number(p.price),
      description: p.description || "",
      category: p.category || "general",
      image: p.image || ""
    }));

    await Product.setTimeout?.(10000); 
    await Product.insertMany(mapped, { ordered: false });

    console.log(`✅ Seeded ${mapped.length} products from Fake Store API.`);
  } catch (error) {
    console.error("❌ Failed to seed products from external API:", error.message);
  }
}

async function seedLocalProductsIfMissing() {
  
  const localCount = await Product.countDocuments({
    $or: [{ source: "local" }, { source: { $exists: false } }]
  });

  if (localCount > 0) {
    console.log(`ℹ️ Local products already exist (${localCount}). Skipping local seed.`);
    return;
  }

  console.log("📁 Seeding products from local products.json...");

  const filePath = path.resolve(process.cwd(), "data", "products.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const products = JSON.parse(raw);

  // local 
  const mapped = products.map((p) => ({
    source: "local",
    externalId: p.id, 
    name: p.name,
    price: Number(p.price),
    description: p.description || "",
    category: p.category || "general",
    image: p.image || ""
  }));

  try {
    await Product.insertMany(mapped, { ordered: false });
    console.log(`✅ Seeded ${mapped.length} local products.`);
  } catch (error) {
    console.error("❌ Failed to seed local products:", error.message);
  }
}

export async function seedProductsIfEmpty() {

  await seedExternalProductsIfMissing();

  await seedLocalProductsIfMissing();
}

