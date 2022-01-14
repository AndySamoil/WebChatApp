import firebase from "firebase/compat/app";
import "firebase/storage";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import env from "react-dotenv";

const app = firebase.initializeApp({
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