import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

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

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
