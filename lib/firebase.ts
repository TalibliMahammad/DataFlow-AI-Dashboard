import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 1. Auth modulunu daxil et
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCvtnkP8RtZX2iBKKPDc6K-uQA92XIWQDU",
  authDomain: "dataflow-analytics-7d4f5.firebaseapp.com",
  projectId: "dataflow-analytics-7d4f5",
  storageBucket: "dataflow-analytics-7d4f5.firebasestorage.app",
  messagingSenderId: "759071990930",
  appId: "1:759071990930:web:5769aa65932789238e324b",
  measurementId: "G-KZ8M4R3WWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Auth obyektini yarat və EXPORT et
export const auth = getAuth(app); 

// Analytics Next.js-də server tərəfdə xəta verməməsi üçün yoxlama ilə:
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;