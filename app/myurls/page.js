import React from 'react'

const MyUrls = () => {
    return (
        <section className="text-gray-600 body-font flex flex-col justify-between min-h-full py-8">
            <div className="">
                <div className="flex flex-col text-center w-full mb-6">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">My urls</h1>
                </div>
                <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                    <div className="relative grow w-full">
                        <label htmlFor="URL" className="leading-7 text-sm text-gray-600">URL</label>
                        <input disabled type="text" id="URL" name="URL" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative grow w-full">
                        <label htmlFor="Prefer-Word" className="leading-7 text-sm text-gray-600">Prefer Word</label>
                        <input disabled type="text" id="Prefer-Word" name="Prefer Word" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative grow w-full">
                        <label htmlFor="url" className="leading-7 text-sm text-gray-600">url</label>
                        <div className="relative">
                            <input disabled type="text" id="url" name="url" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-[#30e849] border-0 py-1 px-4 focus:outline-none hover:bg-black rounded text-sm cursor-pointer transition-all duration-300 ease-in-out font-semibold">
                                Copy
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            state="hover-line"
                            colors="primary:#121331,secondary:#30e849"
                            style={{ "width": 40, "height": 40, "cursor": "pointer" }}>
                        </lord-icon>
                        <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="morph"
                            state="morph-trash-in"
                            colors="primary:#121331,secondary:#30e849"
                            style={{ "width": 40, "height": 40, "cursor": "pointer" }}>
                        </lord-icon>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
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
        </section>
    )
}

export default MyUrls
