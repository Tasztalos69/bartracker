import { reactive } from "vue";
import type { Place } from "./types";

interface Store {
  map: google.maps.Map | null;
  markers: google.maps.Marker[];
  infoWindows: google.maps.InfoWindow[];
  places: Place[];
}

const store: Store = reactive({
  map: null,
  markers: [],
  infoWindows: [],
  places: [],
});

export default store;
