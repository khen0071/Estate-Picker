import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-k5FGDLnmcYIFNvSfRZdWgdC7iugkAW0",
  authDomain: "house-marketplace-app-0001.firebaseapp.com",
  projectId: "house-marketplace-app-0001",
  storageBucket: "house-marketplace-app-0001.appspot.com",
  messagingSenderId: "87925382819",
  appId: "1:87925382819:web:207c426f9a7becb7812916",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
