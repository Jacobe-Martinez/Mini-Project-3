import Quote from "../models/Quote.js";

// READ all
export async function getAllQuotes(req, res) {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({ result: 200, data: quotes });
  } catch (err) {
    res.status(500).json({ result: 500, error: err.message });
  }
}

// READ one
export async function getQuoteById(req, res) {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ result: 404, error: "Quote not found" });
    res.json({ result: 200, data: quote });
  } catch (err) {
    res.status(400).json({ result: 400, error: "Invalid quote id" });
  }
}

// CREATE
export async function createQuote(req, res) {
  try {
    const { name, email, itemType, quantity, details } = req.body;

    if (!name || !email || !itemType || !quantity) {
      return res.status(400).json({ result: 400, error: "Missing required fields" });
    }

    const created = await Quote.create({
      name,
      email,
      itemType,
      quantity,
      details
    });

    res.status(201).json({ result: 201, data: created });
  } catch (err) {
    res.status(500).json({ result: 500, error: err.message });
  }
}

// UPDATE
export async function updateQuote(req, res) {
  try {
    const updated = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ result: 404, error: "Quote not found" });
    res.json({ result: 200, data: updated });
  } catch (err) {
    res.status(400).json({ result: 400, error: "Invalid quote id" });
  }
}

// DELETE
export async function deleteQuote(req, res) {
  try {
    const deleted = await Quote.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ result: 404, error: "Quote not found" });
    res.json({ result: 200, data: deleted });
  } catch (err) {
    res.status(400).json({ result: 400, error: "Invalid quote id" });
  }
}

