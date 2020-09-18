
import admin from 'firebase-admin';
import firebase from 'firebase/app';
import 'firebase/auth';

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_CONFIG)
  ),
  databaseURL: 'https://inspecasa.firebaseio.com'
});
firebase.initializeApp({
  apiKey: process.env.NODE_APP_APIKEY,
  authDomain: process.env.NODE_APP_AUTHDOMAIN,
  databaseURL: process.env.NODE_APP_DATABASEURL,
  projectId: process.env.NODE_APP_PROJECTID,
  storageBucket: process.env.NODE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.NODE_APP_MESSAGINGSENDERID,
  appId: process.env.NODE_APP_APPID,
  measurementId: process.env.NODE_APP_MEASUREMENTID
});
