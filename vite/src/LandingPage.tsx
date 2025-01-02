import Navbar from "./Navbar";
import Footer from "./Footer";
import "./index.css";

const LandingPage = () => {
  return (
    <div id="home">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <section className="relative">
        <img
          src="https://placehold.co/1920x600"
          alt="Woman stretching outdoors"
          className="w-full h-96 md:h-auto object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg text-center">
            Your Health, Our Priority
          </h1>
          <button className="bg-white text-teal-600 py-3 px-8 rounded-lg shadow-lg text-2xl transition duration-200">
            <a href="/phr/login">Sign In</a>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-blue-50 py-12" id="about">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <img
                src="https://placehold.co/400x400"
                alt="Doctor with arms crossed"
                className="rounded-lg shadow-md object-cover w-full max-w-md"
              />
            </div>

            {/* Center Content */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to Oncology PHR
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                Discover a seamless way to manage your personal health records.
                Our platform is designed to empower you with easy access and
                secure management of your oncology health information.
              </p>
              <button className="mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-full shadow-md transition duration-200">
                More
              </button>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <img
                src="https://placehold.co/400x400"
                alt="Doctor holding a stethoscope"
                className="rounded-lg shadow-md object-cover w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
