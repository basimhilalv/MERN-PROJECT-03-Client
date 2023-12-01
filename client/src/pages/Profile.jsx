import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  signoutUserStart,
  signoutUserSuccess,
  signoutUserfailure,
  UpdateUserSuccess,
  updateUserStart,
  updateUserfailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserfailure,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  ref,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../fireBase";
import { Link } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateDone, setUpdateDone] = useState(false);
  const [listError, setListError] = useState(false);
  const [userlist, setUserList] = useState([]);
  const dispatch = useDispatch();
  console.log(currentUser);
  // console.log(formData);
  // console.log(filePerc);
  // console.log(fileError);
  //firebase storage
  // allow read;
  //       allow write:if
  //       request.resource.size < 2 * 1024 * 1024 &&
  //       request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserfailure(data.message));
        return;
      }
      dispatch(UpdateUserSuccess(data));
      setUpdateDone(true);
    } catch (error) {
      dispatch(updateUserfailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserfailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserfailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/sign-out");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserfailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserfailure(error.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setListError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setListError(true);
        return;
      }
      setListError(false);
      setUserList(data);
    } catch (error) {
      setListError(true);
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserList((prevdata) => prevdata.filter((list) => list._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(userlist);
  return (
    <div className="p-3 max-w-lg mx-auto bg-opacity-50 drop-shadow-2xl rounded-xl bg-blue-900 mt-8 ">
      <h1 className="text-3xl font-semibold text-blue-200 text-center my-7">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-sm mx-auto">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="avatar"
          className="border-solid border-blue-200 border-4 rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileError ? (
            <span>Error Image Upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span>{`uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span>Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          defaultValue={currentUser.username}
          placeholder="Username"
          className="border-none focus:outline-none text-blue-300 bg-opacity-25 bg-blue-200 p-3 rounded-lg my-2 mt-8"
        />
        <input
          type="email"
          id="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
          placeholder="Email"
          className="border-none focus:outline-none text-blue-300 bg-opacity-25 bg-blue-200 p-3 rounded-lg my-2"
        />
        <input
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="Password"
          className="border-none focus:outline-none text-blue-300 bg-opacity-25 bg-blue-200 p-3 rounded-lg my-2"
        />
        <button className="bg-blue-800 my-2 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-800 my-2 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 text-center"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-1 mx-1">
        <span
          onClick={handleDeleteUser}
          className="text-red-400 bg-opacity-50 rounded-lg text-center  px-2 text-sm p-1 cursor-pointer "
        >
          Delete Account
        </span>
        <span
          onClick={handleShowListing}
          className="text-blue-200  rounded-lg  w-28"
        >
          Show Listings
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-400 bg-opacity-50 rounded-lg text-center  text-sm p-1 px-2 cursor-pointer "
        >
          Sign Out
        </span>
      </div>
      <p>{error ? error : ""}</p>
      <p>{updateDone ? "Updated successfully" : ""}</p>
      <p>{listError ? "Error showing listings" : ""}</p>
      <div>
        {userlist &&
          userlist.length > 0 &&
          userlist.map((list) => {
            console.log(list._id);
            return (
              <div
                key={list._id}
                className="bg-blue-100 drop-shadow-2xl hover:opacity-70  rounded-lg text-blue-200 bg-opacity-25 p-2 my-2 flex justify-between flex-row items-center"
              >
                <Link to={`/listing/${list._id}`}>
                  <div className="flex">
                    <img
                      src={list.imageUrls[0]}
                      alt="listing_image"
                      className="w-12 h-12 object-contain mr-3"
                    />
                    <p className="font-semibold truncate">{list.name}</p>
                  </div>
                </Link>

                <div className="flex flex-col">
                  <button
                    onClick={() => handleDeleteListing(list._id)}
                    className="text-red-400 font-semibold"
                  >
                    DELETE
                  </button>
                  <Link to={`/update-listing/${list._id}`}>
                  <button className="text-green-400 font-semibold">EDIT</button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
