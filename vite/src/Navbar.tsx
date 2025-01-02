import { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState<boolean>(false);

  function toggleMenu(): void {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    const fetchData = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const phrDoc = await getDoc(doc(db, "PHR", user.uid));
        const phrId = phrDoc.data()?.phrId;
        phrId ? setUsers(true) : setUsers(false);
      }
    });
    return () => fetchData();
  }, []);

  return (
    <div id="navbar">
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold text-teal-600">ONCOLOGY PHR</div>
          <nav className="hidden md:flex space-x-4">
            <a
              className={`${
                location.pathname === "/phr"
                  ? "text-teal-600"
                  : "hover:text-teal-600"
              } font-bold text-gray-700 cursor-pointer p-2`}
              onClick={(e) => {
                e.preventDefault();
                users
                  ? location.pathname !== "/phr" &&
                    window.location.replace("/phr")
                  : window.location.replace("/");
              }}
            >
              Home
            </a>
            <a
              className="text-gray-700 hover:text-teal-600 font-bold cursor-pointer p-2"
              onClick={(e) => {
                e.preventDefault();
                const homeElement = document.getElementById("about");
                if (homeElement) {
                  homeElement.scrollIntoView({ behavior: "smooth" });
                } else {
                  users
                    ? window.location.replace("/phr")
                    : window.location.replace("/");
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
                location.pathname === "/phr/profile"
                  ? "text-teal-600"
                  : "hover:text-teal-600"
              } font-bold text-gray-700 cursor-pointer p-2`}
              onClick={(e) => {
                e.preventDefault();
                location.pathname !== "/phr/profile" &&
                  window.location.replace("/phr/profile");
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
                  users
                    ? location.pathname !== "/phr" &&
                      window.location.replace("/phr")
                    : window.location.replace("/");
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
                    users
                      ? window.location.replace("/phr")
                      : window.location.replace("/");
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
                  location.pathname === "/phr/profile"
                    ? "text-teal-600"
                    : "hover:text-teal-600"
                } font-bold text-gray-700 cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  location.pathname !== "/phr/profile" &&
                    window.location.replace("/phr/profile");
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
