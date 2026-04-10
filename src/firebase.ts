import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgojaU5wCp3YJv5w6Hg03yi__3oLCEU3U",
    authDomain: "personal-page-45ff4.firebaseapp.com",
    projectId: "personal-page-45ff4",
    storageBucket: "personal-page-45ff4.appspot.com",
    messagingSenderId: "972359728534",
    appId: "1:972359728534:web:a654317835cc31362ff1b7",
    measurementId: "G-0TTFX921G4"
};

// TODO: Replace with the config from your other project (the one with the news events data)
const newsProjectConfig = {
    apiKey: "AIzaSyAp3P1G_IjUnXoyl34GT3HRAlClP5Y-lv4",
    authDomain: "streaming-news-intelligence.firebaseapp.com",
    projectId: "streaming-news-intelligence",
    storageBucket: "streaming-news-intelligence.firebasestorage.app",
    messagingSenderId: "635886365831",
    appId: "1:635886365831:web:affdfd9694def8dd095c22",
    measurementId: "G-8H9B16VM37"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);

const newsApp: FirebaseApp = initializeApp(newsProjectConfig, "news-source");
export const newsDb: Firestore = getFirestore(newsApp);

export default app;
