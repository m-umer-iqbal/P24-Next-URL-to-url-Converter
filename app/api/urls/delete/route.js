import connectDB from "@/db/connectDB";
import { Url } from "@/models/url.models";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const urlId = searchParams.get("urlId");

    try {
        if (!urlId) {
            return NextResponse.json(
                { success: false, message: "urlId required" },
                { status: 400 }
            );
        }

        const deletedUrl = await Url.findOneAndDelete({ _id: urlId })

        return NextResponse.json({
            success: true,
            message: "url deleted successfully",
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}