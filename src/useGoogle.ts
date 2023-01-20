import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "AIzaSyBf_F1k6BaATK4b7M8sXb7d38CUE2WMtk0",
  version: "weekly",
  libraries: ["places"],
});

const useGoogle = async () => await loader.loadPromise();

export default useGoogle;
