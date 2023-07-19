import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import ListingItem from "../components/ListingItem";
import styles from "../styles/Profile.module.css";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";

const profileVariant = {
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

const Profile = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const logoutHandler = () => {
    auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");

      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

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
    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //Update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }

      toast.success("Profile Updated");
    } catch (error) {
      toast.error("Could not update profile details.");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async (listingId) => {
    if (window.confirm("Confirm Delete")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      navigate("/profile");
      toast.success("Listing Deleted");
    }
  };

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`);
  };

  return (
    <>
      <motion.div
        variants={profileVariant}
        initial="initial"
        animate="animate"
        className="m-5"
      >
        <div className="flex justify-between my-5">
          <h1 className="text-[18px] text-white uppercase font-semibold md:text-[24px]">
            My Profile
          </h1>
          <button
            onClick={logoutHandler}
            className="buttonContainer font-semibold text-[10px] md:text-[12px]"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-col justify-between items-center lg:flex-row ">
          <div className="w-full space-y-1 hover:bg-[#584657] text-center p-3 m-1 border border-l-4 border-t-4 border-gray ease-in-out duration-500 md:p-8">
            <h1 className="text-lightOrange uppercase pb-[8px] md:text-start md:text-[18px]">
              Personal Details
            </h1>
            <div className="md:flex space-x-1">
              <h3 className="text-white text-[14px] md:text-[16px]">
                Display Name:
              </h3>
              <p className="text-lightOrange text-[14px] md:text-[16px]">
                {name}
              </p>
            </div>
            <div className="md:flex space-x-1">
              <h3 className="text-white text-[14px] md:text-[16px]">
                Registered Email:
              </h3>
              <p className="text-lightOrange text-[14px] md:text-[16px]">
                {email}
              </p>
            </div>
          </div>

          <div className="w-full md:text-start space-y-1 hover:bg-[#584657] text-center p-3 m-1 border border-l-4 border-t-4 border-gray ease-in-out duration-500 md:p-[30px]">
            <h1 className="text-lightOrange uppercase md:text-[18px]">
              Need to update profile?
            </h1>
            <p className="text-greenDark text-[10px]  italic">
              Email address cannot be changed.
            </p>

            <div className="flex flex-col space-x-2 items-center md:flex-row">
              <form>
                <input
                  type="text"
                  id="name"
                  className={
                    !changeDetails
                      ? "w-[200px] border-2 border-lightOrange p-[2px] line-through"
                      : "w-[200px] border-2 border-lightOrange p-[2px] "
                  }
                  disabled={!changeDetails}
                  value={name}
                  onChange={onChange}
                />
              </form>

              <button
                onClick={() => {
                  changeDetails && onSubmit();
                  setChangeDetails((prevState) => !prevState);
                }}
              >
                {changeDetails ? (
                  <>
                    <div
                      className="flex justify-center items-center space-x-1 w-[100px] text-[10px] font-semibold m-auto my-2
                    uppercase  bg-lightOrange text-secondaryBlack hover:text-black hover:bg-orange cursor-pointer py-1  border border-l-4 border-white  hover:border-white ease-in-out duration-300 md:text-[14px]
                    "
                    >
                      <i className="fa-solid fa-circle-check text-black text-[14px] md:text-[14px]"></i>{" "}
                      <p>Update</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="flex justify-center items-center space-x-1 w-[80px] text-[10px] font-semibold m-auto my-2
                    uppercase  bg-lightOrange text-secondaryBlack hover:text-black hover:bg-orange cursor-pointer py-1  border border-l-4 border-white  hover:border-white ease-in-out duration-300 md:text-[14px]
                    "
                    >
                      <i className="fa-solid fa-pen-to-square text-black text-[14px] md:text-[14px]"></i>{" "}
                      <p>Edit</p>
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="my-5">
          <div className="flex justify-between my-5">
            <h1 className="text-[18px] text-white uppercase font-semibold md:text-[20px]">
              Your Listing
            </h1>

            <Link to="/create-listing">
              <button className="buttonContainer font-semibold text-[10px] md:text-[12px]">
                Add Listing
              </button>
            </Link>
          </div>

          <div className={styles.listingContainer}>
            {!loading && listings?.length > 0 && (
              <>
                <div className={styles.listingList}>
                  {listings.map((listing) => (
                    <ListingItem
                      key={listings.id}
                      listing={listing.data}
                      id={listing.id}
                      onDelete={() => onDelete(listing.id)}
                      onEdit={() => onEdit(listing.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
