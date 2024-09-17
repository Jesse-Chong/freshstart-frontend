import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Scroll from "../../components/Scroll";

const API_KEY = import.meta.env.VITE_API_KEY;
const url = import.meta.env.VITE_BASE_URL;

function JobsPage({ coordinates }) {
  const [isLoadingDirections, setIsLoadingDirections] = useState(false);
  const [visible, setVisible] = useState(3);
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);
  const [markerIcon, setMarkerIcon] = useState("");
  const [origin, setOrigin] = useState(null);
  const [showDirectionsButton, setShowDirectionsButton] = useState(false);
  const { t } = useTranslation();


  if (coordinates === null) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  function Loadmore() {
    setVisible(visible + 3);
  }

  return (
    <div>
      <NavBar />
      <div className="container text-center mt-3">
        <button
          onClick={() => {
            setSearch("job+agency");
            setMarkerIcon(jobs);
          }}
        >
          {t("jobs.job_agencies")}
        </button>
        <div className="row">
          <div className="col-md-6 mt-3"></div>
          <div className="col-md-6">
            {places.slice(0, visible).map((item) => {
              return (
                <div
                  className="col"
                  key={item.place_id}
                  onClick={() => handlePlaceClick(item)}
                >
                  <br />
                  <div className="card h-100 p-2">
                    <div className="card-body" style={{ color: "#38B6FF" }}>
                      <span className="fw-bold ">{t("infoWindow.name")} </span>
                      <p className="card-title">{item.name}</p>
                      <span className="fw-bold">
                        {t("infowindow.currently")}{" "}
                      </span>
                      {item.opening_hours?.open_now ? "Open Now" : "Closed"}
                    </div>
                  </div>
                </div>
              );
            })}
            {visible < places.length && (
              <button type="button" className="m-5" onClick={Loadmore}>
                {t("all.load_more")}
              </button>
            )}
          </div>
        </div>
      </div>
      <button className="m-5">
        <Link
          to={"/resources"}
          style={{ textDecoration: "none", color: "black" }}
        >
          {t("all.back")}
        </Link>
      </button>
      <Scroll />
      <Footer />
      <div
        className="offcanvas offcanvas-bottom"
        tabindex="-1"
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title fs-1"
            style={{ color: "#38B6FF" }}
            id="offcanvasBottomLabel"
          >
            {t("jobs.job_agencies")}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body fs-3" style={{ color: "#38B6FF" }}>
          {t("card.jobs")}
        </div>
      </div>
    </div>
  );
}

export default JobsPage;