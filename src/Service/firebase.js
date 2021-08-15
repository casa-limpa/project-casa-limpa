import firebase from "firebase";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyCEeJ2F98KO0coqKPPR1HxLX9TJZRsno9w",
  authDomain: "casalimpa-1551a.firebaseapp.com",
  databaseURL: "https://casalimpa-1551a-default-rtdb.firebaseio.com",
  projectId: "casalimpa-1551a",
  storageBucket: "casalimpa-1551a.appspot.com",
  messagingSenderId: "1046932428847",
  appId: "1:1046932428847:web:f378327be8a3ecb5438eda",
  measurementId: "G-W75LLE7JYY"

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
