import { createContext, useState } from "react";

export const MapContext = createContext();
export const MapProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [startLocation] = useState('40.743,-73.9419');
  const [transportMode, setTransportMode] = useState('car');
  const [instructions, setInstructions] = useState([]);
  const [routeSummary, setRouteSummary] = useState(null);

  return (
    <MapContext.Provider
      value={{
        searchResults,
        setSearchResults,
        selectedLocation,
        setSelectedLocation,
        startLocation,
        transportMode,
        setTransportMode,
        instructions,
        setInstructions,
        routeSummary,
        setRouteSummary
      }}
    >
      {children}
    </MapContext.Provider>
  );
};