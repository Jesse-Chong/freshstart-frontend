import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdOutlineWork } from "react-icons/md";

function NavBar() {
  const { t } = useTranslation();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid" style={{ backgroundColor: "#38B6FF" }}>
        <a className="navbar-brand fw-bold fs-1 py-3" href="/">
          <img
            src="Logo.png"
            alt="FreshStart Logo"
            style={{ width: "75px", height: "75px" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center justify-content-lg-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <div className="d-flex flex-column flex-lg-row align-items-center">
              <li className="nav-item mb-2 mb-lg-0">
                <button className="">
                  <Link
                    to={"/login"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {t("navbar.login")}
                  </Link>
                </button>
              </li>
              <li className="nav-item mb-2 mb-lg-0">
                <button className="m-3">
                  <Link
                    to={"/signup"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {t("navbar.signup")}
                  </Link>
                </button>
              </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/jobs"
                      style={{ color: "black" }}
                    >
                      <MdOutlineWork style={{ marginRight: ".5rem" }} />
                      {t("footer.jobs")}
                    </a>
                  </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;