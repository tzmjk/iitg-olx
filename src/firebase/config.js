import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCN1uk0n4L5-2nG9HhtoR3LoP_EkEvrMvs",
  authDomain: "reactjs-project-42885.firebaseapp.com",
  projectId: "reactjs-project-42885",
  storageBucket: "reactjs-project-42885.appspot.com",
  messagingSenderId: "305290569838",
  appId: "1:305290569838:web:b8290ea76a718808aa1e7f",
};

export const Firebase = firebase.initializeApp(firebaseConfig); 
export const db = firebase.firestore();
