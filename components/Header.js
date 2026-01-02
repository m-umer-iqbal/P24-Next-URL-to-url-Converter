import React from 'react'

const Header = () => {
    return (
        <header className="text-gray-600 body-font fixed top-0 w-full bg-white">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
                    <lord-icon
                        src="https://cdn.lordicon.com/wpequvda.json"
                        trigger="loop"
                        delay="500"
                        colors="primary:#30e849"
                        style={{ "width": 60, "height": 60 }}>
                    </lord-icon>
                    <span className="ml-2 text-2xl">URL &#8594; url</span>
                </a>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <a className="mr-5 hover:text-gray-900 cursor-pointer">First Link</a>
                    <a className="mr-5 hover:text-gray-900 cursor-pointer">Second Link</a>
                    <a className="mr-5 hover:text-gray-900 cursor-pointer">Third Link</a>
                    <a className="mr-5 hover:text-gray-900 cursor-pointer">Fourth Link</a>
                </nav>
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 cursor-pointer">Button
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Header
