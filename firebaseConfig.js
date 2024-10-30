// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3HGcT8VYSTTKSJRtrg97u9jMtYMWhi1A",
  authDomain: "exedemo-ab8d1.firebaseapp.com",
  projectId: "exedemo-ab8d1",
  storageBucket: "exedemo-ab8d1.appspot.com",
  messagingSenderId: "382840393999",
  appId: "1:382840393999:web:943bb1502f8a13072e2e7a",
  measurementId: "G-4P19RY2H9C"  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
