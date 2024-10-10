import express from "express";
import router from "./flightRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// const PORT = 3002;
//middleware handling json request
// app.use(express.json());
//connect to database for flights
app.use("/api/flights", router);

// MongoDB connection logic
const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(mongoUri == null ? "" : mongoUri);
    console.log("Connected to the DB");
  } catch (e) {
    console.error(e);
  }
};
const PORT = process.env.USER_SERVICES_PATH || 3002;

// app.listen(PORT, () => {
//     console.log(`the user server is open at port: ${PORT}`)
// })

export { app, connectDB };
