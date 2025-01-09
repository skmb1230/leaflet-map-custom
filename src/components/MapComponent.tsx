import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const MapComponent = () => {
  const position = { lat: 37.5665, lng: 126.978 }; // 서울 좌표

  return (
    <MapContainer center={position} zoom={13} className="leaflet-container">
      {/* 지도 타일 레이어 */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* 마커 */}
      <Marker position={position}>
        <Popup>여기는 서울입니다! 🏙️</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
