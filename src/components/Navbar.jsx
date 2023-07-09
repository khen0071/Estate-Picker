import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <>
      <div className={styles.navbarMobile_container}>
        <footer className={styles.navbar}>
          <nav className={styles.navbarNav}>
            <ul className={styles.navbarListItems}>
              <li
                className={styles.navbarListItem}
                onClick={() => navigate("/")}
              >
                {/* Alternate  */}
                {/* {pathMatchRoute("/") ? (
                <i className="fa-solid fa-magnifying-glass icon"></i>
              ) : (
                <i className="fa-solid fa-magnifying-glass icon-dark"></i>
              )} */}

                <i
                  className={
                    pathMatchRoute("/")
                      ? "fa-solid fa-magnifying-glass icon"
                      : "fa-solid fa-magnifying-glass icon-dark"
                  }
                ></i>

                <p
                  className={
                    pathMatchRoute("/") ? "navbarParaActive" : "navbarPara"
                  }
                >
                  Explore
                </p>
              </li>
              <li
                className={styles.navbarListItem}
                onClick={() => navigate("/offers")}
              >
                <i
                  className={
                    pathMatchRoute("/offers")
                      ? "fa-solid fa-tags icon"
                      : "fa-solid fa-tags icon-dark"
                  }
                ></i>

                <p
                  className={
                    pathMatchRoute("/offers")
                      ? "navbarParaActive"
                      : "navbarPara"
                  }
                >
                  Offers
                </p>
              </li>{" "}
              <li
                className={styles.navbarListItem}
                onClick={() => navigate("/profile")}
              >
                <i
                  className={
                    pathMatchRoute("/profile")
                      ? "fa-solid fa-user icon"
                      : "fa-solid fa-user icon-dark"
                  }
                ></i>

                <p
                  className={
                    pathMatchRoute("/profile")
                      ? "navbarParaActive"
                      : "navbarPara"
                  }
                >
                  Profile
                </p>

                {/* {!user ? (
                  <p
                    className={
                      pathMatchRoute("/profile")
                        ? "navbarParaActive"
                        : "navbarPara"
                    }
                  >
                    Login
                  </p>
                ) : (
                  <p
                    className={
                      pathMatchRoute("/profile")
                        ? "navbarParaActive"
                        : "navbarPara"
                    }
                  >
                    Profile
                  </p>
                )} */}
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Navbar;
