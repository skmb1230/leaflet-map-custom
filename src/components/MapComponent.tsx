import L, { IconOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";

interface PositionType {
  lat: number;
  lng: number;
}

export interface CustomArrayMarkersType {
  position: PositionType;
  popupText?: string;
  iconOptions?: IconOptions;
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
  markers?: CustomArrayMarkersType[];
  /** current icon option */
  currentIconOption?: IconOptions;
}
const defaultIconUrl = "https://cdn-icons-png.flaticon.com/512/684/684908.png";
const defaultIconSize: [number, number] = [32, 32];
const defaultIconAnchor: [number, number] = [16, 32];

const MapComponent = (props: MapComponentProps) => {
  const { position, zoom = 16, markerOptions, hasCurrentLocationMarker = true, markers = [], currentIconOption } = props;
  const [currentLocation, setCurrentLocation] = useState<PositionType>(position);

  const defaultIcon = L.icon({
    iconUrl: currentIconOption?.iconUrl || defaultIconUrl, // default image URL
    iconSize: currentIconOption?.iconSize || defaultIconSize,
    iconAnchor: currentIconOption?.iconAnchor || defaultIconAnchor,
  });

  const loadGeoJSON = async () => {
    const response = await fetch("/src/assets/subway.geojson");
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    loadGeoJSON();
  }, []);

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
      {markers &&
        markers.length > 0 &&
        markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={marker.iconOptions ? L.icon({ ...defaultIcon, ...marker.iconOptions }) : defaultIcon}>
            <Popup>{marker.popupText}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
