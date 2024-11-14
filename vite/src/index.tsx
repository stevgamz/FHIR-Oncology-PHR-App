import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    setIsMenuOpen(!isMenuOpen);
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold text-teal-600">ONCOLOGY TIM</div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-teal-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600">
              About Us
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600">
              Medical Service
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600">
              Medical Form
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600">
              Profile
            </a>
          </nav>
          <button
            className="md:hidden text-gray-700 hover:text-teal-600"
            onClick={toggleMenu}
          >
            &#9776;
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden flex justify-center text-center">
            <nav className="flex flex-col space-y-2 px-6 py-4">
              <a href="#" className="text-gray-700 hover:text-teal-600">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-teal-600">
                About Us
              </a>
              <a href="#" className="text-gray-700 hover:text-teal-600">
                Medical Service
              </a>
              <a href="#" className="text-gray-700 hover:text-teal-600">
                Medical Form
              </a>
              <a href="#" className="text-gray-700 hover:text-teal-600">
                Profile
              </a>
            </nav>
          </div>
        )}
      </header>

      <section className="relative">
        <img
          src="https://placehold.co/1920x600"
          alt="Woman stretching outdoors"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-full shadow-lg text-center">
            <h2 className="text-2xl font-bold">Your Health, Our Priority</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src="https://placehold.co/400x400"
              alt="Doctor with arms crossed"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Oncology FHIR
            </h2>
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor amet, consectetur adipiscing elit. Nam nec est
              arcu. Suspendisse potenti. Nullam eget ligula eget nisi sodales
              malesuada. Nullam nec dolor nec neque malesuada ultricies. Nulla
              in imperdiet sapien.
            </p>
            <button className="bg-teal-600 text-white py-2 px-6 rounded-full">
              More
            </button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img
              src="https://placehold.co/400x400"
              alt="Doctor holding a stethoscope"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto flex flex-wrap justify-center space-x-4 px-6">
          <div className="flex items-center space-x-2 mb-4">
            <i className="fas fa-file-alt text-teal-600 text-2xl"></i>
            <a href="#" className="text-teal-600 text-lg">
              Patient Form
            </a>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <i className="fas fa-file-alt text-teal-600 text-2xl"></i>
            <a href="#" className="text-teal-600 text-lg">
              Observation Form
            </a>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <i className="fas fa-file-alt text-teal-600 text-2xl"></i>
            <a href="#" className="text-teal-600 text-lg">
              Condition Form
            </a>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <i className="fas fa-file-alt text-teal-600 text-2xl"></i>
            <a href="#" className="text-teal-600 text-lg">
              Coming Soon
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Menu</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Medical Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Patient Form
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Useful Links</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-bold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <div className="mt-4">
                <a href="#">
                  <img
                    src="https://placehold.co/150x50"
                    alt="Google Play Store"
                    className="inline-block"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://placehold.co/150x50"
                    alt="Apple App Store"
                    className="inline-block"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-400">&copy; 2023 FHIR ONCOLOGY UMM TIM</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
