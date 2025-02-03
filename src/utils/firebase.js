// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDngeA0JZizdRRaEuYLpIknxSxBoxjaRpI",
  authDomain: "netflixgpt-6cee2.firebaseapp.com",
  projectId: "netflixgpt-6cee2",
  storageBucket: "netflixgpt-6cee2.firebasestorage.app",
  messagingSenderId: "787407369573",
  appId: "1:787407369573:web:1930ee06d2e27392b41d8c",
  measurementId: "G-BQ6VQR3FY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);