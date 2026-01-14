"use client"

import React, { useRef, useState, useEffect, useContext } from 'react'
import { useRouter } from "next/navigation"
import { signInUserContext } from "@/context/context"
import Image from "next/image"

const Profile = () => {
    const [avatarName, setAvatarName] = useState(null)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const [originalAvatarName, setOriginalAvatarName] = useState('')
    const [originalName, setOriginalName] = useState('')
    const [originalUsername, setOriginalUsername] = useState('')
    const [originalEmail, setOriginalEmail] = useState('')

    const [editing, setEditing] = useState(false)
    const [uploading, setUploading] = useState(false)

    const { signInUser } = useContext(signInUserContext)
    const router = useRouter()
    const [render, setRender] = useState(false)

    useEffect(() => {
        const checkUser = async () => {
            if (signInUser?.status === false) {
                setRender(false)
                router.push("/signin")
            } else {
                setRender(true)
                await fetchProfile();
            }
        }
        checkUser()
    }, [signInUser])

    const avatarInputRef = useRef(null)

    // Character limits
    const limits = {
        name: 30,
        username: 30,
        email: 50,
    }

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            setAvatarName(file)
        }
    }

    const triggerAvatarPicker = () => {
        if (avatarInputRef.current) {
            avatarInputRef.current.click()
        }
    }

    const fetchProfile = async () => {
        try {
            const response = await fetch(`/api/users?provider=${signInUser.provider}&openId=${signInUser.openId}`, { cache: "no-store" })
            const data = await response.json()
            if (data.success) {
                setOriginalName(data.user.name)
                setOriginalUsername(data.user.username)
                setOriginalEmail(data.user.email)
                setOriginalAvatarName(data.user.image || "")

                setName(data.user.name)
                setUsername(data.user.username)
                setEmail(data.user.email)
            } else {
                setRender(false)
                router.push("/signin")
            }
        } catch (error) {
            console.log(error)
            setRender(false)
            setTimeout(() => {
                router.push("/signin")
            }, 2000);
        }
    }

    const handleUpdate = async () => {
        // Check if anything changed
        const hasChanged =
            name !== originalName ||
            username !== originalUsername ||
            email !== originalEmail ||
            (avatarName instanceof File && avatarName.size > 0); // Check if it's actually a file with content

        if (!hasChanged) {
            console.log("No changes detected")
            setEditing(false)
            return
        }

        setUploading(true)

        try {
            const formData = new FormData()

            // Add text fields
            formData.append("name", name)
            formData.append("username", username)
            formData.append("email", email)

            // Add file if selected
            if (avatarName instanceof File && avatarName.size > 0) {
                formData.append("avatar", avatarName)
            }

            const response = await fetch(
                `/api/users/update?provider=${signInUser.provider}&openId=${signInUser.openId}`,
                {
                    method: "POST",
                    body: formData,
                }
            )

            const data = await response.json()

            if (data.success) {
                // Update local state with new data
                setOriginalName(data.user.name)
                setOriginalUsername(data.user.username)
                setOriginalEmail(data.user.email)
                setOriginalAvatarName(data.user.image || '')

                // Reset file state
                setAvatarName(null)
                setEditing(false)
            } else {
                console.log("Update failed: " + data.message)
            }
        } catch (error) {
            console.error("Update failed:", error)
        } finally {
            setUploading(false)
        }
    }

    const resetForm = () => {
        setName(originalName)
        setUsername(originalUsername)
        setEmail(originalEmail)
        setAvatarName(null)
        setEditing(false)
    }

    if (!render) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#30e849] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        )
    }

    return (
        <section className="text-gray-800 body-font flex justify-center items-start min-h-full">
            <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Header + summary */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        {/* Profile image */}
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className="relative h-20 w-20 rounded-full bg-[#30e84930] flex items-center justify-center text-2xl font-semibold text-black shadow-md overflow-hidden">
                                {avatarName instanceof File ? (
                                    <Image
                                        src={URL.createObjectURL(avatarName)}
                                        alt="Preview"
                                        width={80}
                                        height={80}
                                        style={{ height: '80px', width: '80px' }}
                                        className="rounded-full object-cover"
                                        unoptimized // Necessary for blob URLs
                                    />
                                ) : originalAvatarName ? (
                                    <Image
                                        src={originalAvatarName}
                                        alt="Profile"
                                        width={80}
                                        height={80}
                                        style={{ height: '80px', width: '80px' }}
                                        className="rounded-full object-cover"
                                        loading="eager"
                                    />
                                ) : (
                                    <span>{originalName ? originalName.charAt(0).toUpperCase() : "DP"}</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{originalName || "My Profile"}</h1>
                            <p className="text-sm text-gray-600">
                                {`@${originalUsername || "username"}`}
                            </p>
                        </div>
                    </div>
                    {!editing && (<button className="inline-flex items-center text-sm font-semibold text-white bg-[#30e849] border-2 border-[#30e849] py-2 px-5 rounded shadow-md hover:bg-black hover:border-black transition-all duration-300 cursor-pointer" onClick={() => {
                        setEditing(true)
                    }}>
                        Edit profile
                    </button>
                    )}
                </div>

                <div className="grid gap-8 lg:grid-cols-[2fr,1.2fr]">
                    {/* Left: profile form */}
                    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account details</h2>

                        <form className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <div className="relative">
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        maxLength={limits.name}
                                        className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 pr-16 text-sm outline-none focus:border-[#30e849] focus:ring-2 focus:ring-[#30e84930] transition-colors"
                                        disabled={editing ? false : true}
                                    />
                                    {editing && (
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                                            {name.length}/{limits.name}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <div className="flex rounded-lg border border-gray-300 bg-white/70 focus-within:border-[#30e849] focus-within:ring-2 focus-within:ring-[#30e84930] transition-colors relative">
                                    <span className="inline-flex items-center px-3 text-sm text-gray-500 border-r border-gray-200">
                                        @
                                    </span>
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="your-handle"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        maxLength={limits.username}
                                        className="w-full px-3 py-2 pr-16 text-sm outline-none bg-transparent"
                                        disabled={editing ? false : true}
                                    />
                                    {editing && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                                        {username.length}/{limits.username}
                                    </span>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        maxLength={limits.email}
                                        className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 pr-16 text-sm outline-none focus:border-[#30e849] focus:ring-2 focus:ring-[#30e84930] transition-colors"
                                        disabled={editing ? false : true}
                                    />
                                    {editing && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                                        {email.length}/{limits.email}
                                    </span>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="profileImageDisplay" className="block text-sm font-medium text-gray-700 mb-1">
                                    Profile picture
                                </label>
                                <div className="flex rounded-lg border border-gray-300 bg-white/70 focus-within:border-[#30e849] focus-within:ring-2 focus-within:ring-[#30e84930] transition-colors">
                                    <input
                                        id="profileImageDisplay"
                                        type="text"
                                        readOnly
                                        // Show current image URL when not editing, show filename when editing with file selected
                                        value={
                                            editing
                                                ? (avatarName instanceof File
                                                    ? avatarName.name
                                                    : originalAvatarName || 'No file selected')
                                                : originalAvatarName || 'No image uploaded'
                                        }
                                        className="w-full px-3 py-2 text-sm outline-none bg-transparent text-gray-700 truncate"
                                        disabled={true} // Always disabled since it's read-only
                                    />
                                    {editing && <button
                                        type="button"
                                        onClick={triggerAvatarPicker}
                                        className="inline-flex items-center rounded-lg rounded-l-none px-4 py-2 text-xs font-semibold text-white bg-[#30e849] border border-[#30e849] hover:bg-black hover:border-black transition-colors cursor-pointer">
                                        Upload
                                    </button>}
                                </div>
                                <input
                                    ref={avatarInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>

                            {editing && (
                                <div className="flex flex-wrap items-center gap-3 pt-2">
                                    <button
                                        type="button"
                                        disabled={uploading}
                                        className="inline-flex items-center justify-center rounded bg-[#30e849] px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-black hover:border-black border-2 border-[#30e849] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleUpdate}>
                                        {uploading ? "Updating..." : "Update changes"}
                                    </button>
                                    <button
                                        type="button"
                                        disabled={uploading}
                                        className="inline-flex items-center justify-center rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={resetForm}>
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile