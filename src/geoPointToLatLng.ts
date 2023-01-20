import type { GeoPoint } from "firebase/firestore";

const geoToLatLng = (point: GeoPoint): google.maps.LatLngLiteral => ({
  lat: point.latitude,
  lng: point.longitude,
});

export default geoToLatLng;
