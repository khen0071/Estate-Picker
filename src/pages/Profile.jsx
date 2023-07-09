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
      <div className={styles.profile_container}>
        <header className={styles.pageHeader}>
          <h2>My Profile</h2>
          <button
            type="button"
            className={styles.button}
            onClick={logoutHandler}
          >
            Logout
          </button>
        </header>

        <div className={styles.flex_container}>
          <div className={styles.profile_content}>
            <h2>Personal Details</h2>
            <div className={styles.profileDetailsHeader}>
              <h4>Display Name: </h4>
              <span>{name}</span>
            </div>
            <div className={styles.profileDetailsHeader}>
              <h4>Email Registered: </h4>
              <span>{email}</span>
            </div>
          </div>

          <div className={styles.profileCard_container}>
            <h2>Need to update profile?</h2>
            <small>Email address cannot be changed.</small>

            <div className={styles.profile_card_flex_container}>
              <div className={styles.profileCard}>
                <form>
                  <input
                    type="text"
                    id="name"
                    className={
                      !changeDetails ? "profileName" : "profileNameActive"
                    }
                    disabled={!changeDetails}
                    value={name}
                    onChange={onChange}
                  />

                  {/* <input
                  type="text"
                  id="email"
                  className={
                    !changeDetails ? "profileEmail" : "profileEmailActive"
                  }
                  disabled={!changeDetails}
                  value={email}
                  onChange={onChange}
                /> */}
                </form>
              </div>
              <button
                className={styles.button}
                onClick={() => {
                  changeDetails && onSubmit();
                  setChangeDetails((prevState) => !prevState);
                }}
              >
                {changeDetails ? (
                  <>
                    <div className={styles.button_flex}>
                      <i className="fa-solid fa-circle-check"></i> <p>Update</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.button_flex}>
                      <i className="fa-solid fa-pen-to-square"></i> <p>Edit</p>
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.createListingContainer}>
          <div className={styles.listingHeader}>
            <h4>Your Listing</h4>
            <Link to="/create-listing">
              <button className={styles.button}>Add Listing</button>
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
      </div>
    </>
  );
};

export default Profile;
