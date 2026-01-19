"use client"

import React, { useState, useEffect, useContext } from 'react'
import { signInUserContext } from "@/context/context"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyUrls = () => {
    const [urls, setUrls] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [editForm, setEditForm] = useState({ originalUrl: "", preferWord: "" })

    const { signInUser } = useContext(signInUserContext)
    const router = useRouter()

    const [render, setRender] = useState(false)

    useEffect(() => {
        if (!signInUser) return;

        if (signInUser.status === false) {
            router.push("/signin");
            return;
        }

        fetchUrls();
        setRender(true);

    }, [signInUser]);

    const fetchUrls = async () => {
        const openId = signInUser.openId;
        try {
            const response = await fetch(`/api/urls?openId=${openId}`, {
                method: "GET",
            })
            const data = await response.json()
            if (data.success) {
                setUrls(data.urls)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in fetching your urls");
        }
    }

    const copyToClipboard = (shortUrl) => {
        navigator.clipboard.writeText(shortUrl);
        toast.success(`url copied to clipboard!`)
    };

    const handleEdit = (url) => {
        setEditingId(url._id)
        setEditForm({ originalUrl: url.originalUrl, preferWord: url.preferWord })
    }

    const handleUpdate = async (urlId) => {
        setUpdating(true)
        try {
            const response = await fetch(`/api/urls/update?urlId=${urlId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editForm),
            })
            const data = await response.json()
            if (data.success) {
                await fetchUrls()
                toast.success(data.message)
                setEditingId(null)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in updating your url");
        } finally {
            setUpdating(false)
        }
    }

    const handleDelete = async (urlId) => {
        if (!confirm("Are you sure you want to delete this URL?")) return;
        try {
            const response = await fetch(`/api/urls/delete?urlId=${urlId}`, {
                method: "GET",
            })
            const data = await response.json()
            if (data.success) {
                await fetchUrls()
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Error in deleting your url");
        }
    }

    if (render && urls?.length < 1) {
        return <>
            <div className="flex flex-col text-center w-full mb-6">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">My urls</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
                <p className="text-center mt-4">Make your links memorable. Shorten, customize, and manage your URLs to improve click-through rates and keep your content looking sharp across the web.</p>
                <p className="text-center mt-4">No urls to show.</p>
            </div>
        </>
    }

    if (render) {
        return (
            <>
                <ToastContainer />
                <section className="text-gray-600 body-font flex flex-col justify-between min-h-full py-8">
                    <div className="">
                        <div className="flex flex-col text-center w-full mb-6">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">My urls</h1>
                        </div>
                        {urls.map((url) => {
                            const isEditing = editingId === url._id;
                            return (
                                <div key={url._id} className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end mt-4">
                                    <div className="relative grow w-full">
                                        <label htmlFor="URL" className="leading-7 text-sm text-gray-600">URL</label>
                                        <input
                                            disabled={!isEditing}
                                            type="text"
                                            name="URL"
                                            className={`w-full ${!isEditing ? 'bg-gray-100 bg-opacity-50' : 'bg-white'} rounded border border-gray-300 focus:border-green-500 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                                            value={isEditing ? editForm.originalUrl : url.originalUrl}
                                            onChange={(e) => setEditForm({ ...editForm, originalUrl: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative grow w-full">
                                        <label htmlFor="Prefer-Word" className="leading-7 text-sm text-gray-600">Prefer Word</label>
                                        <input
                                            disabled={!isEditing}
                                            type="text"
                                            name="Prefer Word"
                                            className={`w-full ${!isEditing ? 'bg-gray-100 bg-opacity-50' : 'bg-white'} rounded border border-gray-300 focus:border-green-500 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                                            value={isEditing ? editForm.preferWord : url.preferWord}
                                            onChange={(e) => setEditForm({ ...editForm, preferWord: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative grow w-full">
                                        <label htmlFor="url" className="leading-7 text-sm text-gray-600">url</label>
                                        <div className="relative">
                                            <input
                                                disabled
                                                type="text"
                                                name="url"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                value={url.shortUrl}
                                            />

                                            <button onClick={() => {
                                                copyToClipboard(url.shortUrl)
                                            }} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-[#30e849] border-0 py-1 px-4 focus:outline-none hover:bg-black rounded text-sm cursor-pointer transition-all duration-300 ease-in-out font-semibold">
                                                Copy
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 justify-center items-center">
                                        {isEditing ? (
                                            <div className="flex gap-1">
                                                <button
                                                    type="button"
                                                    disabled={updating}
                                                    className="inline-flex items-center justify-center rounded bg-[#30e849] px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-black hover:border-black border-2 border-[#30e849] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                                    onClick={() => handleUpdate(url._id)}>
                                                    {updating ? "Saving..." : "Save"}
                                                </button>
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="inline-flex items-center justify-center rounded border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <lord-icon
                                                    onClick={() => handleEdit(url)}
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    state="hover-line"
                                                    colors="primary:#121331,secondary:#30e849"
                                                    style={{ "width": 40, "height": 40, "cursor": "pointer" }}>
                                                </lord-icon>
                                                <lord-icon
                                                    onClick={() => handleDelete(url._id)}
                                                    src="https://cdn.lordicon.com/jzinekkv.json"
                                                    trigger="morph"
                                                    state="morph-trash-in"
                                                    colors="primary:#121331,secondary:#30e849"
                                                    style={{ "width": 40, "height": 40, "cursor": "pointer" }}>
                                                </lord-icon>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    {urls.length > 8 && <div className="flex justify-center">
                        <nav aria-label="Pagination">
                            <ul className="inline-flex items-center -space-x-px rounded-md text-sm shadow-sm">
                                <li>
                                    <a href="#" className="inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="z-10 inline-flex items-center border border-gray-300 bg-gray-100 px-4 py-2 font-medium text-gray-700">1 </a>
                                </li>
                                <li>
                                    <a href="#" className="inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-gray-500 hover:bg-gray-50">2 </a>
                                </li>
                                <li>
                                    <span className="inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-gray-700">... </span>
                                </li>
                                <li>
                                    <a href="#" className="inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-gray-500 hover:bg-gray-50">9 </a>
                                </li>
                                <li>
                                    <a href="#" className="inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-gray-500 hover:bg-gray-50">10 </a>
                                </li>
                                <li>
                                    <a href="#" className="inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    }
                </section >
            </>
        )
    }
}

export default MyUrls
