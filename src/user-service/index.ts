import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import router from './userRoutes.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

const PORT = process.env.USER_SERVICES_PATH || 3001;
app.use(express.json());
app.use('/api/users',router);

const connectDB = async () => {
    try {
        if(process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log("Connected to the DB")
        } else {
          console.log("Database Server URL not found in .env file")
          process.exit(1);
        }
    } catch (error) {
      console.log("Error in connecting to the DB", error)
      process.exit(1);
    }
}
app.listen(PORT, () => {
    console.log(`the user server is open at port: ${PORT}`)
})

export {app, connectDB};