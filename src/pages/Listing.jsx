import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

import { register } from "swiper/element/bundle";
register();

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  const swiperElRef = useRef(null);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        navigation="true"
        pagination="true"
      >
        {listing.imgUrls.map((url, index) => (
          <swiper-slide key={index}>
            <div
              className="swiperSlideDiv"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </swiper-slide>
        ))}
      </swiper-container>

      <div className="flex md:h-full h-[60vh] flex-col justify-start items-start m-4 md:m-10 md:flex-row md:space-x-3">
        <div className="space-y-1 flex flex-col w-full my-1 p-3 md:p-6 hover:bg-[#9A7884] border border-l-4 border-t-4 border-gray hover:border-white ease-in-out duration-500">
          <div className="flex flex-col justify-center items-center md:items-start">
            <h1 className="text-lightOrange font-bold text-[16px] md:text-[24px]">
              {listing.name}
            </h1>
            <h3 className="text-white text-[12px] md:text-[16px] italic font-semibold">
              {listing.location}
            </h3>

            {listing.offer ? (
              <div className="flex items-center my-3">
                {listing.type === "rent" ? (
                  <span className="uppercase font-bold border px-3 mr-3 text-blue text-[12px] md:text-[16px]">
                    Rent
                  </span>
                ) : (
                  <span className="uppercase font-bold border px-3 mr-3 text-green text-[12px] md:text-[16px]">
                    Sale
                  </span>
                )}

                <span className="text-[12px] pr-2 text-black font-semibold line-through flex md:text-[14px]">
                  <span className="text-[10px] self-start">$</span>
                  {listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                </span>
                <span className="flex text-[16px] text-white font-bold md:text-[18px]">
                  <span className="text-[12px] self-start">$</span>
                  {listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {listing.type === "rent" ? (
                    <span className="text-[10px] self-end"> / month</span>
                  ) : null}
                </span>
              </div>
            ) : (
              <div className="flex items-center my-3">
                {listing.type === "rent" ? (
                  <span className="uppercase font-bold border px-3 mr-3 text-blue text-[14px]">
                    Rent
                  </span>
                ) : (
                  <span className="uppercase font-bold border px-3 mr-3 text-green text-[14px]">
                    Sale
                  </span>
                )}
                <span className="text-[18px] text-white font-bold flex">
                  <span className="text-[12px] self-start">$</span>
                  {listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  {listing.type === "rent" ? (
                    <span className="text-[10px] self-end"> / month</span>
                  ) : null}
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="buttonContainer text-[12px] font-semibold md:text-[14px]">
              {auth.currentUser?.uid !== listing.userRef ? (
                <Link
                  to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                  className="primaryButton"
                >
                  <button className="uppercase">Contact Landlord</button>
                </Link>
              ) : (
                <Link to="/profile">
                  <button className="uppercase">Go To Listings</button>
                </Link>
              )}
            </div>

            <div
              className="buttonContainer text-[12px] font-semibold md:text-[14px]"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setShareLinkCopied(true);
                toast.success("Link Copied");
              }}
            >
              <button className="uppercase">
                Share <i className="fa-solid fa-share-nodes"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-3 flex flex-col w-full my-1 p-5 md:p-[30px]  hover:bg-[#9A7884] border border-l-4 border-t-4 border-gray hover:border-white ease-in-out duration-500">
          {" "}
          <div className="flex flex-row justify-between items-center">
            <div className="space-y-3">
              <div className="flex items-center">
                <div>
                  <i className="fa-solid fa-bed w-[30px] text-lightOrange text-[20px] md:text-[30px] md:w-[40px]"></i>
                </div>
                <div className="ml-3">
                  <div className="text-[10px] text-white md:text-[12px]">
                    Accommodation
                  </div>
                  <p className="text-[12px] text-white font-bold md:text-[14px]">
                    {listing.bedrooms}{" "}
                    {listing.bedrooms > 1 ? "Bedrooms" : "Bedroom"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <i className="fa-solid fa-building w-[30px] text-lightOrange text-center text-[20px] md:text-[30px] md:w-[40px]"></i>
                </div>
                <div className="ml-3">
                  <div className="text-[10px] text-white md:text-[12px]">
                    Floors
                  </div>
                  <p className="text-[12px] text-white font-bold md:text-[14px]">
                    {listing.floors} {listing.floors > 1 ? "Floors" : "Floor"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <i className="fa-solid fa-car w-[30px] text-lightOrange text-center text-[20px] md:text-[30px] md:w-[40px]"></i>
                </div>
                <div className="ml-3">
                  <div className="text-[10px] text-white md:text-[12px]">
                    Parking
                  </div>
                  <p className="text-[12px] text-white font-bold md:text-[14px]">
                    {listing.parking ? "Available" : "Unavailable"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <div>
                  <i className="fa-solid fa-shower w-[30px] text-lightOrange text-center text-[20px] md:text-[30px] md:w-[40px]"></i>
                </div>
                <div className="ml-3">
                  <div className="text-[10px] text-white md:text-[12px]">
                    Wash Area
                  </div>

                  <p className="text-[12px] text-white font-bold md:text-[14px]">
                    {listing.bathrooms}{" "}
                    {listing.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <i className="fa-solid fa-arrows-up-down-left-right w-[30px] text-lightOrange text-center text-[20px] md:text-[30px] md:w-[40px]"></i>
                </div>

                <div className="ml-3">
                  <div className="text-[10px] text-white md:text-[12px]">
                    Floor Area
                  </div>
                  <p className="text-[12px] text-white font-bold md:text-[14px]">
                    {listing.floorArea
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    Sq Ft
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <i className="fa-solid fa-couch w-[30px] text-lightOrange text-center text-[20px] md:text-[30px] md:w-[40px]"></i>
                </div>
                <div className="ml-3">
                  <div className="text-[10px] text-white md:text-[12px]">
                    Furnished
                  </div>
                  <p className="text-[12px] text-white font-bold md:text-[14px]">
                    {listing.furnished ? "Yes" : "Not Furnished"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listing;
