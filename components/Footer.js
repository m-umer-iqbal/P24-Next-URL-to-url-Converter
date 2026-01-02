import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="text-gray-600 body-font fixed bottom-0 w-full flex justify-center items-center bg-[#30e84950]">
            <div className="">
                <div className="container px-5 py-6 mx-auto flex justify-center items-center sm:flex-row flex-col">
                    <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">&copy; {year} All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
