import { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Featured = () => {
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

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, []);

  return (
    <>
      <div className="mx-3 mt-12 md:m-12">
        <h1 className="text-center text-2xl text-white font-bold md:text-[30px]">
          Featured Properties
        </h1>
        <p className="text-center text-orange italic font-semibold text-[14px] md:text-[16px]">
          Explore Our Wide Variety
        </p>

        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-4">
            <>
              {listings?.map((listing) => (
                <CardComponent
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </>
          </div>
        ) : (
          <p className="text-center text-white font-bold">
            There are no current offers.
          </p>
        )}
      </div>
    </>
  );
};

export default Featured;
