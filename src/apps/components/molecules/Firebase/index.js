// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBA7L_q-sy4Qq-_REFE5M-ZFCEySgfUv9o",
  authDomain: "ecomerce-online.firebaseapp.com",
  projectId: "ecomerce-online",
  storageBucket: "ecomerce-online.appspot.com",
  messagingSenderId: "215033574830",
  appId: "1:215033574830:web:0aa2f1f1ec8cf80beec43f",
  measurementId: "G-YK6VD8PG24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.languageCode = 'it';

const providerFb = new FacebookAuthProvider();
const providerGb = new GoogleAuthProvider();

providerGb.addScope('https://www.googleapis.com/auth/contacts.readonly');

export {auth, providerFb, providerGb}