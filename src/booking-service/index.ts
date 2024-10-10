import express from "express";
import router from "./routes.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {userSchema} from '../models/userModel.js';
import {flightSchema} from '../models/flightModel.js';

dotenv.config();

const app = express();
app.use('/api/bookings',router);


const connectDB = async () => {
    try {
        const databaseURI = process.env.MONGODB_URI;
        if(databaseURI) {    
            await mongoose.connect(databaseURI);
            mongoose.model('User', userSchema);
            mongoose.model('Flight', flightSchema);
        } else {
            console.log("Database URI missing from enviromental variables");
        }
    } catch(error) {
        console.log("Error in Database connection", error);
    }
}

export {app, connectDB};