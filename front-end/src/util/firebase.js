import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAlDO0gVzQdu5ssooPHlcGSOQcmsXEV2QM",
  authDomain: "sudoku-c8b0d.firebaseapp.com",
  projectId: "sudoku-c8b0d",
  storageBucket: "sudoku-c8b0d.appspot.com",
  messagingSenderId: "571861000293",
  appId: "1:571861000293:web:ad3dc6d098eaeb2fc1668c",
  measurementId: "G-XYYT308VFN"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };