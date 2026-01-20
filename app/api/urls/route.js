import connectDB from "@/db/connectDB";
import { Url } from "@/models/url.models";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const openId = searchParams.get("openId");

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
    const skip = (page - 1) * limit;

    try {
        if (!openId) {
            return NextResponse.json(
                { success: false, message: "openId required" },
                { status: 400 }
            );
        }

        const [urls, total] = await Promise.all([
            Url.find({ openId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Url.countDocuments({ openId })
        ]);


        return NextResponse.json({
            success: true,
            message: "urls fetched successfully",
            urls,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1
            }
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}