import connectDB from "@/db/connectDB";
import { Url } from "@/models/url.models";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const openId = searchParams.get("openId");

    try {
        if (!openId) {
            return NextResponse.json(
                { success: false, message: "openId required" },
                { status: 400 }
            );
        }

        const urls = await Url.find({ openId })
        console.log("fetched urls:", urls)

        return NextResponse.json({
            success: true,
            message: "urls fetched successfully",
            urls
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}