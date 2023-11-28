import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className="p-3 max-w-lg mx-auto bg-opacity-50 drop-shadow-2xl rounded-xl bg-blue-900 mt-12 ">
      <h1 className="text-3xl font-semibold text-blue-200 text-center my-7">Profile</h1>
      <form className="flex flex-col max-w-sm mx-auto">
        <img src={currentUser.avatar} alt="avatar" 
        className="border-solid border-blue-200 border-4 rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        <input type="text" id="username" placeholder="Username" 
        className="border-none focus:outline-none text-blue-300 bg-opacity-25 bg-blue-200 p-3 rounded-lg my-2 mt-8" />
        <input type="email" id="email" placeholder="Email" 
        className="border-none focus:outline-none text-blue-300 bg-opacity-25 bg-blue-200 p-3 rounded-lg my-2" />
        <input type="password" id="password" placeholder="Password" 
        className="border-none focus:outline-none text-blue-300 bg-opacity-25 bg-blue-200 p-3 rounded-lg my-2" />
        <button className="bg-blue-800 my-2 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-1 mx-12">
      <span className="text-red-400 bg-opacity-50 rounded-lg text-center  px-2 text-sm p-1 cursor-pointer ">Delete your account</span>
      <span className="text-red-400 bg-opacity-50 rounded-lg text-center  text-sm p-1 px-2 cursor-pointer ">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
