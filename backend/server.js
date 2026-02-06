import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import dbConnect from "./dbConnect.js";
import productsRoutes from "./routes/productsRoutes.js";
import quotesRoutes from "./routes/quotesRoutes.js";
import { seedProductsIfEmpty } from "./services/seedProducts.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Mini Project 3 API running");
});

 // MVC Routes
app.use("/api/products", productsRoutes);
app.use("/api/quotes", quotesRoutes);

// Config
const PORT = process.env.PORT || 8080;

async function start() {
  
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ Missing MONGODB_URI in .env");
    process.exit(1);
  }

  try {
    // connects to DB 1st
    await dbConnect(uri);
    console.log("✅ Connected to MongoDB");

    await seedProductsIfEmpty();

    // starts server
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err.message);
    process.exit(1);
  }
}

start();
