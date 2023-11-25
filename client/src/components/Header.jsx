import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-900 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-gray-500">basi.</span>
            <span className="text-gray-300">space</span>
          </h1>
        </Link>
        <form className="bg-blue-800 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search.."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="bg-blue-800" />
        </form>
        <ul className="flex gap-3">
            <Link to='/'>
          <li className="hidden sm:inline text-gray-400 hover:text-gray-300">
            Home
          </li>
          </Link>
          <Link to='/about'>
          <li className="hidden sm:inline text-gray-400 hover:text-gray-300">
            About
          </li>
          </Link>
          <Link to='/sign-in'>
          <li className="text-gray-400 hover:text-gray-300">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
