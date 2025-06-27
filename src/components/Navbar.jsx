import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import faruk from "../assets/farukImg.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white shadow px-4 py-3 flex justify-between items-center fixed w-full top-0 z-50">
        <Link to="/" className="text-3xl font-bold font-dmserif text-red-500">
          SweetSpots
        </Link>
        <div className="hidden">
          <button onClick={toggleSidebar}>
            {isOpen ? (
              <FaTimes className="text-2xl text-red-500" />
            ) : (
              <FaBars className="text-2xl text-red-500" />
            )}
          </button>
        </div>
        <div className="hidden md:hidden  gap-6 text-sm font-bold text-gray-700">
          <Link to="/" className="hover:text-red-500">Home</Link>
          <Link to="/login" className="hover:text-red-500">Login</Link>
          <Link to="/profile" className="hover:opacity-80">
            <img
              src={faruk}
              alt="Profile"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
          </Link>
        </div>
      </nav>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col p-6 space-y-4">
          <Link onClick={closeSidebar} to="/" className="text-lg font-bold text-red-500">
            SweetSpots
          </Link>
          <Link onClick={closeSidebar} to="/" className="hover:text-red-500">Home</Link>
          <Link onClick={closeSidebar} to="/login" className="hover:text-red-500">Login</Link>
          <Link onClick={closeSidebar} to="/profile" className="hover:text-red-500">Profile</Link>
        </div>
      </div>

      {/* Spacer to push content below navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
