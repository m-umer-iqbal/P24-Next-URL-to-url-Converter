import mongoose from "mongoose";
import { DB_NAME } from "../constants";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}`
        );

        isConnected = true;

        console.log(
            `MongoDB connected\nDB Host: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
