// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

console.log(process.env.REACT_APP_FIREBASE_API_KEY)
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyCuxDssKS-ambd2XL6yucBWHMteRHmT7nw",
    authDomain: "real-time-chat-3d130.firebaseapp.com",
    projectId: "real-time-chat-3d130",
    storageBucket: "real-time-chat-3d130.firebasestorage.app",
    messagingSenderId: "191972512678",
    appId: "1:191972512678:web:be5819e8a60fd0125ab567"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);