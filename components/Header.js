'use client'

import React, { useContext, useState, useEffect } from 'react'
import Link from "next/link"
import { signInUserContext } from "@/context/context"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"

const Header = () => {
    const { data: session } = useSession()
    const { signInUser } = useContext(signInUserContext)
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <header className="text-gray-600 body-font w-full bg-[#30e84930]">
            <div className="container mx-auto flex p-5 items-center justify-between">

                {/* Logo */}
                <div className="flex title-font font-medium items-center text-gray-900 cursor-pointer">
                    <lord-icon
                        src="https://cdn.lordicon.com/wpequvda.json"
                        trigger="loop"
                        delay="500"
                        colors="primary:#30e849"
                        style={{ width: 60, height: 60 }}
                    />
                    <span className="ml-2 text-2xl">URL &#8594; url</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex md:ml-auto md:mr-auto items-center text-base justify-center">
                    <Link href="/" className="mr-5 font-semibold transition-all duration-300 hover:text-xl">Home</Link>
                    <Link href="/convert" className="mr-5 font-semibold transition-all duration-300 hover:text-xl">Convert</Link>
                    <Link href="/myurls" className="mr-5 font-semibold transition-all duration-300 hover:text-xl">My urls</Link>
                    <Link href="/profile" className="mr-5 font-semibold transition-all duration-300 hover:text-xl">Profile</Link>
                </nav>

                {/* Desktop Auth */}
                <div className="hidden md:flex gap-2">
                    {(session || signInUser?.status === true) ? (
                        <button
                            onClick={() => signOut(signInUser?.method || undefined)}
                            className="text-white bg-[#30e849] border-2 border-[#30e849] py-2 px-6 hover:bg-black hover:border-black transition-all duration-300 rounded text-lg font-semibold shadow shadow-green-500/20"
                        >
                            Sign out
                        </button>
                    ) : (
                        <Link href="/signin">
                            <button className="text-white bg-[#30e849] border-2 border-[#30e849] py-2 px-6 hover:bg-black hover:border-black transition-all duration-300 rounded text-lg font-semibold shadow shadow-green-500/20">
                                Sign in
                            </button>
                        </Link>
                    )}
                </div>

                {/* Hamburger Icon */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-3xl font-bold transition-transform duration-300"
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu (Animated) */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
                ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-[#D8FBDD] px-5 pb-5 flex flex-col text-center gap-4 font-semibold">
                    <Link href="/">Home</Link>
                    <Link href="/convert">Convert</Link>
                    <Link href="/myurls">My urls</Link>
                    <Link href="/profile">Profile</Link>

                    {(session || signInUser?.status === true) ? (
                        <button
                            onClick={() => signOut(signInUser?.method || undefined)}
                            className="w-full text-white bg-[#30e849] py-2 rounded font-semibold"
                        >
                            Sign out
                        </button>
                    ) : (
                        <Link href="/signin">
                            <button className="w-full text-white bg-[#30e849] py-2 rounded font-semibold">
                                Sign in
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
