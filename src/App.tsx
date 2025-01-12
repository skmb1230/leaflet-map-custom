import { IconOptions } from "leaflet";
import "./App.css";
import MapComponent from "./components/MapComponent";

const currentIconUrl: IconOptions = { iconUrl: "../public/special_albamonz.svg", iconSize: [32, 32] };

function App() {
  return (
    <div style={{ width: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>React Leaflet 지도</h2>
      <MapComponent position={{ lat: 37.5665, lng: 126.978 }} markerOptions={{ isZoomCenter: true }} currentIconOption={currentIconUrl} />
    </div>
  );
}
export default App;
