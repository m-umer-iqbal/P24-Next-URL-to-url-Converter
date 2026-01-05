'use client'

import React, { useRef, useState } from 'react'

const Profile = () => {
    const [avatarName, setAvatarName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [editing, setEditing] = useState(false)

    const avatarInputRef = useRef(null)

    // Character limits
    const limits = {
        firstName: 50,
        lastName: 50,
        username: 30,
        email: 100,
    }

    const handleAvatarChange = (event) => {
        const file = event.target.files && event.target.files[0]
        setAvatarName(file ? file.name : '')
    }

    const triggerAvatarPicker = () => {
        if (avatarInputRef.current) {
            avatarInputRef.current.click()
        }
    }

    return (
        <section className="text-gray-800 body-font flex justify-center items-start min-h-full">
            <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Header + summary */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        {/* Profile image + edit */}
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className="relative h-20 w-20 rounded-full bg-[#30e84930] flex items-center justify-center text-2xl font-semibold text-black shadow-md overflow-hidden">
                                {/* Placeholder initial – replace with <Image /> later */}
                                <span>U</span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
                            <p className="text-sm text-gray-600">
                                @username • email@example.com
                            </p>
                        </div>
                    </div>
                    {!editing && (<button className="inline-flex items-center text-sm font-semibold text-white bg-[#30e849] border-2 border-[#30e849] py-2 px-5 rounded-lg shadow-md hover:bg-black hover:border-black transition-all duration-300 cursor-pointer" onClick={() => setEditing(true)}>
                        Edit profile
                    </button>
                    )}
                </div>

                <div className="grid gap-8 lg:grid-cols-[2fr,1.2fr]">
                    {/* Left: profile form */}
                    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account details</h2>

                        <form className="space-y-5">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                        First name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        maxLength={limits.firstName}
                                        className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm outline-none focus:border-[#30e849] focus:ring-2 focus:ring-[#30e84930] transition-colors"
                                    />
                                    <p className="text-xs text-gray-500 mt-1 text-right">
                                        {firstName.length}/{limits.firstName}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Last name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        maxLength={limits.lastName}
                                        className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm outline-none focus:border-[#30e849] focus:ring-2 focus:ring-[#30e84930] transition-colors"
                                    />
                                    <p className="text-xs text-gray-500 mt-1 text-right">
                                        {lastName.length}/{limits.lastName}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <div className="flex rounded-lg border border-gray-300 bg-white/70 focus-within:border-[#30e849] focus-within:ring-2 focus-within:ring-[#30e84930] transition-colors">
                                    <span className="inline-flex items-center px-3 text-sm text-gray-500 border-r border-gray-200">
                                        url.to/
                                    </span>
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="your-handle"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        maxLength={limits.username}
                                        className="w-full px-3 py-2 text-sm outline-none bg-transparent"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1 text-right">
                                    {username.length}/{limits.username}
                                </p>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    maxLength={limits.email}
                                    className="w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm outline-none focus:border-[#30e849] focus:ring-2 focus:ring-[#30e84930] transition-colors"
                                />
                                <p className="text-xs text-gray-500 mt-1 text-right">
                                    {email.length}/{limits.email}
                                </p>
                            </div>

                            <div>
                                <label htmlFor="profileImageDisplay" className="block text-sm font-medium text-gray-700 mb-1">
                                    Profile image
                                </label>
                                <div className="flex rounded-lg border border-gray-300 bg-white/70 focus-within:border-[#30e849] focus-within:ring-2 focus-within:ring-[#30e84930] transition-colors">
                                    <input
                                        id="profileImageDisplay"
                                        type="text"
                                        readOnly
                                        value={avatarName || 'No file selected'}
                                        className="w-full px-3 py-2 text-sm outline-none bg-transparent text-gray-700"
                                    />
                                    <button
                                        type="button"
                                        onClick={triggerAvatarPicker}
                                        className="inline-flex items-center rounded-lg rounded-l-none px-4 py-2 text-xs font-semibold text-white bg-[#30e849] border border-[#30e849] hover:bg-black hover:border-black transition-colors cursor-pointer"
                                    >
                                        Browse
                                    </button>
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
                                        className="inline-flex items-center justify-center rounded-lg bg-[#30e849] px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-black hover:border-black border-2 border-[#30e849] transition-all duration-300 cursor-pointer" onClick={() => setEditing(false)}
                                    >
                                        Save changes
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setEditing(false)}
                                    >
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
