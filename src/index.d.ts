import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";

declare module "*.geojson" {
  const value: FeatureCollection<Geometry, GeoJsonProperties>;
  export default value;
}
