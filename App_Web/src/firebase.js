import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAqnMhZ3u-z1hqlqGod7qUo7bb6PLIF_dI",
    authDomain: "dynamic-dam.firebaseapp.com",
    projectId: "dynamic-dam",
    storageBucket: "dynamic-dam.firebasestorage.app",
    messagingSenderId: "610391208242",
    appId: "1:610391208242:web:31647d9cc6a9ee9b47a72b",
    measurementId: "G-GJFL7VPG07"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };