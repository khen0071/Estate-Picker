import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";

import styles from "../styles/Contact.module.css";

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
      <div className={styles.signUp_container}>
        <div className={styles.overlay_container}>
          <div className={styles.signUp_content_box}>
            <div className={styles.content_box}>
              <main>
                <div className={styles.contactContainer}>
                  <header className={styles.pageHeader}>
                    Contact Landlord
                  </header>
                  {landlord !== null && (
                    <main className={styles.contactLandlordContainer}>
                      <small>
                        Your message will be sent directly to the landlord.
                      </small>
                      <h3>
                        Landlord: <span>{landlord?.name}</span>
                      </h3>

                      <h3>Message / Inquiry:</h3>

                      <form className={styles.formContainer}>
                        <div className={styles.messageContainer}>
                          <label
                            htmlFor="message"
                            className={styles.messageLabel}
                          ></label>
                          <textArea
                            className={styles.textArea}
                            name="message"
                            id="message"
                            value={message}
                            onChange={onChange}
                            cols={39}
                            rows={8}
                          ></textArea>
                        </div>

                        <a
                          href={`mailto:${
                            landlord.email
                          }?Subject=${searchParams.get(
                            "listingName"
                          )}&body=${message}`}
                        >
                          <button
                            type="button"
                            className={styles.messageButton}
                          >
                            Send Email
                          </button>
                        </a>
                      </form>
                    </main>
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
