import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

import ListingItemComponent from "../components/ListingItemComponent";

import { motion } from "framer-motion";

const categoryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get Reference
        const listingsRef = collection(db, "listings");

        //Create query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
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
  }, [params.categoryName]);

  //Pagination / Load More
  const fetchMoreListings = async () => {
    try {
      //Get Reference
      const listingsRef = collection(db, "listings");

      //Create query
      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
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
      <motion.div
        className="m-3 my-5 md:mx-20 p-0"
        variants={categoryVariant}
        initial="initial"
        animate="animate"
      >
        <header className="text-white text-center font-bold uppercase text-[18px] md:text-[24px]">
          <h4>
            {params.categoryName === "rent"
              ? "Places for rent"
              : "Places for sale"}
          </h4>
        </header>
        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <>
            <main>
              <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-4">
                {listings.map((listing) => (
                  <ListingItemComponent
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                  />
                ))}
              </div>
              {lastFetchedListing && (
                <div className="text-center pt-5">
                  <button
                    className="uppercase text-[12px] md:text-[14px] font-bold bg-lightOrange text-secondaryBlack hover:text-black hover:bg-orange cursor-pointer py-2 px-4 border border-l-4 border-white  hover:border-white ease-in-out duration-300"
                    onClick={fetchMoreListings}
                  >
                    Load More...
                  </button>
                </div>
              )}
            </main>
          </>
        ) : (
          <p className="text-center text-white text-[18px] font-bold">
            No Available Listings for {params.categoryName}
          </p>
        )}
      </motion.div>
    </>
  );
};

export default Category;
