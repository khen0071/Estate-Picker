import { useNavigate, useLocation, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-navbarBg/90 sticky z-40 top-0 left-0 right-0 navContainer">
        <div
          onClick={() => navigate("/")}
          className="flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span className="text-[20px] font-bold text-white gradientOverlay md:text-[20px]">
            Estate Picker
          </span>
        </div>

        <div className="hidden md:block space-x-8 md:text-[16px]">
          <ul className="flex md:space-x-5 lg:pr-[100px]">
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
            <div className="buttonContainer font-bold min-w-28 mx-auto text-[12px] md:mx-0 md:text-[16px] md:min-w-24">
              Listings
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
