import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URL || "";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let isConnected: boolean = false; // Track the connection status globally

export async function mongoConnect() {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("✅ Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
