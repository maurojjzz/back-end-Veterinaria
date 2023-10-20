import mongoose from 'mongoose';
import * as dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.DB_URI!)
        console.log('Connected to MongoDB to database: ', db.connection.name)
    } catch (error) {
        console.log('Error:', error)
    }
}