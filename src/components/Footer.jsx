import { useTranslation } from "react-i18next";
import { MdWork } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="sticky-footer">
      <nav
        className="navbar navbar-dark"
        style={{ backgroundColor: "#38B6FF" }}
      >
        <div className="container-fluid">
          <div className="col text-icon">
            <div>
              <a
                className="navbar-brand text"
                href="/jobs"
                style={{ color: "black" }}
              >
                {t("footer.jobs")}
              </a>
              <Link to={"/jobs"} style={{ color: "black" }}>
                <MdWork className="icon" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;