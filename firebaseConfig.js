import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

// Initialize Firebase app if it hasn't been initialized already
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];  // use the existing initialized app
}

// Initialize Auth with AsyncStorage for persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  if (error.code === "auth/already-initialized") {
    auth = getAuth(app);  // use the already initialized auth instance
  } else {
    throw error;
  }
}

export { auth };
export const db = getFirestore(app);
export default app;
