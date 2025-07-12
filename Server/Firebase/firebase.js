// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import dotenv from 'dotenv';

dotenv.config();
const { FIREBASE_API_KEY } = process.env;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "odoo-c9ed7.firebaseapp.com",
  projectId: "odoo-c9ed7",
  storageBucket: "odoo-c9ed7.firebasestorage.app",
  messagingSenderId: "919882015112",
  appId: "1:919882015112:web:3fdfa66ecda874aa631a3d",
  measurementId: "G-0V0373843H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);