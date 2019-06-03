import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBX0_1eg41Mm5iar9_uuiIINieiCkalDDs",
    authDomain: "todo-ninja-6915a.firebaseapp.com",
    databaseURL: "https://todo-ninja-6915a.firebaseio.com",
    projectId: "todo-ninja-6915a",
    storageBucket: "todo-ninja-6915a.appspot.com",
    messagingSenderId: "585193900709",
    appId: "1:585193900709:web:413d1bec1ebd9f63"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;