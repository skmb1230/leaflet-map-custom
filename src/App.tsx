import { IconOptions } from "leaflet";
import "./App.css";
import MapComponent, { CustomArrayMarkersType } from "./components/MapComponent";

const currentIconUrl: IconOptions = { iconUrl: "../public/special_albamonz.svg", iconSize: [32, 32] };
const customMarkers: CustomArrayMarkersType[] = [
  {
    position: {
      lat: 37.51800537109375,
      lng: 127.06338500976562,
    },
    popupText: "서비스점검 회사명 5602 # 서비스점검 회사명 5602외 4건",
  },
  {
    position: { lat: 37.49315643310547, lng: 127.01465606689453 },
    popupText: "버거킹 신당역점",
  },
  {
    position: { lat: 37.49665069580078, lng: 127.02692413330078 },
    popupText: "근무회사명이에요",
  },
];

function App() {
  return (
    <div style={{ width: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>React Leaflet 지도</h2>
      <MapComponent
        position={{ lat: 37.49315643310547, lng: 127.01465606689453 }}
        markerOptions={{ isZoomCenter: true, isMarkerCenter: true }}
        currentIconOption={currentIconUrl}
        markers={customMarkers}
      />
    </div>
  );
}
export default App;
