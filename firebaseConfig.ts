// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKevWazmnjr0SC0wMzcSS2emp5pI8U11c",
  authDomain: "lightbob-17590.firebaseapp.com",
  projectId: "lightbob-17590",
  storageBucket: "lightbob-17590.firebasestorage.app",
  messagingSenderId: "980919533609",
  appId: "1:980919533609:web:f2df1f498048d5fff4dc38",
  measurementId: "G-2ZZZN4XFFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
