// import * as admin from 'firebase-admin';
import firebase from 'firebase';
//import * as serviceAccount from './serviceAccountKey.json';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://test-db-c85e4.firebaseio.com"
// });
const firebaseConfig = {
    apiKey: "AIzaSyAinXDaKepZX6Ic-4-eOZQESaJV0jjTHRY",
    authDomain: "test-db-c85e4.firebaseapp.com",
    databaseURL: "https://test-db-c85e4.firebaseio.com",
    projectId: "test-db-c85e4",
    storageBucket: "test-db-c85e4.appspot.com",
    messagingSenderId: "123465092610",
    appId: "1:123465092610:web:143e1ba7baffbb9c41611b",
    measurementId: "G-BDRY0MXPM8"
  };
  // Initialize Firebase

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
//const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export {db};