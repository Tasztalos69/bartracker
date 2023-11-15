import { reactive } from "vue";
import type { CompoundPlace } from "./types";

interface Store {
  map: google.maps.Map | null;
  markers: google.maps.Marker[];
  infoWindows: google.maps.InfoWindow[];
  places: CompoundPlace[];
}

const store: Store = reactive({
  map: null,
  markers: [],
  infoWindows: [],
  places: [],
});

export default store;
