import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

import styles from "../styles/ForgotPassword.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent to email");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };

  return (
    <>
      <div className={styles.forgotPasswordPageContainer}>
        <div className={styles.forgotPasswordPageContent}>
          <div className={styles.forgotPasswordItems}>
            <div className={styles.contentBox}>
              <p className={styles.header}>Password Reset</p>

              <main>
                <form onSubmit={onSubmit} className={styles.formContainer}>
                  <h4>Enter your registered email address</h4>
                  <input
                    className={styles.emailInput}
                    type="email"
                    id={email}
                    value={email}
                    onChange={onChange}
                  />

                  {email === "" ? (
                    <button disabled className={styles.resetButtonDisabled}>
                      Send Reset Link
                    </button>
                  ) : (
                    <button className={styles.resetButton}>
                      Send Reset Link
                    </button>
                  )}
                  {/* <button className={styles.resetButton}>
                    Send Reset Link
                  </button> */}
                </form>
              </main>

              <Link to="/sign-in" className={styles.signIn}>
                Back To Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
