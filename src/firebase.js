import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBSoQp4ea4DbNtppmqFr_KGLsgV3B_od3E",
    authDomain: "rolling-store-cm.firebaseapp.com",
    databaseURL: "https://rolling-store-cm.firebaseio.com",
    projectId: "rolling-store-cm",
    storageBucket: "rolling-store-cm.appspot.com",
    messagingSenderId: "253147199659",
    appId: "1:253147199659:web:72b63d2a6746da9a475fee"
};

firebase.initializeApp(firebaseConfig);

const firebaseApp = firebase;

export { firebaseApp };