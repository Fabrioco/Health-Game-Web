import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLhYNZEvWP6B5WgAf-s0DBVf-IJ4PL6bg",
  authDomain: "healthgame-f74e7.firebaseapp.com",
  projectId: "healthgame-f74e7",
  storageBucket: "healthgame-f74e7.appspot.com",
  messagingSenderId: "941651329889",
  appId: "1:941651329889:web:2a7b6e8ee62bec2b9cfb20",
  measurementId: "G-4B66ZD4DWX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
