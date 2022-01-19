import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import  "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDU1ASezbQMATNo9bWFaHMD8P5xIJXEHKE",
    authDomain: "friends-project-a58aa.firebaseapp.com",
    projectId: "friends-project-a58aa",
    storageBucket: "friends-project-a58aa.appspot.com",
    messagingSenderId: "712347470442",
    appId: "1:712347470442:web:b1e0cf65a6f678fea8d813"
  };

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}


const db = app.firestore();


const storage = firebase.storage();


const auth = firebase.auth();


const provider = new firebase.auth.GoogleAuthProvider();

export { storage, auth, provider };

export default db;