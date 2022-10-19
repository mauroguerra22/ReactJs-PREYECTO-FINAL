import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDwtybDhX45Yu5S3klDJvYKLqPKDdgD85Y",
  authDomain: "e-commerce-a9ea6.firebaseapp.com",
  databaseURL: "https://e-commerce-a9ea6-default-rtdb.firebaseio.com",
  projectId: "e-commerce-a9ea6",
  storageBucket: "e-commerce-a9ea6.appspot.com",
  messagingSenderId: "689108994132",
  appId: "1:689108994132:web:1bfee06d9d1cd7841f45c1",
  measurementId: "G-RTLGJJ4KJT"
};

firebase.initializeApp(firebaseConfig);

const firebaseApp = firebase;

export { firebaseApp };