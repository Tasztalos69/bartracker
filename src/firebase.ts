import { initializeApp } from "firebase/app";

const config = {
  apiKey: "AIzaSyAdmVHxKkWRnHseyx-KPKn-rSgmhxg_vh0",
  authDomain: "bartracker-2fdbf.firebaseapp.com",
  projectId: "bartracker-2fdbf",
  storageBucket: "bartracker-2fdbf.appspot.com",
  messagingSenderId: "86801625369",
  appId: "1:86801625369:web:f494184178490914b65588",
};

export const firebaseApp = initializeApp(config);
