import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import OAuth from "../components/OAuth";
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/SignForm.module.css";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, name } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className={styles.signUp_container}>
        <div className={styles.overlay_container}>
          <div className={styles.signUp_content_box}>
            <div className={styles.content_box}>
              <header>
                <p className={styles.pageHeader}>Create Account</p>
              </header>

              <main>
                <form onSubmit={onSubmit}>
                  <div className={styles.form_input}>
                    <h4>Username</h4>
                    <input
                      type="text"
                      className={styles.nameInput}
                      id="name"
                      value={name}
                      onChange={onChange}
                    />
                  </div>

                  <div className={styles.form_input}>
                    <h4>Email</h4>
                    <input
                      type="email"
                      className={styles.emailInput}
                      id="email"
                      value={email}
                      onChange={onChange}
                    />
                  </div>

                  <div className={styles.form_input}>
                    <h4>Password</h4>
                    <div className={styles.form_input_password}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={styles.passwordInput}
                        id="password"
                        value={password}
                        onChange={onChange}
                      />
                    </div>
                    {/* <i
                    className="fa-solid fa-eye"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  ></i> */}
                    <div
                      className={styles.showPasswordContainer}
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    >
                      <i className="fa-solid fa-eye"></i>
                      <span>Show Password</span>
                    </div>
                  </div>

                  {/* <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link> */}

                  <div className={styles.registerBar}>
                    <button className={styles.registerButton}>
                      <i className="fa-solid fa-arrow-right-to-bracket"></i>
                      Sign Up
                    </button>
                  </div>
                </form>

                <OAuth />

                <div className={styles.signIn_container}>
                  <h4>Already have an account?</h4>
                  <Link to="/sign-in" className={styles.signInLink}>
                    Sign In
                  </Link>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
