import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

import { register } from "swiper/element/bundle";
register();

import styles from "../styles/Listing.module.css";

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
        slides-per-view="2"
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

      <div className={styles.listingContainer}>
        <div className={styles.listingContent}>
          <div className={styles.iconsContainer}>
            <div className={styles.listContainer}>
              <div className={styles.iconListing}>
                <div className={styles.icon}>
                  <i className="fa-solid fa-bed"></i>
                </div>
                <div className={styles.content}>
                  <h4>Accommodation</h4>
                  <p>
                    {listing.bedrooms}{" "}
                    {listing.bedrooms > 1 ? "Bedrooms" : "1 Bedroom"}
                  </p>
                </div>
              </div>
              <div className={styles.iconListing}>
                <div className={styles.icon}>
                  <i className="fa-solid fa-bath"></i>
                </div>
                <div className={styles.content}>
                  <h4>Wash Area</h4>
                  <p>
                    {listing.bathrooms}{" "}
                    {listing.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
                  </p>
                </div>
              </div>
              <div className={styles.iconListing}>
                <div className={styles.icon}>
                  <i className="fa-solid fa-building"></i>
                </div>
                <div className={styles.content}>
                  <h4>Floors</h4>
                  <p>
                    {listing.floors} {listing.floors > 1 ? "Floors" : "Floor"}
                  </p>
                </div>
              </div>
              <div className={styles.iconListing}>
                <div className={styles.icon}>
                  <i className="fa-solid fa-up-down-left-right"></i>
                </div>
                <div className={styles.content}>
                  <h4>Floor Area</h4>
                  <p>{listing.floorArea}</p>
                </div>
              </div>
              <div className={styles.iconListing}>
                <div className={styles.icon}>
                  <i className="fa-solid fa-car"></i>
                </div>
                <div className={styles.content}>
                  <h4>Parking</h4>
                  <p>
                    {listing.parking === true ? "With Garage" : "No Garage"}
                  </p>
                </div>
              </div>
              <div className={styles.iconListing}>
                <div className={styles.icon}>
                  <i className="fa-solid fa-couch"></i>
                </div>
                <div className={styles.content}>
                  <h4>Structure</h4>
                  <p>
                    {listing.furnished === true ? "Furnished" : "Not Furnished"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.listingDetails}>
            <div className={styles.section1}>
              <div className={styles.detailContainer}>
                <h3>{listing.name} </h3>
                <h4>{listing.location}</h4>
              </div>
            </div>

            <div className={styles.section2}>
              <div className={styles.typeContainer}>
                {" "}
                {listing.type === "rent" ? (
                  <p className={styles.forRent}>Rent</p>
                ) : (
                  <p className={styles.forSale}>Sale</p>
                )}
              </div>

              <div className={styles.priceContainer}>
                {listing.offer ? (
                  <p className={styles.regularPrice}>
                    $
                    {listing.regularPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                ) : (
                  <p className={styles.regularPrice2}>
                    $
                    {listing.regularPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                )}
              </div>

              <div className={styles.priceContainer}>
                {listing.offer ? (
                  <p className={styles.discountedPrice}>
                    $
                    {listing.discountedPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                ) : null}
                {listing.type === "rent" && (
                  <p className={styles.perMonth}> / monthly</p>
                )}
              </div>
            </div>

            <div className={styles.section3}>
              <div>
                {auth.currentUser?.uid !== listing.userRef ? (
                  <Link
                    to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                    className="primaryButton"
                  >
                    <button className={styles.contactButton}>
                      Contact Landlord
                    </button>
                  </Link>
                ) : (
                  <Link to="/profile">
                    <button className={styles.contactButton}>
                      Go To Listings
                    </button>
                  </Link>
                )}
              </div>

              <div
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShareLinkCopied(true);
                  toast.success("Link Copied");
                }}
              >
                <button className={styles.shareIcon}>
                  Share <i className="fa-solid fa-share-nodes"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listing;
