// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOSTx_bXw3pPF4OgZo70fy4JWLjNqcsAs",
  authDomain: "sparta-services-b28f2.firebaseapp.com",
  projectId: "sparta-services-b28f2",
  storageBucket: "sparta-services-b28f2.firebasestorage.app",
  messagingSenderId: "17691519309",
  appId: "1:17691519309:web:ba0de8c45cef404fa9ef04",
  measurementId: "G-BJ19VJ7PQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth};