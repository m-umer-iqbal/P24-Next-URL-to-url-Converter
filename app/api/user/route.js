import connectDB from "@/db/connectDB";
import { User } from "@/models/user.models";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectDB();
    const query = await request.json();
    try {
        const user = await User.findOne({ provider: query.provider, openId: query.openId })
        if (user) {
            return NextResponse.json({
                success: true,
                user
            })
        }
    } catch (error) {
        return NextResponse.json({
            success: true,
            message: error
        })
    }
}