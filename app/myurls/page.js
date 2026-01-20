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
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const LIMIT = 6;

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

    }, [signInUser, page]);

    const fetchUrls = async () => {
        const openId = signInUser.openId;
        try {
            const response = await fetch(`/api/urls?openId=${openId}&page=${page}&limit=${LIMIT}`, {
                method: "GET",
            })
            const data = await response.json()
            if (data.success) {
                setUrls(data.urls)
                setPagination(data.pagination);
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

                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center mt-8 space-x-4">
                            <button
                                disabled={!pagination.hasPrev}
                                onClick={() => setPage(p => p - 1)}
                                className={`inline-flex items-center justify-center rounded border-2 px-4 py-2 text-sm font-semibold transition-all duration-300 ${!pagination.hasPrev
                                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                    : 'border-[#30e849] text-[#30e849] hover:bg-black hover:text-white hover:border-black cursor-pointer'
                                    }`}>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                                Previous
                            </button>

                            <div className="flex items-center space-x-2">
                                <span className="text-gray-700 font-medium">Page</span>
                                <span className="px-3 py-1 bg-[#30e849] text-white font-semibold rounded-md">{page}</span>
                                <span className="text-gray-700 font-medium">of {pagination.totalPages}</span>
                            </div>

                            <button
                                disabled={!pagination.hasNext}
                                onClick={() => setPage(p => p + 1)}
                                className={`inline-flex items-center justify-center rounded border-2 px-4 py-2 text-sm font-semibold transition-all duration-300 ${!pagination.hasNext
                                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                    : 'border-[#30e849] text-[#30e849] hover:bg-black hover:text-white hover:border-black cursor-pointer'
                                    }`}>
                                Next
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    )}
                </section >
            </>
        )
    }
}

export default MyUrls
