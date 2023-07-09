import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "../components/OAuth";

import { toast } from "react-toastify";

import styles from "../styles/SignForm.module.css";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <>
      <div className={styles.signUp_container}>
        <div className={styles.overlay_container}>
          <div className={styles.signUp_content_box}>
            <div className={styles.content_box}>
              <header>
                <p className={styles.pageHeader}>Login Account</p>
              </header>

              <main>
                <form onSubmit={onSubmit}>
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
                      Sign In
                    </button>
                  </div>
                </form>

                <OAuth />

                <div className={styles.forgotPasswordContainer}>
                  <Link to="/forgot-password">
                    <p className={styles.forgotPassword}>Forgot Password?</p>
                  </Link>
                </div>

                <div className={styles.signIn_container}>
                  <h4>Don't have an account?</h4>
                  <Link to="/sign-up" className={styles.signInLink}>
                    Sign Up
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

export default SignIn;
