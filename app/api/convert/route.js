import connectDB from "@/db/connectDB";
import { Url } from "@/models/url.models";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB();

    try {
        const { originalUrl, preferWord, openId } = await request.json();
        /* ---------------- Validation ---------------- */
        if (!originalUrl || !preferWord || !openId) {
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
        const url = await Url.findOne({ preferWord: cleanWord })
        if (url) {
            return NextResponse.json({
                success: false,
                message: "url already exists"
            }, { status: 400 })
        }

        const shortUrl = `${process.env.NEXT_PUBLIC_HOST}/${cleanWord}`
        const newUrl = await Url.create({
            openId: openId,
            originalUrl: cleanUrl,
            preferWord: cleanWord,
            shortUrl: shortUrl
        })

        return NextResponse.json({
            success: true,
            message: "URL converted successfully",
            shortUrl: shortUrl,
            originalUrl: cleanUrl
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message || "An error occurred while converting URL"
        }, { status: 500 })
    }
}