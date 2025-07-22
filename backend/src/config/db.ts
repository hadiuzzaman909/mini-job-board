import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URI as string); 
        console.log("MongoDB connected...");
    } catch (err: any) {
        console.error("Database connection failed:", err.message);
        process.exit(1);  
    }
};

export default connectDB;