import { useMap } from "react-leaflet";

const PlaceSearch = ({ setSearchResults }) => {
  const map = useMap();

  const handleSearch = async () => {
    const center = map.getCenter();
    try {
      const response = await fetch(
        `http://localhost:3001/search?lat=${center.lat}&lon=${center.lng}`
      );
      const data = await response.json();
      console.log(data);
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error searching for job agencies:", error);
    }
  };

  return (
    <div className="leaflet-control">
      <button onClick={handleSearch}>Find Nearby Job Agencies</button>
    </div>
  );
};

export default PlaceSearch;
