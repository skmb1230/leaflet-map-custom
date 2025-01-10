import "./App.css";
import MapComponent from "./components/MapComponent";

function App() {
  return (
    <div style={{ width: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>React Leaflet 지도</h2>
      <MapComponent position={{ lat: 37.5665, lng: 126.978 }} markerOption={{ isZoomCenter: true }} />
    </div>
  );
}
export default App;
