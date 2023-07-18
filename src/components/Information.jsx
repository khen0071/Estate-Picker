import { Link } from "react-router-dom";

const Information = () => {
  return (
    <>
      <div className="informationContainer">
        <div className="informationContent">
          <i className="fa-solid fa-house information_icon"></i>
          <h2 className="information_h2">Purchase A Home</h2>
          <p className="information_p">
            Buying a house is about finding a place where dreams can flourish
            and memories can be made.
          </p>

          <div>
            <Link to="/category/sale" className="information_readContainer">
              <span className="information_span">Buy Now</span>
              <i className="fa-solid fa-arrow-right information_icon_arrow"></i>
            </Link>
          </div>
        </div>

        <div className="informationContent">
          <i className="fa-solid fa-building information_icon"></i>
          <h2 className="information_h2">Rent A Home</h2>
          <p className="information_p">
            A rented house may be temporary, but the memories and experiences
            can last a lifetime.
          </p>
          <div>
            <Link to="/category/rent" className="information_readContainer">
              <span className="information_span">Rent Now</span>
              <i className="fa-solid fa-arrow-right information_icon_arrow"></i>
            </Link>
          </div>
        </div>

        <div className="informationContent">
          <i className="fa-solid fa-circle-dollar-to-slot information_icon"></i>
          <h2 className="information_h2">Sell Your Property</h2>
          <p className="information_p">
            Every house has a unique story to tell. It's time to let the next
            chapter begin for a new owner.
          </p>
          <div>
            <Link to="/profile" className="information_readContainer">
              <span className="information_span">Sell Now</span>
              <i className="fa-solid fa-arrow-right information_icon_arrow"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
