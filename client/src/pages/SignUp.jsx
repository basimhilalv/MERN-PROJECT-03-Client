import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto bg-blue-900 my-24 bg-opacity-50 drop-shadow-2xl rounded-xl">
      <h1 className="text-3xl text-center text-blue-200 font-bold my-5">
        Sign Up
      </h1>
      <form className="flex flex-col gap-5 mt-7">
        <input
          type="text"
          placeholder="Username"
          className="border-none  bg-blue-100 bg-opacity-25 focus:outline-none focus:placeholder-transparent text-blue-200 p-3 rounded-lg w-80 m-auto"
          id="usernmae"
        />
        <input
          type="email"
          placeholder="Email"
          className="border-none bg-blue-100 bg-opacity-25 focus:outline-none focus:placeholder-transparent text-blue-200 p-3 rounded-lg w-80 m-auto"
          id="email"
        />
        <input
          type="text"
          placeholder="Password"
          className="border-none bg-blue-100 bg-opacity-25 focus:outline-none focus:placeholder-transparent text-blue-200 p-3 rounded-lg w-80 m-auto"
          id="password"
        />
        <button
          className="bg-blue-700 bg-opacity-70 mb-7 mt-3
         text-blue-200 w-80 m-auto p-3 
         rounded-lg shadow-sm uppercase hover:opacity-90 disabled:opacity-30"
        >
          Sign up
        </button>
      </form>
      
      {/* <div className="flex gap-2 text-blue-100 text-center">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-300 text-center">Sign in</span>
        </Link>
      </div> */}
    </div>
  );
};

export default SignUp;
