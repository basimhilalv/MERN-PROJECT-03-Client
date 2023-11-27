import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInfailure,
} from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // setError(data.message);
        // setLoading(false);
        dispatch(signInfailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInfailure(err.message));
    }
  };
  //console.log(formData)
  return (
    <div className="p-3 max-w-lg mx-auto bg-blue-900 my-24 bg-opacity-50 drop-shadow-2xl rounded-xl">
      <h1 className="text-3xl text-center text-blue-200 font-bold my-5">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-7">
        {/* <input
          type="text"
          placeholder="Username"
          className="border-none  bg-blue-100 bg-opacity-25 focus:outline-none focus:placeholder-transparent text-blue-200 p-3 rounded-lg w-80 m-auto"
          id="username"
          onChange={handleChange}
        /> */}
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
          className="bg-blue-700 bg-opacity-70 mb-7 mt-3
         text-blue-200 w-80 m-auto p-3 
         rounded-lg shadow-sm uppercase hover:opacity-90 disabled:opacity-30"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <div className="flex gap-2 text-blue-100 text-center">
        <p>Create an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-300 text-center">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignIn;
