import firebase from "firebase/compat/app";
import "firebase/storage";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import env from "react-dotenv";

const app = firebase.initializeApp({
  // apiKey: "AIzaSyAm3IWPV-gaFEEUI2zOc4XPEUTINl7OSAk",
  // authDomain: "chat-app-2a482.firebaseapp.com",
  // projectId: "chat-app-2a482",
  // storageBucket: "chat-app-2a482.appspot.com",
  // messagingSenderId: "348032907580",
  // appId: "1:348032907580:web:3ec8860b9ec15a8f3d0639",
  // measurementId: "G-LHCE3CEWQL"
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
  measurementId: env.measurementId
});

export const firestoreDB = getFirestore();

export const storage = getStorage();

//export const storage = firebase.storage();

export default app;