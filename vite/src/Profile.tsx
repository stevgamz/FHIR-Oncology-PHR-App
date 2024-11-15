import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Profile: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-teal-100 to-white min-h-screen">
      {/* NAVBAR */}
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-8">
          <h2 className="text-4xl font-bold text-teal-600">Profile</h2>
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit amet consectetur. A nec sit volutpat ut
            pellentesque adipiscing eros mi. Vulputate scelerisque vitae quis
            aliquam magna. Euismod diam mauris neque platea non sapien. Lectus
            neque urna facilisi eu dolor sit iaculis molestie risus.
          </p>
        </section>
        <section className="bg-white shadow-md rounded-lg p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src="https://placehold.co/100x100"
                alt="User profile picture"
                className="rounded-full w-24 h-24 object-cover mr-4"
              />
              <div>
                <h3 className="text-xl font-bold">USER NAME</h3>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-teal-600 text-white px-4 py-2 rounded">
                Upload New Photo
              </button>
              <button className="border border-teal-600 text-teal-600 px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-600 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="eg. Alaa"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="eg. Mohamed"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">User Name</label>
              <input
                type="text"
                placeholder="eg. alaa.mohamed"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-600 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded px-4 py-2 pl-10"
                  />
                  <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded px-4 py-2 pl-10"
                  />
                  <i className="fas fa-phone absolute left-3 top-3 text-gray-400"></i>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Location</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2 pl-10"
                />
                <i className="fas fa-map-marker-alt absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Time Zone</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2 pl-10"
                />
                <i className="fas fa-clock absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-600 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded px-4 py-2 pl-10"
                  />
                  <i className="fas fa-key absolute left-3 top-3 text-gray-400"></i>
                  <i className="fas fa-eye absolute right-3 top-3 text-gray-400"></i>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded px-4 py-2 pl-10"
                  />
                  <i className="fas fa-key absolute left-3 top-3 text-gray-400"></i>
                  <i className="fas fa-eye absolute right-3 top-3 text-gray-400"></i>
                </div>
              </div>
              <div>
                <label className="block text-gray-600 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded px-4 py-2 pl-10"
                  />
                  <i className="fas fa-key absolute left-3 top-3 text-gray-400"></i>
                  <i className="fas fa-eye absolute right-3 top-3 text-gray-400"></i>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="border border-gray-300 text-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </section>
      </main>
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Profile;
