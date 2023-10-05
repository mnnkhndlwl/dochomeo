// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`, //"AIzaSyCvOO5u6-NwfMQAH4InplcM72Ckh8W9rSg",
//   authDomain:`${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,                                                                              //"shop-daba0.firebaseapp.com",
//   projectId:`${process.env.REACT_APP_FIREBASE_PROJECTID}`,
//   storageBucket:`${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
//   messagingSenderId:`${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
//   appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
//   measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
// };

const firebaseConfig = {
  apiKey: "AIzaSyBsUZmZXTnAPPsn_xDZ5deiDuWlodqnFLo",
  authDomain: "dochomoeo-1d821.firebaseapp.com",
  projectId: "dochomoeo-1d821",
  storageBucket: "dochomoeo-1d821.appspot.com",
  messagingSenderId: "872475641552",
  appId: "1:872475641552:web:fe1a4c3d137cc0dacd00d5",
  measurementId: "G-200WD6N7YX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
