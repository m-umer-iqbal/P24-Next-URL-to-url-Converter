"use client"

import React, { useEffect, useState, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInUserContext } from "@/context/context";
import { useRouter } from "next/navigation"

const Convert = () => {
    const { signInUser } = useContext(signInUserContext)
    const router = useRouter()

    const [render, setRender] = useState(false)

    useEffect(() => {
        if (signInUser?.status === false) {
            router.push("/signin")
        } else {
            setRender(true)
        }
    }, [])

    const copyToClipboard = () => {
        if (!convertedUrl)
            return toast.error("No url to copy");

        navigator.clipboard.writeText(convertedUrl);
        toast.success(`url copied to clipboard!`)
    };

    const handleOpen = () => {
        if (convertedUrl) {
            window.open(convertedUrl, "_blank")
            setConvertedUrl("")
        } else {
            toast.error("No url to open")
        }
    };

    const [originalUrl, setOriginalUrl] = useState("")
    const [preferWord, setPreferWord] = useState("")
    const [convertedUrl, setConvertedUrl] = useState("")

    const resetValues = (num) => {
        if (num === 2) {
            setOriginalUrl("");
            setPreferWord("");
        } else if (num === 3) {
            setOriginalUrl("");
            setPreferWord("");
            setConvertedUrl("");
        }
    }

    const handleConvert = async () => {
        const cleanUrl = originalUrl.trim().toLowerCase();
        const cleanWord = preferWord.trim().toLowerCase();

        if (!cleanUrl || !cleanWord) {
            toast.error("Please Enter both URL and Prefer Word");
            return;
        }

        try {
            const response = await fetch("/api/convert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    originalUrl: cleanUrl,
                    preferWord: cleanWord,
                    openId: signInUser.openId
                }),
            })
            const data = await response.json()
            if (data.success) {
                setConvertedUrl(data.shortUrl);
                setOriginalUrl(data.originalUrl)
                resetValues(2)
                toast.success("URL converted successfully!");
            } else {
                // Show error message
                toast.error(data.message || "Failed to convert URL")
                resetValues(3)
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred");
            resetValues(3)
        }
    }

    if (render) {
        return (
            <div className="flex flex-col justify-center items-center gap-6 px-4">
                <ToastContainer />
                <h1 className="text-3xl font-bold text-center">Convert URL &#8594; url</h1>
                <div className="lg:w-2/6 md:w-1/2 w-full rounded-lg px-6 md:p-8 flex flex-col bg-[#30e84930]">
                    <div className="relative mb-4">
                        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">URL</label>
                        <input type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-[#30e849] focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} />
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="prefer-word" className="leading-7 text-sm text-gray-600">Prefer Word</label>
                        <input type="text" id="prefer-word" name="prefer-word" className="w-full bg-white rounded border border-gray-300 focus:border-[#30e849] focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={preferWord} onChange={(e) => setPreferWord(e.target.value)} />
                    </div>

                    <button className="text-white bg-[#30e849] border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg cursor-pointer transition-all duration-300 ease-in-out font-semibold" onClick={() => {
                        handleConvert()
                    }}>
                        Convert
                        <span className="ml-2 font-semibold">&#8594;</span>
                    </button>

                    <div className="relative mb-4 mt-4">
                        <label htmlFor="url" className="leading-7 text-sm text-gray-600">URL &#8594; url</label>
                        <div className="relative">
                            <code
                                id="url"
                                className="w-full bg-white rounded border border-gray-300 focus:border-[#30e849] focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out block">
                                {convertedUrl || "\u00A0"}
                            </code>

                            <div className="absolute right-2 top-1/2 space-x-1">
                                <button onClick={() => {
                                    copyToClipboard()
                                }} className="transform -translate-y-1/2 text-white bg-[#30e849] border-0 py-1 px-4 focus:outline-none hover:bg-black rounded text-sm cursor-pointer transition-all duration-300 ease-in-out font-semibold">
                                    Copy
                                </button>
                                <button onClick={() => {
                                    handleOpen()
                                }} className="transform -translate-y-1/2 text-white bg-[#30e849] border-0 py-1 px-4 focus:outline-none hover:bg-black rounded text-sm cursor-pointer transition-all duration-300 ease-in-out font-semibold">
                                    Open
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Convert