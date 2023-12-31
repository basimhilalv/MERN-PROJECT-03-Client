import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  //console.log(formData)
  return (
    <div className="p-3 max-w-lg mx-auto bg-blue-900 my-24 bg-opacity-50 drop-shadow-2xl rounded-xl">
      <h1 className="text-3xl text-center text-blue-200 font-bold my-5">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-7">
        <input
          type="text"
          placeholder="Username"
          className="border-none  bg-blue-100 bg-opacity-25 focus:outline-none focus:placeholder-transparent text-blue-200 p-3 rounded-lg w-80 m-auto"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border-none bg-blue-100 bg-opacity-25 focus:outline-none focus:placeholder-transparent text-blue-200 p-3 rounded-lg w-80 m-auto"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-none bg-blue-100 bg-opacity-25 focus:outline-none focus:placeholder-transparent text-blue-200 p-3 rounded-lg w-80 m-auto"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-700 bg-opacity-70 mt-4
         text-blue-200 w-80 m-auto p-3 
         rounded-lg shadow-sm uppercase hover:opacity-90 disabled:opacity-30"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth/>
      </form>

      <div className="flex gap-2 text-blue-100 text-center">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-300 text-center">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
