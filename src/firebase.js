// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL_kskgsn9wM1QnqJf0ecYCWFsgoUk6Ic",
  authDomain: "chat-application-e0f03.firebaseapp.com",
  projectId: "chat-application-e0f03",
  storageBucket: "chat-application-e0f03.appspot.com",
  messagingSenderId: "657900641013",
  appId: "1:657900641013:web:8bcdd8d5220eb13ffd03bc",
  measurementId: "G-46LEQ9LHS2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
