import Product from "../models/Product.js";

// read all
export async function getAllProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ result: 200, data: products });
  } catch (err) {
    res.status(500).json({ result: 500, error: err.message });
  }
}

// read one
export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ result: 404, error: "Product not found" });
    res.json({ result: 200, data: product });
  } catch (err) {
    res.status(400).json({ result: 400, error: "Invalid product id" });
  }
}

// create
export async function createProduct(req, res) {
  try {
    const { name, price, description, category, image } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ result: 400, error: "name and price are required" });
    }

    const created = await Product.create({
      name,
      price,
      description,
      category,
      image
    });

    res.status(201).json({ result: 201, data: created });
  } catch (err) {
    res.status(500).json({ result: 500, error: err.message });
  }
}

// update
export async function updateProduct(req, res) {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ result: 404, error: "Product not found" });
    res.json({ result: 200, data: updated });
  } catch (err) {
    res.status(400).json({ result: 400, error: "Invalid product id" });
  }
}

// delete
export async function deleteProduct(req, res) {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ result: 404, error: "Product not found" });
    res.json({ result: 200, data: deleted });
  } catch (err) {
    res.status(400).json({ result: 400, error: "Invalid product id" });
  }
}
