// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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

const loginConfig = {
  apiKey: "AIzaSyBNfzNOwn5v4OyUNgAP-_LFTEU6xG_H_1c",
  authDomain: "phr-db.firebaseapp.com",
  projectId: "phr-db",
  storageBucket: "phr-db.appspot.com",
  messagingSenderId: "90909279544",
  appId: "1:90909279544:web:1f93c480db0dafbec7edcd",
  measurementId: "G-WTNLDGKSM3",
};
// Initialize Firebase
const app = initializeApp(loginConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
// const analytics = getAnalytics(app);
