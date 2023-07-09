import { useState, useEffect } from "react";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import styles from "../styles/Category.module.css";

const Offers = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get Reference
        const listingsRef = collection(db, "listings");

        //Create query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(6)
        );

        //Execute Query
        const querySnap = await getDocs(q);

        //Pagination query
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, []);

  //Pagination / Load More
  const fetchMoreListings = async () => {
    try {
      //Get Reference
      const listingsRef = collection(db, "listings");

      //Create query
      const q = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(3)
      );

      //Execute Query
      const querySnap = await getDocs(q);

      //Pagination query
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listings");
    }
  };

  return (
    <>
      <div className={styles.categoryContainer}>
        <header className={styles.categoryHeader}>
          <h4>Property Offers</h4>
        </header>
        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <>
            <main>
              <ul className={styles.categoryListContainer}>
                {listings.map((listing) => (
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                  />
                ))}
              </ul>

              <br />

              {lastFetchedListing && (
                <div className="paginationButtonContainer">
                  <button
                    className="paginationButton"
                    onClick={fetchMoreListings}
                  >
                    Load More...
                  </button>
                </div>
              )}
            </main>
          </>
        ) : (
          <p>There are no current offers.</p>
        )}
      </div>
    </>
  );
};

export default Offers;
