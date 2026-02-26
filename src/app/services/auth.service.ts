import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword} from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAX-G0WjPjhoapeKbRQB8D74oFuljN07UA",
  authDomain: "stage-b93de.firebaseapp.com",
  projectId: "stage-b93de",
  storageBucket: "stage-b93de.firebasestorage.app",
  messagingSenderId: "276212201987",
  appId: "1:276212201987:web:a3478d3ef760dae6dfec36",
  measurementId: "G-YMZP1TWQ4C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

