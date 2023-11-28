import React from "react";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from "../fireBase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async ()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider);
            console.log(result.user.displayName,result.user.email);
            const res  = await fetch('/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
            })
            const data = await res.json()
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log('Could not sign in with Google')
        }
    }
  return (
    <button onClick={handleGoogleClick} type="button"
      className="bg-red-700 bg-opacity-70 mb-7
    text-blue-200 w-80 m-auto p-3 
    rounded-lg shadow-sm uppercase hover:opacity-90 disabled:opacity-30"
    >Continue With GOOGLE</button>
  );
};

export default OAuth;
