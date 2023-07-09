import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { serverTimestamp, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import styles from "../styles/CreateListings.module.css";

const EditListing = () => {
  const [listing, setListing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    floors: 0,
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    location: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
    floorArea: 0,
    images: {},
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    floors,
    floorArea,
    parking,
    furnished,
    location,
    offer,
    regularPrice,
    discountedPrice,
    images,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();
  const isMounted = useRef(true);

  //Redirect if listing wrong users
  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("Unauthorized User");
      navigate("/");
    }
  });

  //Fetch listing to edit
  useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Listing does not exist");
      }
    };
    fetchListing();
  }, [params.listingId, navigate]);

  //Set user to logged in user
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({
            ...formData,
            userRef: user.uid,
          });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price should be lesser than regular price");
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("Max of 6 images only");
      return;
    }

    // Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    //Update Listing
    const docRef = doc(db, "listings", params.listingId);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Listing Saved");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className={styles.createContainer}>
        <div className={styles.createContent}>
          <div className={styles.goBack}>
            <h2>Edit Listing</h2>
            <Link to="/profile">
              <button>Go Back</button>
            </Link>
          </div>

          <main>
            <form onSubmit={onSubmit} className={styles.formContainer}>
              <div className={styles.formThirdSection}>
                <h4>Leasing Terms</h4>
                <label className={styles.formLabel}>Sell / Rent</label>
                <div className={styles.formButtons}>
                  <button
                    id="type"
                    value="sale"
                    onClick={onMutate}
                    className={
                      type === "sale" ? "buttonActive" : "buttonInActive"
                    }
                  >
                    Sell
                  </button>
                  <button
                    id="type"
                    value="rent"
                    onClick={onMutate}
                    className={
                      type === "rent" ? "buttonActive" : "buttonInActive"
                    }
                  >
                    Rent
                  </button>
                </div>
                <label className={styles.formLabel}>Create Offer?</label>
                <small>If Yes. Indicate discounted price.</small>
                <div className={styles.formButtons}>
                  <button
                    className={offer ? "buttonActive" : "buttonInActive"}
                    type="button"
                    id="offer"
                    value={true}
                    onClick={onMutate}
                  >
                    Yes
                  </button>
                  <button
                    className={
                      !offer && offer !== null
                        ? "buttonActive"
                        : "buttonInActive"
                    }
                    type="button"
                    id="offer"
                    value={false}
                    onClick={onMutate}
                  >
                    No
                  </button>
                </div>

                <label className={styles.formLabel}>Regular Price</label>
                <div className={styles.regularPrice}>
                  <div>
                    <input
                      className={styles.formInput}
                      type="number"
                      id="regularPrice"
                      value={regularPrice}
                      onChange={onMutate}
                      min="50"
                      required
                    />
                  </div>
                  <div>{type === "rent" && <p>${regularPrice}/ Month</p>}</div>
                </div>

                {offer && (
                  <>
                    <label className={styles.formLabel}>Discounted Price</label>
                    <div className={styles.discountedPrice}>
                      <div>
                        <input
                          className={styles.formInput}
                          type="number"
                          id="discountedPrice"
                          value={discountedPrice}
                          onChange={onMutate}
                          min="50"
                          required
                        />
                      </div>
                      <div>
                        {type === "rent" && <p>${discountedPrice}/ Month</p>}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.formFirstSection}>
                <h4>Property Detail</h4>
                <label className={styles.formLabel}>Name</label>
                <input
                  className={styles.formInput}
                  type="text"
                  id="name"
                  value={name}
                  onChange={onMutate}
                  maxLength="32"
                  minLength="10"
                  required
                />

                <label className={styles.formLabel}>Address</label>
                <textarea
                  className={styles.formInput}
                  type="text"
                  id="location"
                  value={location}
                  onChange={onMutate}
                  maxLength="100"
                  minLength="10"
                  required
                />

                <label className={styles.formLabel}>Bedrooms</label>
                <input
                  className={styles.formInput}
                  type="number"
                  id="bedrooms"
                  value={bedrooms}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />

                <label className={styles.formLabel}>Bathrooms</label>
                <input
                  className={styles.formInput}
                  type="number"
                  id="bathrooms"
                  value={bathrooms}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />

                <label className={styles.formLabel}>Furnished</label>
                <div className={styles.formButtons}>
                  <button
                    className={furnished ? "buttonActive" : "buttonInActive"}
                    type="button"
                    id="furnished"
                    value={true}
                    onClick={onMutate}
                  >
                    Yes
                  </button>
                  <button
                    className={
                      !furnished && furnished !== null
                        ? "buttonActive"
                        : "buttonInActive"
                    }
                    type="button"
                    id="furnished"
                    value={false}
                    onClick={onMutate}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className={styles.formSecondSection}>
                <h4>Exterior Detail</h4>
                <label className={styles.formLabel}>Number of Floors</label>
                <input
                  className={styles.formInput}
                  type="number"
                  id="floors"
                  value={floors}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />

                <label className={styles.formLabel}>Floor Area</label>
                <input
                  className={styles.formInput}
                  type="number"
                  id="floorArea"
                  value={floorArea}
                  onChange={onMutate}
                  min="150"
                  max="50000"
                  required
                />

                <label className={styles.formLabel}>Parking</label>
                <div className={styles.formButtons}>
                  <button
                    className={parking ? "buttonActive" : "buttonInActive"}
                    type="button"
                    id="parking"
                    value={true}
                    onClick={onMutate}
                  >
                    Yes
                  </button>
                  <button
                    className={
                      !parking && parking !== null
                        ? "buttonActive"
                        : "buttonInActive"
                    }
                    type="button"
                    id="parking"
                    value={false}
                    onClick={onMutate}
                  >
                    No
                  </button>
                </div>

                <label className={styles.formLabel}>Images</label>
                <div className={styles.smallText}></div>
                <input
                  className={styles.formInput}
                  type="file"
                  id="images"
                  onChange={onMutate}
                  max="6"
                  accept=".jpg,.png,.jpeg"
                  multiple
                  required
                />
                <small className={styles.imagesInfo}>
                  Note: Max of 6 images only.
                </small>
                <small className={styles.imagesInfo}>
                  First uploaded image will be the cover image.
                </small>
                <button type="submit" className={styles.submitButton}>
                  Submit Listing
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default EditListing;
