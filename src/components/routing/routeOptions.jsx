import { handleGetRoute } from "./handleGetRoute";

const RouteOptions = ({ selectedLocation, startLocation, transportMode, setTransportMode, setInstructions, setRouteSummary }) => {
  return (
    <div className="route-options" style={{ marginBottom: "20px", padding: "15px", backgroundColor: "rgba(255, 0, 0, 0.5)", borderRadius: "5px", border: "2px solid red" }}>
      <select value={transportMode} onChange={(e) => setTransportMode(e.target.value)}>
        <option value="car">Car</option>
        <option value="pedestrian">Pedestrian</option>
        <option value="publicTransport">Public Transport</option>
        <option value="bicycle">Bicycle</option>
      </select>
      <button onClick={() => handleGetRoute(selectedLocation, startLocation, transportMode, setInstructions, setRouteSummary)}>
        Get Route
      </button>
    </div>
  );
};

export default RouteOptions;