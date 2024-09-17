import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { BiSolidPrinter } from "react-icons/bi";
import { RiFileDownloadFill } from "react-icons/ri";
import { FaFolderPlus } from "react-icons/fa";
import Scroll from "../../components/Scroll";
import Footer from "../../components/Footer";

function favorite({ user }) {
  const { t } = useTranslation();
  const [show, setShow] = useState([]);
  const API = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchShow();
  }, []);

  async function fetchShow() {
    try {
      let result = await axios.get(`${API}/favorite`);
      setShow(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addDoc(favoriteId) {
    try {
      const confirmAddBox = window.confirm(`Document added!`);
      if (!confirmAddBox) {
        return;
      }
      await axios.post(`${API}/users-favorites`, {
        user_id: user.user_id,
        favorite_id: favoriteId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2 className="m-5">{t("favorite.available_documents")}</h2>
      <div className="container">
        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center my-5 mx-auto">
            <thead className="fs-3" style={{ backgroundColor: "#38b6ff" }}>
              <tr>
                <th scope="col">{t("favorite.category")}</th>
                <th scope="col">{t("favorite.name")}</th>
                <th scope="col">{t("favorite.document")}</th>
                <th scope="col">{t("favorite.add_document")}</th>
              </tr>
            </thead>
            <tbody>
              {show.map((item, index) => {
                return (
                  <tr key={index} className="table-row">
                    <td>{item.category}</td>
                    <td>{item.name}</td>

                    <td>
                      <button>
                        <a
                          href={item.image}
                          target="_blank"
                          rel="noreferrer"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <BiSolidPrinter style={{ color: "#38b6ff" }} />{" "}
                          {t("favorite.print_/_download")}{" "}
                          <RiFileDownloadFill style={{ color: "#38b6ff" }} />
                        </a>
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={() => addDoc(item.favorite_id)}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {t("favorite.add")}{" "}
                        <FaFolderPlus style={{ color: "green" }} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Scroll />
      <Footer />
    </div>
  );
}

export default favorite;