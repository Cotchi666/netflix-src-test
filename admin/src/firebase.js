import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBC7anAA8kLSy4n8Y90ONssOkqHlzEl7bE",
  authDomain: "myproject-8fb2e.firebaseapp.com",
  projectId: "myproject-8fb2e",
  storageBucket: "myproject-8fb2e.appspot.com",
  messagingSenderId: "541222099458",
  appId: "1:541222099458:web:429e270404984ed00ca51b",
  measurementId: "G-DYXL0FLCWE"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
