// backend/src/config/db.ts
import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not defined in .env");

  try {
    await mongoose.connect(uri, {
      // optional, helpful for debugging
      // serverSelectionTimeoutMS: 5000
    });
    console.log("✅ Connected to MongoDB");
  } catch (err: any) {
    console.error("❌ MongoDB connection failed:", err);
    if (err.code === 'ENOTFOUND' || err.message?.includes('ENOTFOUND')) {
      console.error("→ DNS lookup failed for the host in MONGODB_URI. Check the host value and ensure it matches your Atlas cluster host (e.g. cluster0.abcd1.mongodb.net).");
    }
    process.exit(1);
  }
}