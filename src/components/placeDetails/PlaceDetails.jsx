import { Marker, Popup } from "react-leaflet";
import { useState, useEffect, useContext } from "react";
import { MapContext } from "../../features/context/MapContext";

const PlaceDetails = ({ places }) => {
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);
  const { setSelectedLocation } = useContext(MapContext);

  const handlePlaceClick = async (place) => {
    setSelectedLocation(`${place.geocodes.main.latitude},${place.geocodes.main.longitude}`);
    try {
      const response = await fetch(`http://localhost:3001/place-details?fsq_id=${place.fsq_id}`);
      const data = await response.json();
      setSelectedPlaceDetails(data);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  useEffect(() => {
    console.log("selectedPlaceDetails updated:", selectedPlaceDetails);
  }, [selectedPlaceDetails]);

  return (
    <>
      {places.map((place) => (
        <Marker
          key={place.fsq_id}
          position={[place.geocodes.main.latitude, place.geocodes.main.longitude]}
          eventHandlers={{
            click: () => handlePlaceClick(place),
          }}
        >
          <Popup>
            <div>
              <h3>{place.name}</h3>
              {selectedPlaceDetails && selectedPlaceDetails.name === place.name && (
                <div>
                  <p>
                    <strong>Address:</strong> {selectedPlaceDetails.address}
                  </p>
                  {selectedPlaceDetails.phone !== "Phone number not provided" && (
                    <p>
                      <strong>Phone:</strong> {selectedPlaceDetails.phone}
                    </p>
                  )}
                  {selectedPlaceDetails.website !== "Website not available" && (
                    <p>
                      <strong>Website:</strong>{" "}
                      <a href={selectedPlaceDetails.website} target="_blank" rel="noopener noreferrer">
                        {selectedPlaceDetails.website}
                      </a>
                    </p>
                  )}
                  {selectedPlaceDetails.openingHours !== "Opening hours not provided" && (
                    <p>
                      <strong>Opening Hours:</strong> {selectedPlaceDetails.openingHours}
                    </p>
                  )}
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default PlaceDetails;
