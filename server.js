import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quotesRoutes from "./routes/quotesRoutes.js";

import { dbConnect } from "./dbConnect.js";
import { seedProductsIfEmpty } from "./services/seedProducts.js";
import productsRoutes from "./routes/productsRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Mini Project 3 API running ✅");
});

// MVC Routes
app.use("/api/products", productsRoutes);
app.use("/api/quotes", quotesRoutes);


const PORT = process.env.PORT || 8080;

async function start() {
  await dbConnect(process.env.MONGODB_URI);

  // External API -> Database seed routine
  await seedProductsIfEmpty();

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("❌ Startup failed:", err);
  process.exit(1);
});

