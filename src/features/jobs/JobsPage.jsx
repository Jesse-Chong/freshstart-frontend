import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Scroll from "../../components/Scroll";
import Leaflet from "../../components/leafletMaps/Leaflet";

function JobsPage() {
  const [places, setPlaces] = useState([]);
  const [visible, setVisible] = useState(3);
  const { t } = useTranslation();
  const [coordinates, setCoordinates] = useState(null);

  // Load coordinates from local storage on initial render
  useEffect(() => {
    const storedCoordinates = JSON.parse(localStorage.getItem("coordinates"));
    if (storedCoordinates) {
      setCoordinates(storedCoordinates);
    }
  }, []);

  if (coordinates === null) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  function LoadMore() {
    setVisible(visible + 3);
  }

  return (
    <div>
      <NavBar />
      <div>
        <h2>{t("jobs.job_agencies")}</h2>
        <Leaflet coordinates={coordinates} />
        {places.slice(0, visible).map((place) => (
          <div key={place.id}>
            <h3>{place.name}</h3>
            <p>{place.address}</p>
          </div>
        ))}
        {visible < places.length && <button onClick={LoadMore}>{t("all.load_more")}</button>}
      </div>
      <Scroll />
      <Footer />
    </div>
  );
}

export default JobsPage;
