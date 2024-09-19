import { useContext } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapContext } from "../../features/context/MapContext";
import PlaceDetails from "../placeDetails/PlaceDetails";
import RouteOptions from "../routing/routeOptions";
import RouteInstructions from "../routing/routeInstructions";
import PlaceSearch from "../placeSearch/PlaceSearch";
import PolylineRouting from "../routing/PolyLineRouting";
const Leaflet = () => {
  const {
    searchResults,
    setSearchResults,
    selectedLocation,
    startLocation,
    transportMode,
    setTransportMode,
    instructions,
    setInstructions,
    setRouteSummary
  } = useContext(MapContext);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <div style={{ flex: "1", maxWidth: "70%", position: "relative" }}>
        <MapContainer
          center={[40.743, -73.9419]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Static Marker for initial location */}
          <Marker position={[40.743, -73.9419]} />
          
          {/* Search control to trigger nearby job agency search */}
          <PlaceSearch setSearchResults={setSearchResults} />
          
          {/* Render PlaceSearch to show job agencies as markers */}
          <PlaceDetails places={searchResults} />
          {/* Render PolylineRouting to show polyline from A to B*/}
          <PolylineRouting startLocation={startLocation} endLocation={selectedLocation} transportMode={transportMode} />
        </MapContainer>
      </div>

      {/* Sidebar for route options and instructions */}
      <div style={{ flex: "1", maxWidth: "30%", padding: "20px", overflowY: "auto" }}>
        <RouteOptions
          selectedLocation={selectedLocation}
          startLocation={startLocation}
          transportMode={transportMode}
          setTransportMode={setTransportMode}
          setInstructions={setInstructions}
          setRouteSummary={setRouteSummary}
        />
        <RouteInstructions instructions={instructions} />
      </div>
    </div>
  );
};

export default Leaflet;