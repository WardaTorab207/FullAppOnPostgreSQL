// src/index.ts
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import Routes from "./routes/index";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Data Source has been initialized!");
app.use("/uploads", express.static("src/uploads")); // 👈
    app.use("/", Routes);
    
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Data Source initialization error:", error);
  });
