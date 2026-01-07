import mongoose from "mongoose"

const urlSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    originalUrl: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    preferWord: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    shortUrl: {
        type: String,
        required: true,
        lowercase: true
    }
}, { timestamps: true })

export const Url = mongoose.model("Url", urlSchema)