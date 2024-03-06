// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW_0FcwnDDoaDBzlZOenaM96yuuVthDUA",
  authDomain: "blogs-326cb.firebaseapp.com",
  projectId: "blogs-326cb",
  storageBucket: "blogs-326cb.appspot.com",
  messagingSenderId: "958160043757",
  appId: "1:958160043757:web:22276d87823d2686e9d6e4",
  measurementId: "G-ZGRCLHDCTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
const db=getFirestore();
const imgdb=getStorage();
export {db,imgdb};
