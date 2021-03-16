import firebase from "firebase";
    
const firebaseConfig = {
    apiKey: "AIzaSyAn0_-vCp07dIrRc5Iz6W2mHYxc64GT_Tg",
    authDomain: "bt3103-week-6-977ed.firebaseapp.com",
    projectId: "bt3103-week-6-977ed",
    storageBucket: "bt3103-week-6-977ed.appspot.com",
    messagingSenderId: "888228975301",
    appId: "1:888228975301:web:b1e9b34672c813162356ac",
    measurementId: "G-BQVKKDXBQ4"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;