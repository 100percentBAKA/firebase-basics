// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDl3Kvlq3L3a8LpIAO86BHmEHYm3ctrUfw",
    authDomain: "fir-guide-11a63.firebaseapp.com",
    projectId: "fir-guide-11a63",
    storageBucket: "fir-guide-11a63.appspot.com",
    messagingSenderId: "884274320666",
    appId: "1:884274320666:web:6f6ee050b79135592148a3",
    measurementId: "G-48P5FEH3TX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const analytics = getAnalytics(app); 