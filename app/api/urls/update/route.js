import connectDB from "@/db/connectDB";
import { Url } from "@/models/url.models";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const urlId = searchParams.get("urlId");
    const originalUrl = searchParams.get("originalUrl");
    const preferWord = searchParams.get("preferWord");

    try {
        const { originalUrl, preferWord } = await request.json();
        /* ---------------- Validation ---------------- */
        if (!originalUrl || !preferWord || !urlId) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const cleanUrl = originalUrl.trim().toLowerCase();
        const cleanWord = preferWord.trim().toLowerCase();

        // Validate URL format
        try {
            new URL(cleanUrl);
        } catch {
            return NextResponse.json(
                { success: false, message: "Invalid URL format" },
                { status: 400 }
            );
        }
        // Check if the preferWord is already taken by ANOTHER URL
        const existingUrl = await Url.findOne({ preferWord: cleanWord, _id: { $ne: urlId } })
        if (existingUrl) {
            return NextResponse.json({
                success: false,
                message: "Prefer word already exists"
            }, { status: 400 })
        }

        const shortUrl = `${process.env.NEXT_PUBLIC_HOST}/${cleanWord}`
        const updatedUrl = await Url.findByIdAndUpdate(urlId, {
            originalUrl: cleanUrl,
            preferWord: cleanWord,
            shortUrl: shortUrl
        }, { new: true })

        if (!updatedUrl) {
            return NextResponse.json({
                success: false,
                message: "URL not found"
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: "URL updated successfully",
            url: updatedUrl
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}