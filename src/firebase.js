import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYWDJJMp1kbDhtHyQfx__1ypoJ30TkLlM",
  authDomain: "social-communication-2b518.firebaseapp.com",
  projectId: "social-communication-2b518",
  storageBucket: "social-communication-2b518.appspot.com",
  messagingSenderId: "420834983908",
  appId: "1:420834983908:web:32ea8eb69b6f74192fd1f1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
