'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [iconSize, setIconSize] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setIconSize(550); // large screens
      else if (width >= 768) setIconSize(400); // tablet
      else setIconSize(0); // hide icon on mobile to prevent scrollbar
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-8 md:py-12 md:flex-row flex-col items-center">

        {/* Text Section */}
        <div className="lg:grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Uniform Resource Locator (URL) &#8594; url Converter
          </h1>
          <p className="mb-8 leading-relaxed">
            Make your links memorable. Shorten, customize, and manage your URLs to improve click-through rates and keep your content looking sharp across the web.
          </p>
          <div className="flex justify-center">
            <Link href="/convert">
              <button className="inline-flex items-center text-white bg-[#30e849] border-2 border-[#30e849] py-2 px-6 focus:outline-none hover:bg-black hover:border-black transition-all duration-300 ease-in-out rounded text-lg cursor-pointer font-semibold shadow-lg shadow-green-500/20">
                Convert <span className="ml-2">&#8594;</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Icon Section */}
        <div className="md:w-1/2 lg:w-1/2 flex justify-center">
          {iconSize > 0 && (
            <lord-icon
              src="https://cdn.lordicon.com/wpequvda.json"
              trigger="loop"
              delay="500"
              colors="primary:#30e849"
              style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
