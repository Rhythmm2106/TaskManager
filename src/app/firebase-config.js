// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaMUvaVMDG5vpP0eFLUQPGvxkpZaPPjR4",
  authDomain: "mystudybuddyy-80243.firebaseapp.com",
  projectId: "mystudybuddyy-80243",
  storageBucket: "mystudybuddyy-80243.firebasestorage.app",
  messagingSenderId: "221279131379",
  appId: "1:221279131379:web:ab31a8732c70be0a90c986",
  measurementId: "G-CWZMGMRVWC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
