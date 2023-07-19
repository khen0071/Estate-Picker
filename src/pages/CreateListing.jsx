import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

import Spinner from "../components/Spinner";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

const createVariant = {
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

const CreateListing = () => {
  // const [geolocationEnabled, setGeoLocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    floors: 1,
    // structure: "condominium",
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
    // latitude: 0,
    // longitude: 0,
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
    // latitude,
    // longitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

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

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);

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
    return <Loader />;
  }

  return (
    <>
      <motion.div
        variants={createVariant}
        initial="initial"
        animate="animate"
        className="m-5"
      >
        <form onSubmit={onSubmit}>
          <div className="flex justify-between my-5">
            <h1 className="text-[18px] text-white uppercase font-semibold md:text-[24px]">
              My Profile
            </h1>

            <Link to="/profile">
              <button className="buttonContainer font-semibold text-[10px] md:text-[12px]">
                Go Back
              </button>
            </Link>
          </div>

          <div className="flex flex-col justify-between items-center mx-3 pt-2 md:mx-8 md:flex-row md:space-x-3">
            <div className="space-y-1 flex flex-col w-full my-1 p-3 md:p-6 hover:bg-[#4B3F51] border border-l-4 border-t-4 border-gray hover:border-white ease-in-out duration-500">
              <h1 className="text-gray uppercase text-center border-b-2 pb-2 mb-2">
                Lease / Rent Terms
              </h1>
              <div className="flex space-x-2 items-center pb-3">
                <div className="text-[14px] text-white font-semibold w-[100px]">
                  Sell / Rent:
                </div>
                <div className="space-x-2">
                  <button
                    id="type"
                    value="sale"
                    onClick={onMutate}
                    className={
                      type === "sale" ? "buttonActive" : "buttonInactive"
                    }
                  >
                    Sell
                  </button>
                  <button
                    id="type"
                    value="rent"
                    onClick={onMutate}
                    className={
                      type === "rent" ? "buttonActive" : "buttonInactive"
                    }
                  >
                    Rent
                  </button>
                </div>
              </div>
              <div className="flex space-x-2 items-center">
                <div className="text-[14px] text-white font-semibold  w-[100px]">
                  Create Offer?
                </div>

                <div className="space-x-2">
                  <button
                    className={offer ? "buttonActive" : "buttonInactive"}
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
                        : "buttonInactive"
                    }
                    type="button"
                    id="offer"
                    value={false}
                    onClick={onMutate}
                  >
                    No
                  </button>
                </div>
              </div>
              <p className="text-red text-[10px]">
                If Yes, Indicate discounted price.
              </p>
              <h1 className="text-[12px] text-white font-semibold">
                Regular Price
              </h1>
              <div className="flex items-center pb-3">
                <div>
                  <input
                    className="inputContainer"
                    type="number"
                    id="regularPrice"
                    value={regularPrice}
                    onChange={onMutate}
                    min="50"
                    required
                  />
                </div>
                <div className="text-white pl-2 text-[12px]">
                  {type === "rent" ? (
                    <p>
                      $
                      {regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      / Month
                    </p>
                  ) : (
                    <p>
                      $
                      {regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    </p>
                  )}
                </div>
              </div>

              {offer && (
                <>
                  <h1 className="text-[12px] text-white font-semibold">
                    Discounted Price
                  </h1>
                  <div className="flex items-center">
                    <div>
                      <input
                        className="inputContainer"
                        type="number"
                        id="discountedPrice"
                        value={discountedPrice}
                        onChange={onMutate}
                        min="50"
                        required
                      />
                    </div>
                    <div className="text-white pl-2 text-[12px]">
                      {type === "rent" ? (
                        <p>${discountedPrice}/ Month</p>
                      ) : (
                        <p>${discountedPrice}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-1 flex flex-col w-full my-1 p-3 md:p-6 hover:bg-[#4B3F51] border border-l-4 border-t-4 border-gray hover:border-white ease-in-out duration-500">
              <h1 className="text-gray uppercase text-center border-b-2 pb-2 mb-2">
                Property detail
              </h1>
              <div className="pb-3">
                <h1 className="text-[12px] text-white font-semibold">Name</h1>
                <input
                  className="inputContainerFull"
                  type="text"
                  id="name"
                  value={name}
                  onChange={onMutate}
                  maxLength="32"
                  minLength="10"
                  required
                />
                <h1 className="text-[12px] text-white font-semibold">
                  Address
                </h1>
                <textarea
                  className="inputContainerFull"
                  type="text"
                  id="location"
                  value={location}
                  onChange={onMutate}
                  maxLength="100"
                  minLength="10"
                  required
                />
                <h1 className="text-[12px] text-white font-semibold">
                  Bedrooms
                </h1>
                <input
                  className="inputContainerFull"
                  type="number"
                  id="bedrooms"
                  value={bedrooms}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />
                <h1 className="text-[12px] text-white font-semibold">
                  Bathrooms
                </h1>

                <input
                  className="inputContainerFull"
                  type="number"
                  id="bathrooms"
                  value={bathrooms}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />
                <div className="flex items-center space-x-3">
                  <h1 className="text-[14px] text-white font-semibold pb-1">
                    Furnished:
                  </h1>
                  <div className="flex space-x-2 items-center">
                    <button
                      className={furnished ? "buttonActive" : "buttonInactive"}
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
                          : "buttonInactive"
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
              </div>
            </div>
            <div className="space-y-1 flex flex-col w-full my-1 p-3 md:p-6 hover:bg-[#4B3F51] border border-l-4 border-t-4 border-gray hover:border-white ease-in-out duration-500">
              <h1 className="text-gray uppercase text-center border-b-2 pb-2 mb-2">
                exterior detail
              </h1>
              <div className="pb-3">
                <h1 className="text-[12px] text-white font-semibold">
                  Number of Floors
                </h1>
                <input
                  className="inputContainerFull"
                  type="number"
                  id="floors"
                  value={floors}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />
                <h1 className="text-[12px] text-white font-semibold">
                  Floor Area
                </h1>
                <input
                  className="inputContainerFull"
                  type="number"
                  id="floorArea"
                  value={floorArea}
                  onChange={onMutate}
                  min="150"
                  max="50000"
                  required
                />
                <div className="flex items-center space-x-3">
                  <h1 className="text-[14px] text-white font-semibold">
                    Parking:
                  </h1>
                  <div className="flex space-x-2 items-center">
                    <button
                      className={parking ? "buttonActive" : "buttonInactive"}
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
                          : "buttonInactive"
                      }
                      type="button"
                      id="parking"
                      value={false}
                      onClick={onMutate}
                    >
                      No
                    </button>
                  </div>
                </div>
                <h1 className="text-[14px] text-white font-semibold mt-3">
                  Images
                </h1>
                <input
                  className="inputContainerFull"
                  type="file"
                  id="images"
                  onChange={onMutate}
                  max="6"
                  accept=".jpg,.png,.jpeg"
                  multiple
                  required
                />
                <div className="text-[12px] text-white">
                  Note: Max of 6 images only.
                </div>
                <div className="text-[12px] text-white">
                  First uploaded image will be the cover image.
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="buttonContainer text-[12px] mt-5"
                  >
                    Submit Listing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </motion.div>

      {/* {!geolocationEnabled && (
                  <div className={styles.formGeolocation}>
                    <div className={styles.latitude}>
                      <label className={styles.formLabel}>Latitude</label>
                      <input
                        className={styles.formInput}
                        type="number"
                        id="latitude"
                        value={latitude}
                        onChange={onMutate}
                        required
                      />
                    </div>
                    <div className={styles.longitude}>
                      <label className={styles.formLabel}>Longitude</label>
                      <input
                        className={styles.formInput}
                        type="number"
                        id="longitude"
                        value={longitude}
                        onChange={onMutate}
                        required
                      />
                    </div>
                  </div>
                )} */}
    </>
  );
};

export default CreateListing;
