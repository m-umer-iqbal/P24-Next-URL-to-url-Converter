import connectDB from "@/db/connectDB";
import { User } from "@/models/user.models";
import { NextResponse } from "next/server";

await connectDB();

// Get users
export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const provider = searchParams.get("provider")
    const openId = searchParams.get("openId")
    try {
        const user = await User.findOne({ provider, openId })
        if (user) {
            return NextResponse.json({
                success: true,
                message: "User found",
                user
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "User not found"
            })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message || "An error occurred"
        })
    }
}