import "./App.css";
import MapComponent from "./components/MapComponent";

function App() {
  return (
    <div style={{ width: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>React Leaflet 지도</h1>
      <MapComponent />
    </div>
  );
}
export default App;
