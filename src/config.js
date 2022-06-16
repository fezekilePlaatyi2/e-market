import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHtmey5Pum5XKj7wx-qPdtYyOSsVdpep8",
  authDomain: "esmall.firebaseapp.com",
  databaseURL: "https://esmall.firebaseio.com",
  projectId: "esmall",
  storageBucket: "esmall.appspot.com",
  messagingSenderId: "349581976709",
  appId: "1:349581976709:web:dedc8f399ca43f7a6a75ec",
  measurementId: "G-KZ914K72KP",
};
const app = firebase.initializeApp(firebaseConfig);

export default app;
