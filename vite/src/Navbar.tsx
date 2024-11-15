import React, { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div id="navbar">
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
    </div>
  );
}

export default Navbar;
