import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Scroll from "../../components/Scroll";
import NavBar from "../../components/NavBar"

function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      <NavBar />
      <h2 className="m-5">{t("resources.available_resources")}</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 m-5">
        <div className="col">
          <div className="card h-100 p-2">
            <Link to={`/jobs`} style={{ textDecoration: "none" }}>
              <img
                src="job.jpeg"
                className="card-img-top"
                alt="Picture for Jobs Card"
                style={{
                  objectFit: "cover",
                  height: "250px"
                }}
              />
              <div className="card-body" style={{ color: "black" }}>
                <h4 className="card-title text-center">{t("home.jobs")}</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <button className="m-5">
        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
          {t("button.back")}
        </Link>
      </button>
      <Scroll />
      <Footer />
    </div>
  );
}

export default HomePage;