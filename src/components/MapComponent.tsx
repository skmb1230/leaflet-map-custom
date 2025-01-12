import L, { IconOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

interface PositionType {
  lat: number;
  lng: number;
}
interface markerOptionType {
  /** current location center marker */
  isMarkerCenter?: boolean;
  /** click marker */
  isClickMaker?: boolean;
  /** zoom center maker */
  isZoomCenter?: boolean;
}
interface MapComponentProps {
  /** map latitude and longitude */
  position: PositionType;
  /** custom styles */
  className?: string;
  /** zoom level */
  zoom?: number;
  /** current Location Marker */
  hasCurrentLocationMarker?: boolean;
  /** markerOption */
  markerOptions?: markerOptionType;
  /** array markers */
  markers?: PositionType[];
  /** current icon option */
  currentIconOption?: IconOptions;
}

const MapComponent = (props: MapComponentProps) => {
  const { position, zoom = 16, markerOptions, hasCurrentLocationMarker = true, markers = [], currentIconOption } = props;
  const [currentLocation, setCurrentLocation] = useState<PositionType>(position);

  const defaultIcon = L.icon({
    iconUrl: currentIconOption?.iconUrl || "https://cdn-icons-png.flaticon.com/512/684/684908.png", // default image URL
    iconSize: currentIconOption?.iconSize || [32, 32],
    iconAnchor: currentIconOption?.iconAnchor || [16, 32],
  });

  const MarkerHandler = () => {
    useMapEvents({
      click: (e) => {
        if (!markerOptions?.isClickMaker) {
          return;
        }
        setCurrentLocation(e.latlng);
      },
      moveend: (e) => {
        if (!markerOptions?.isMarkerCenter) {
          return;
        }
        setCurrentLocation(e.target.getCenter());
      },
      zoomend: (e) => {
        if (!markerOptions?.isZoomCenter) {
          return;
        }
        setCurrentLocation(e.target.getCenter());
      },
    });

    return <Marker position={currentLocation} icon={defaultIcon} />;
  };

  return (
    <MapContainer center={position} zoom={zoom} className="leaflet-container" style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {hasCurrentLocationMarker && <MarkerHandler />}
    </MapContainer>
  );
};

export default MapComponent;
