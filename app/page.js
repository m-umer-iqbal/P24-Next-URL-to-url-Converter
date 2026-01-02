import Image from "next/image";

export default function Home() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Uniform Resource Locator (URL) &#8594; url Converter</h1>
          <p className="mb-8 leading-relaxed">Make your links memorable. Shorten, customize, and manage your URLs to improve click-through rates and keep your content looking sharp across the web</p>
          <div className="flex justify-center">
            <button className="inline-flex items-center text-white bg-[#30e849] border-2 border-[#30e849] py-2 px-6 focus:outline-none hover:bg-black hover:border-black transition-all duration-300 ease-in-out rounded text-lg cursor-pointer font-semibold shadow-lg shadow-green-500/20">
              Convert <span className="ml-2">&#8594;</span>
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <lord-icon
            src="https://cdn.lordicon.com/wpequvda.json"
            trigger="loop"
            delay="500"
            colors="primary:#30e849"
            style={{ "width": 550, "height": 550 }}>
          </lord-icon>
        </div>
      </div>
    </section>
  );
}
