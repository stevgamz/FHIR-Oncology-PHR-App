// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAtEF_E4aMVhVd0ImCY0uVYcCmxv19dqSY",
//   authDomain: "fhir-oncology-phr-app-4b48b.firebaseapp.com",
//   projectId: "fhir-oncology-phr-app-4b48b",
//   storageBucket: "fhir-oncology-phr-app-4b48b.appspot.com",
//   messagingSenderId: "595057392527",
//   appId: "1:595057392527:web:f173349fc35cc792dce9fa",
//   measurementId: "G-7M6DTB5M28"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBpJvjDeO6Sd0_nVsro4HVYJyYU21Emi1o",
  authDomain: "phr-db-1.firebaseapp.com",
  projectId: "phr-db-1",
  storageBucket: "phr-db-1.appspot.com",
  messagingSenderId: "674228357055",
  appId: "1:674228357055:web:9abe9c9616db524ae8830a",
  measurementId: "G-WGKJHNY2GY",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider, db };
// const analytics = getAnalytics(app);
