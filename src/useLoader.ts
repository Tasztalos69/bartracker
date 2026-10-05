import { Loader } from "@googlemaps/js-api-loader";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getCurrentUser } from "vuefire";
import { firebaseApp } from "./firebase";

const createLoader = async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Maps are only available to signed-in users");

  const snap = await getDoc(doc(getFirestore(firebaseApp), "config", "maps"));
  const apiKey = snap.data()?.apiKey;
  if (!apiKey) throw new Error("No Maps API key in config/maps");

  return new Loader({
    apiKey,
    version: "weekly",
    libraries: ["places"],
  });
};

let pending: Promise<Loader> | null = null;

/** Resolves the Maps loader, fetching the key once per session. */
const useLoader = () => {
  if (!pending) {
    pending = createLoader().catch((e) => {
      pending = null; // let a later login retry
      throw e;
    });
  }
  return pending;
};

export default useLoader;
