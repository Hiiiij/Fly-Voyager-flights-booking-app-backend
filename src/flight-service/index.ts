import express from "express";
import mongoose from "mongoose";
import router from "./flightRoutes.js";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;
const app = express();
app.use(express.json()); // Middleware for parsing JSON bodies
app.use("/api/flights", router);

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    const db = await mongoose.connect(mongoUri);
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB:", isConnected);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export { app, connectDB };