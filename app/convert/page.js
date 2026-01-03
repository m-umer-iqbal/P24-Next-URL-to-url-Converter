import React from 'react'

const Convert = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-6 mt-20">
            <h1 className="text-3xl font-bold text-center">Convert URL &#8594; url</h1>
            <div className="lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 bg-[#30e84930]">
                <div className="relative mb-4">
                    <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">URL</label>
                    <input type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-[#30e849] focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Prefer Word</label>
                    <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-[#30e849] focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <button className="text-white bg-[#30e849] border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg cursor-pointer transition-all duration-300 ease-in-out font-semibold">Convert <span className="ml-2 font-semibold">&#8594;</span></button>
                <div className="relative mb-4 mt-4">
                    <label htmlFor="url" className="leading-7 text-sm text-gray-600">URL &#8594; url</label>
                    <div className="relative">
                        <input disabled type="text" id="url" name="url" className="w-full bg-white rounded border border-gray-300 focus:border-[#30e849] focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-[#30e849] border-0 py-1 px-4 focus:outline-none hover:bg-black rounded text-sm cursor-pointer transition-all duration-300 ease-in-out font-semibold">
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Convert