import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
      {/* navbar */}
      <Navbar />

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
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Index;
