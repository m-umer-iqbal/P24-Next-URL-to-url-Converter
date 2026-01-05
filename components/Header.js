import React from 'react'
import Link from "next/link"

const Header = () => {
    return (
        <header className="text-gray-600 body-font w-full bg-[#30e84930]">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
                    <lord-icon
                        src="https://cdn.lordicon.com/wpequvda.json"
                        trigger="loop"
                        delay="500"
                        colors="primary:#30e849"
                        style={{ "width": 60, "height": 60 }}>
                    </lord-icon>
                    <span className="ml-2 text-2xl">URL &#8594; url</span>
                </div>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link href={"/"} className="mr-5 hover:text-gray-900 font-semibold transition-all duration-300 ease-in-out hover:text-xl cursor-pointer">Home</Link>
                    <Link href={"/convert"} className="mr-5 hover:text-gray-900 font-semibold transition-all duration-300 ease-in-out hover:text-xl cursor-pointer">Convert</Link>
                    <Link href={"/myurls"} className="mr-5 hover:text-gray-900 font-semibold transition-all duration-300 ease-in-out hover:text-xl cursor-pointer">My urls</Link>
                    <Link href={"/profile"} className="mr-5 hover:text-gray-900 font-semibold transition-all duration-300 ease-in-out hover:text-xl cursor-pointer">Profile</Link>
                </nav>
                <div className="flex justify-center items-center gap-2">
                    <Link href={"/signin"}>
                        <button className="inline-flex items-center text-white bg-[#30e849] border-2 border-[#30e849] py-2 px-6 focus:outline-none hover:bg-black hover:border-black transition-all duration-300 ease-in-out rounded text-lg cursor-pointer font-semibold shadow shadow-green-500/20">
                            Sign in
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
