import connectDB from "@/db/connectDB";
import { User } from "@/models/user.models";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

await connectDB();

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider")
    const openId = searchParams.get("openId")

    try {
        // Parse form data
        const formData = await request.formData();

        // Get form fields
        const name = formData.get("name");
        const username = formData.get("username");
        const email = formData.get("email");
        const file = formData.get("avatar");

        // Find user
        const user = await User.findOne({ provider, openId });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        // Prepare update data
        const updateData = {};

        // Update text fields if provided
        if (name && name !== user.name)
            updateData.name = name;
        if (username && username !== user.username)
            updateData.username = username;
        if (email && email !== user.email)
            updateData.email = email;

        // In the API route POST function, add better validation for file upload:
        if (file && file.size > 0 && file.name) {
            // Only proceed if file has content and a name

            // Convert file to buffer
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Check file type
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!validImageTypes.includes(file.type)) {
                return NextResponse.json({
                    success: false,
                    message: "Invalid image type. Please upload JPEG, PNG, GIF, or WebP."
                }, { status: 400 });
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                return NextResponse.json({
                    success: false,
                    message: "Image size too large. Maximum size is 5MB."
                }, { status: 400 });
            }

            // Upload to Cloudinary
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'user-avatars',
                        transformation: [
                            { width: 80, height: 80, crop: "fill" },
                            { quality: "auto" }
                        ]
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });

            // Store Cloudinary URL in updateData
            updateData.image = uploadResult.secure_url;

            // Optional: Also store the public_id for future management
            // updateData.cloudinaryPublicId = uploadResult.public_id;
        }

        // Update user if there are changes
        if (Object.keys(updateData).length > 0) {
            const updatedUser = await User.findOneAndUpdate(
                { provider, openId },
                { $set: updateData },
                { new: true }
            );

            return NextResponse.json({
                success: true,
                message: "Profile updated successfully",
                user: updatedUser
            });
        } else {
            return NextResponse.json({
                success: true,
                message: "No changes detected",
                user: user
            });
        }

    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({
            success: false,
            message: error.message || "An error occurred while updating profile"
        }, { status: 500 });
    }
}