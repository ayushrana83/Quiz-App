import React, { useState } from "react";
import { useUser } from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  const { user, logoutUser } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    toast.success("logout successfull")
    navigate("/");
  }
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={"/"} className="flex-shrink-0 flex items-center hover:text-yellow-300 text-white hover:scale-105">
              <svg
                className="h-8 w-8 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold">QuickQuiz</span>
            </Link>

            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                to={"/leaderboard"}
                className="text-white hover:text-indigo-100 px-3 py-2 rounded-md font-medium"
              >
                Leaderboard
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center ml-4 md:ml-6">
                <div className="relative">
                  <button className="flex items-center max-w-xs px-3 py-2 text-sm rounded-full text-white bg-indigo-900 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white transition duration-150 ease-in-out">
                    <span className="ml-2 font-medium truncate max-w-[100px]">
                      {user.email}
                    </span>
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 text-sm text-white bg-indigo-700 hover:bg-indigo-600 rounded-md shadow-sm transition duration-150 ease-in-out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="ml-4 px-4 py-2 text-sm text-white bg-indigo-700 hover:bg-indigo-600 rounded-md shadow-sm transition duration-150 ease-in-out"
              >
                Login
              </Link>
            )}

            <div className="flex md:hidden ml-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-100 focus:outline-none"
              >
                <svg
                  className={`${mobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${mobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-indigo-800">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
          >
            Leaderboard
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
          >
            About
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
