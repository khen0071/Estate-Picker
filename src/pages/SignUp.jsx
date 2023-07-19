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
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const formVariant = {
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

      navigate("/profile");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <motion.div
        variants={formVariant}
        initial="initial"
        animate="animate"
        className="h-[85vh] flex justify-center items-start md:h-full  md:items-center"
      >
        <div className="border-2 border-white m-5 p-10 md:m-20">
          <h1 className="text-center text-[24px] text-lightOrange font-bold uppercase">
            Welcome
          </h1>
          <h1 className="text-center text-[18px] text-white font-bold pb-1 mb-3 uppercase border-b-2">
            Sign Up
          </h1>

          <form onSubmit={onSubmit}>
            <div className="my-3">
              <label className="text-white text-[14px] font-semibold">
                Username
              </label>
              <input
                className="w-full border-4  border-lightOrange mt-1 p-[8px]"
                type="text"
                id="name"
                value={name}
                required
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <label className="text-white text-[14px] font-semibold">
                Email
              </label>
              <input
                className="w-full border-4  border-lightOrange mt-1 p-[8px]"
                type="email"
                id="email"
                value={email}
                required
                onChange={onChange}
              />
            </div>
            <div className="my-3">
              <label className="text-white text-[14px] font-semibold">
                Password
              </label>
              <input
                className="w-full border-4  border-lightOrange mt-1 p-[8px]"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                required
                onChange={onChange}
              />
            </div>
            <div className="text-center">
              <span
                className="text-[14px] text-white font-semibold cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                <i className="fa-solid fa-eye form_icon_eye"></i>
                Show Password
              </span>
            </div>
            <OAuth />

            <button
              className="buttonContainer text-center my-2 text-[14px] font-bold uppercase w-full"
              onClick={() => console.log("clicked")}
            >
              Sign Up <i className="fa-solid fa-arrow-right form_icon"></i>
            </button>
          </form>

          <div className="text-center pt-3">
            <p className="text-white font-semibold text-[13px]">
              Already have an account?{" "}
              <Link to="/sign-in">
                <strong className="text-lightOrange cursor-pointer uppercase">
                  Sign In
                </strong>
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SignUp;
