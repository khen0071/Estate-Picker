import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const getLandLord = async () => {
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);

      if (docSnap) {
        setLandlord(docSnap.data());
        setLoading(false);
      } else {
        toast.error("Could not get landlord data");
      }
    };
    getLandLord();
  }, [params.landlordId]);

  if (loading) {
    return <Spinner />;
  }

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div className="h-[85vh] flex justify-center my-20 items-start md:h-[85vh] md:items-center md:my-0">
        <div className="border-2 border-white m-5 p-10 md:m-20">
          <h1 className="text-center text-[22px] text-lightOrange font-bold uppercase">
            Contact Landlord
          </h1>
          <h1 className="text-center text-[10px] text-white pb-1 mb-3 border-b-2 md:text-[12px]">
            Your message will be sent directly to the landlord.
          </h1>
          <h3 className="text-white font-bold text-[14px] md:text-[16px]">
            Landlord: <span className="text-lightOrange">{landlord?.name}</span>
          </h3>

          <form>
            <div className="my-3">
              <label className="text-white text-[14px] font-semibold">
                Message / Inquiry:
              </label>
              <textarea
                className="w-full border-4  border-lightOrange mt-1 p-[8px]"
                name="message"
                id="message"
                value={message}
                onChange={onChange}
                cols={30}
                rows={8}
                required
              />
            </div>
            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="buttonContainer w-full">
                Send Email
              </button>
            </a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
