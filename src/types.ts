import type {
  DocumentReference,
  GeoPoint,
  Timestamp,
} from "firebase/firestore";

export type Place = Pick<
  google.maps.places.PlaceResult,
  "place_id" | "name" | "formatted_address"
> & { coords: GeoPoint };

export type Visit = {
  id: string;
  date: Timestamp;
  place: Place;
  userId: string;
};

export interface VisitUpload extends Omit<Visit, "place" | "id"> {
  place: DocumentReference<Place>;
}

export type CompoundPlace = Place & { visits: Visit[] };
