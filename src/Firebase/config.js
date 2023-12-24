import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

  const firebaseConfig = {
    apiKey: "AIzaSyACbb8xiEtST3vEAiB2y6mJ1I9j-uOZ4I0",
    authDomain: "ecommerce-bf377.firebaseapp.com",
    projectId: "ecommerce-bf377",
    storageBucket: "ecommerce-bf377.appspot.com",
    messagingSenderId: "330566948317",
    appId: "1:330566948317:web:1d732d1e6c165c1bdc9234",
    measurementId: "G-MK98VFKFZQ"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
