import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "./Spinner";
import styles from "../styles/ExploreSlider.module.css";
import { register } from "swiper/element/bundle";
register();

import { motion } from "framer-motion";

const exploreVariant = {
  initial: {
    y: "-100vh",
    opacity: 0,
  },
  animate: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const ExploreSlider = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  const swiperElRef = useRef(null);

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(10));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <motion.div
          variants={exploreVariant}
          initial="initial"
          animate="animate"
        >
          <swiper-container
            ref={swiperElRef}
            slides-per-view="1"
            navigation="true"
            pagination="false"
          >
            {listings.map(({ data, id }) => (
              <swiper-slide
                key={id}
                onClick={() => navigate(`/category/${data.type}/${id}`)}
              >
                <div
                  className="swiperSlideDivExplore"
                  style={{
                    background: `url(${data.imgUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className={styles.exploreSlideContent}>
                    <h4>{data.name}</h4>

                    <div className={styles.explorePriceContainer}>
                      <div className={styles.priceContainer}>
                        {data.offer ? (
                          <p className={styles.regularPrice}>
                            $
                            {data.regularPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </p>
                        ) : (
                          <p className={styles.regularPrice2}>
                            $
                            {data.regularPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </p>
                        )}

                        {data.offer ? (
                          <p className={styles.discountedPrice}>
                            $
                            {data.discountedPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </p>
                        ) : null}
                        {data.type === "rent" && (
                          <p className={styles.perMonth}> / monthly</p>
                        )}
                      </div>

                      <div className={styles.typeContainer}>
                        {" "}
                        {data.type === "rent" ? (
                          <p className={styles.forRent}>Rent</p>
                        ) : (
                          <p className={styles.forSale}>Sale</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        </motion.div>
      </>
    )
  );
};

export default ExploreSlider;
