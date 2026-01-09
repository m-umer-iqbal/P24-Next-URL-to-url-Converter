import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    provider: {
        type: String,
        required: true
    },
    openId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: [50, "Email can be longer than 30 characters"] // Increased for safety
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: [20, "Max Character only 20"]
    },
    name: {
        type: String,
        required: true,
        maxLength: [30, "Max Character only 30"]
    },
    image: {
        type: String
    }
}, { timestamps: true }); // Good practice to track when users sign up

export const User = mongoose.models.User || mongoose.model("User", userSchema)