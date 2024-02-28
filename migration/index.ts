import { initializeApp } from "firebase/app";
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const config = {
  apiKey: "AIzaSyAdmVHxKkWRnHseyx-KPKn-rSgmhxg_vh0",
  authDomain: "bartracker-2fdbf.firebaseapp.com",
  projectId: "bartracker-2fdbf",
  storageBucket: "bartracker-2fdbf.appspot.com",
  messagingSenderId: "86801625369",
  appId: "1:86801625369:web:f494184178490914b65588",
};

interface Visit {
  userId: string;
  date: any;
  place: any;
}

const main = async () => {
  const app = initializeApp(config);

  const db = getFirestore(app);

  // const querySnapshot = await getDocs(collection(db, "places"));
  // querySnapshot.forEach((docRes) => {
  //   docRes.data().visits.forEach(async (visit: any) => {
  //     const visitEntry: Visit = {
  //       userId: "FtDqyG2KEtMGcJMJrARPCLmAANE2",
  //       date: visit,
  //       place: docRes.ref,
  //     };

  //     await addDoc(collection(db, "visits"), visitEntry);

  //     console.log("Visit created.");
  //   });
  // });

  const querySnapshot = await getDocs(collection(db, "visits"));

  const ids: string[] = [];

  querySnapshot.forEach(async (docRes) => {
    console.log(docRes.data().date);
    const place: DocumentReference = docRes.data().place;
    ids.push(place.id);
  });

  const placesRef = collection(db, "places");

  const q = query(placesRef, where("id", "in", ids));

  const qs2 = await getDocs(q);
  qs2.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });

  // getDocs()
};

main();
