import mongoose from "mongoose"

const urlSchema = new mongoose.Schema({
    openId: {
        type: String,
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

export const Url = mongoose.models.Url || mongoose.model("Url", urlSchema);