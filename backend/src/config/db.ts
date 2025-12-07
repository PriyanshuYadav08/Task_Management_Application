// src/config/db.ts
import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not defined in .env");

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // fail fast for debugging
      socketTimeoutMS: 45000,
      // tls: true, // usually not required; Atlas SRV enforces TLS automatically
    });
    console.log("✅ Connected to MongoDB");
  } catch (err: any) {
    console.error("❌ MongoDB connection failed:", err);
    // print helpful hints
    if (err.message?.includes("ENOTFOUND") || err.message?.includes("failed to connect to server")) {
      console.error("→ Check Atlas IP Access List (whitelist) or your network/DNS.");
    }
    process.exit(1);
  }
}