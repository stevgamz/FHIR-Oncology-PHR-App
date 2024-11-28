import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu(): void {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div id="navbar">
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold text-teal-600">ONCOLOGY TIM</div>
          <nav className="hidden md:flex space-x-4">
            <a
              className={`${
                location.pathname === "/phr"
                  ? "text-teal-600"
                  : "hover:text-teal-600"
              } font-bold text-gray-700 cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();
                location.pathname !== "/phr" && window.location.replace("/phr");
              }}
            >
              Home
            </a>
            <a
              className="text-gray-700 hover:text-teal-600 font-bold cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                const homeElement = document.getElementById("about");
                if (homeElement) {
                  homeElement.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.location.href = "/phr";
                }
              }}
            >
              About Us
            </a>
            {/* <a href="#" className="text-gray-700 hover:text-teal-600 font-bold">
              Medical Service
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600 font-bold">
              Medical Form
            </a> */}
            <a
              className={`${
                location.pathname === "/profile"
                  ? "text-teal-600"
                  : "hover:text-teal-600"
              } font-bold text-gray-700 cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();
                location.pathname !== "/profile" &&
                  window.location.replace("/profile");
              }}
            >
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
              <a
                className={`${
                  location.pathname === "/phr"
                    ? "text-teal-600"
                    : "hover:text-teal-600"
                } font-bold text-gray-700 cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  location.pathname !== "/phr" &&
                    window.location.replace("/phr");
                }}
              >
                Home
              </a>
              <a
                className="text-gray-700 hover:text-teal-600 font-bold cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  const homeElement = document.getElementById("about");
                  if (homeElement) {
                    homeElement.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = "/phr";
                  }
                }}
              >
                About Us
              </a>
              {/* <a
                href="#"
                className="text-gray-700 hover:text-teal-600 font-bold"
              >
                Medical Service
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-teal-600 font-bold"
              >
                Medical Form
              </a> */}
              <a
                className={`${
                  location.pathname === "/profile"
                    ? "text-teal-600"
                    : "hover:text-teal-600"
                } font-bold text-gray-700 cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  location.pathname !== "/profile" &&
                    window.location.replace("/profile");
                }}
              >
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
