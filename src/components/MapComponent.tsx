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
  /** has marker */
  hasMarker?: boolean;
  /** markerOption */
  markerOption?: markerOptionType;
}

const MapComponent = (props: MapComponentProps) => {
  const { position, zoom = 16, markerOption, hasMarker = true } = props;
  const [positionState, setPositionState] = useState<PositionType>(position);

  const MarkerHandler = () => {
    useMapEvents({
      click: (e) => {
        if (!markerOption?.isClickMaker) {
          return;
        }
        setPositionState(e.latlng);
      },
      moveend: (e) => {
        if (!markerOption?.isMarkerCenter) {
          return;
        }
        setPositionState(e.target.getCenter());
      },
      zoomend: (e) => {
        if (!markerOption?.isZoomCenter) {
          return;
        }
        setPositionState(e.target.getCenter());
      },
    });

    return <Marker position={positionState} />;
  };

  return (
    <MapContainer center={position} zoom={zoom} className="leaflet-container" style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {hasMarker && <MarkerHandler />}
    </MapContainer>
  );
};

export default MapComponent;
