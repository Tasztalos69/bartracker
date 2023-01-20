import type { GeoPoint, Timestamp } from "firebase/firestore";

export type Place = Pick<
  google.maps.places.PlaceResult,
  "place_id" | "name" | "formatted_address"
> & { coords: GeoPoint; visits: Timestamp[] };
