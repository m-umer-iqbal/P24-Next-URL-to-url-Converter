import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    openId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxLength: [30, "Max Character only 30"]
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        maxLength: [20, "Max Character only 20"]
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        maxLength: [50, "Email can be longer than 30 characters"] // Increased for safety
    },
    image: {
        type: String
    }
}, { timestamps: true }); // Good practice to track when users sign up

export const User = mongoose.model("User", userSchema)