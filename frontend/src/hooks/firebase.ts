import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaeUPUfFu4HcIVx1-WbEOpWtniCggOoGw",
  authDomain: "shop-f6d4c.firebaseapp.com",
  projectId: "shop-f6d4c",
  storageBucket: "shop-f6d4c.appspot.com",
  messagingSenderId: "243624899144",
  appId: "1:243624899144:web:4097ac7911f5fc3b4dde7d",
  measurementId: "G-CW6TFR5H1F",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export default storage;
