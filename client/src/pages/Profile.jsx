import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { UpdateUserSuccess, updateUserStart, updateUserfailure } from "../redux/user/userSlice";
import {
  getDownloadURL,
  ref,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../fireBase";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateDone, setUpdateDone] = useState(false);
  const dispatch  = useDispatch();
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

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(updateUserfailure(data.message))
        return;
      }
      dispatch(UpdateUserSuccess(data));
      setUpdateDone(true);
    } catch (error) {
      dispatch(updateUserfailure(error.message))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto bg-opacity-50 drop-shadow-2xl rounded-xl bg-blue-900 mt-12 ">
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
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-1 mx-12">
        <span className="text-red-400 bg-opacity-50 rounded-lg text-center  px-2 text-sm p-1 cursor-pointer ">
          Delete your account
        </span>
        <span className="text-red-400 bg-opacity-50 rounded-lg text-center  text-sm p-1 px-2 cursor-pointer ">
          Sign Out
        </span>
      </div>
      <p>{error ? error:''}</p>
      <p>{updateDone ? "Updated successfully":''}</p>
    </div>
  );
};

export default Profile;
