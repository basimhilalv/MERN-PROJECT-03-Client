// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project03--tut.firebaseapp.com",
  projectId: "mern-project03--tut",
  storageBucket: "mern-project03--tut.appspot.com",
  messagingSenderId: "457271667039",
  appId: "1:457271667039:web:aa1002e7ea9acb116deeea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);