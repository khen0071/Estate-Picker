import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  const onChange = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <>
      <div className="bg-navbarBg/90 navContainer">
        <div className="max-w-[1440px] m-auto flex items-start justify-between px-6 py-4  sticky z-40 top-0 left-0 right-0 md:items-center">
          <div
            onClick={() => navigate("/")}
            className="flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span className="text-[20px] font-bold text-white gradientOverlay md:text-[20px]">
              Estate Picker
            </span>
          </div>

          <div className="hidden md:block space-x-8 md:text-[16px]">
            <ul className="flex md:space-x-5 lg:pr-[50px]">
              <li
                onClick={() => navigate("/offers")}
                className={
                  pathMatchRoute("/offers")
                    ? "linkContainerActive"
                    : "linkContainer"
                }
              >
                Offers
              </li>
              <li
                onClick={() => navigate("/category/sale")}
                className={
                  pathMatchRoute("/category/sale")
                    ? "linkContainerActive"
                    : "linkContainer"
                }
              >
                Sale
              </li>
              <li
                onClick={() => navigate("/category/rent")}
                className={
                  pathMatchRoute("/category/rent")
                    ? "linkContainerActive"
                    : "linkContainer"
                }
              >
                Rent
              </li>
            </ul>
          </div>

          <div>
            <Link to="profile">
              <div className="hidden buttonContainer font-bold min-w-28 mx-auto text-[12px] md:mx-0 md:text-[16px] md:min-w-24 md:block">
                Listings
              </div>
            </Link>
          </div>

          {/* Hamburger */}

          <button
            id="menu-btn"
            onClick={onChange}
            className="md:hidden focus:outline-none flex flex-col items-end"
          >
            <i className="fa-solid fa-bars text-white text-[20px]"></i>
          </button>
        </div>
        {menu === true ? (
          <div className="space-y-1 flex flex-col items-start mx-6 mb-6">
            <div
              className={
                pathMatchRoute("/offers")
                  ? "linkContainerActive"
                  : "linkContainer"
              }
              onClick={() => navigate("/offers")}
            >
              Offer
            </div>
            <div
              className={
                pathMatchRoute("/category/sale")
                  ? "linkContainerActive"
                  : "linkContainer"
              }
              onClick={() => navigate("/category/sale")}
            >
              Sale
            </div>
            <div
              className={
                pathMatchRoute("/category/rent")
                  ? "linkContainerActive"
                  : "linkContainer"
              }
              onClick={() => navigate("/category/rent")}
            >
              Rent
            </div>
            <div
              className="uppercase bg-lightOrange text-white hover:text-lightwhite px-3 py-1 text-semibold hover:bg-orange cursor-pointer border border-l-1 border-white  hover:border-white ease-in-out duration-300"
              onClick={() => navigate("/profile")}
            >
              Listings
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Header;
