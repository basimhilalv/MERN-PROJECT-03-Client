import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get('searchTerm');
    if(searchQuery){
      setSearchTerm(searchQuery);
    }
  }, [location.search]);

  return (
    <header className="bg-blue-900 shadow-md bg-opacity-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-white-400">baz.</span>
            <span className="text-red-200">play</span>
            <span className="text-white-200">z</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-blue-800 bg-opacity-50 p-2 rounded-lg flex items-center"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search.."
            className="bg-transparent pl-1 focus:outline-none text-blue-200 w-24 sm:w-64"
          />
          <button type="submit">
            <IoSearchOutline className="bg-transparent" />
          </button>
        </form>
        <ul className="flex gap-3">
          <Link to="/">
            <li className="hidden sm:inline text-blue-200 hover:text-blue-100">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-blue-200 hover:text-blue-100">
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover "
                src={currentUser.avatar}
                alt="avatar"
              />
            ) : (
              <li className="text-blue-200 hover:text-blue-100">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
