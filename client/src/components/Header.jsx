import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-900 shadow-md bg-opacity-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-400">basi.</span>
            <span className="text-blue-200">space</span>
          </h1>
        </Link>
        <form className="bg-blue-800 bg-opacity-50 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search.."
            className="bg-transparent pl-1 focus:outline-none text-blue-200 w-24 sm:w-64"
          />
          <IoSearchOutline className="bg-transparent" />
        </form>
        <ul className="flex gap-3">
            <Link to='/'>
          <li className="hidden sm:inline text-blue-200 hover:text-blue-100">
            Home
          </li>
          </Link>
          <Link to='/about'>
          <li className="hidden sm:inline text-blue-200 hover:text-blue-100">
            About
          </li>
          </Link>
          <Link to='/sign-in'>
          <li className="text-blue-200 hover:text-blue-100">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
