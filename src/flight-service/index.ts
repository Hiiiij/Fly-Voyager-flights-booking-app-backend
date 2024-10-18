// index.ts
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import router from "./flightRoutes.js";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;
const app = express();

// Built-in middleware for parsing JSON and URL-encoded bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  if (req.body && Object.keys(req.body).length) {
    console.log('Request Body:', req.body);
  }
  next();
};

app.use(loggingMiddleware);

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use("/api/flights", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    type: err.type,
    path: req.path,
    method: req.method,
    body: req.body
  });

  // Handle JSON parsing errors
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ 
      error: 'Bad Request',
      message: 'Invalid JSON payload'
    });
  }

  // Handle other specific error types
  if (err.type === 'stream.not.readable') {
    return res.status(400).json({ 
      error: 'Bad Request',
      message: 'Request stream is not readable'
    });
  }

  // Default error response
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Database connection
const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in env variables");
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

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});

export { app, connectDB };