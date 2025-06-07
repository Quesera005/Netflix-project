import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-clone-47338.firebaseapp.com",
  projectId: "netflix-clone-47338",
  storageBucket: "netflix-clone-47338.firebasestorage.app",
  messagingSenderId: "1055112941978",
  appId: "1:1055112941978:web:77fa9aa7ac5431a247ea23"
};

const app = initializeApp(firebaseConfig); // Initialize Firebase
const auth = getAuth(app);  // Initialize Auth
const db = getFirestore(app);  // Initialize Firestore

export { auth, db, app };


//import firebase from 'firebase';
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyCz753ULymMllNT7a-N14kPcnGDw4QWjGs",
//     authDomain: "netflix-clone-47338.firebaseapp.com",
//     projectId: "netflix-clone-47338",
//     storageBucket: "netflix-clone-47338.firebasestorage.app",
//     messagingSenderId: "1055112941978",
//     appId: "1:1055112941978:web:77fa9aa7ac5431a247ea23"
//   };

//  const firebaseApp =firebase.initializeApp(firebaseConfig);
//  const db = firebaseApp.firestore();
//  const auth = firebase.auth();

//  export {auth};
//  export default db;

// const app = initializeApp(firebaseConfig);

// // Initialize Auth and Firestore
// const auth = getAuth(app);
// const db = getFirestore(app);

// // Export Auth and Firestore
// export { auth, db };