// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHlKClcBfpUnbPuuiol7N6ppPJ_h-V31M",
  authDomain: "todo-a2d87.firebaseapp.com",
  projectId: "todo-a2d87",
  storageBucket: "todo-a2d87.firebasestorage.app",
  messagingSenderId: "832367000876",
  appId: "1:832367000876:web:8920fa937e2c392cf84089"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;