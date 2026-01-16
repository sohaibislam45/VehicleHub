import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAu5Njby0NsKcylhwtUHGR7H0YVJLUEJ3Q",
  authDomain: "vehiclehub-8afae.firebaseapp.com",
  projectId: "vehiclehub-8afae",
  storageBucket: "vehiclehub-8afae.firebasestorage.app",
  messagingSenderId: "1037251432353",
  appId: "1:1037251432353:web:ae7ae61fb17aaf8e0745e0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
