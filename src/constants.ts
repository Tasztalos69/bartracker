// Budapest
export const CENTER: google.maps.LatLngLiteral = {
  lat: 47.5011283,
  lng: 19.05,
};
export const DEFAULT_ZOOM = 13;

const padding = 0.1;

export const BOUNDS: google.maps.LatLngBoundsLiteral = {
  north: CENTER.lat + padding,
  south: CENTER.lat - padding,
  east: CENTER.lng + padding,
  west: CENTER.lng - padding,
};
