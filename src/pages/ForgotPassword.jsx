import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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
      <motion.div
        variants={formVariant}
        initial="initial"
        animate="animate"
        className="h-[85vh] mt-[70px] flex justify-center items-start md:mt-[0px] md:h-[85vh]  md:items-center"
      >
        <div className="border-2 border-white m-5 p-10 md:m-20">
          <h1 className="text-center text-[24px] text-lightOrange font-bold uppercase">
            Password Reset
          </h1>
          <p className="text-white text-[12px]  text-center">
            Enter Registered Email Address
          </p>

          <form onSubmit={onSubmit}>
            <div className="my-3">
              <input
                className="w-full border-4  border-lightOrange mt-1 p-[8px]"
                type="email"
                id="email"
                value={email}
                required
                onChange={onChange}
              />
            </div>

            <div className="buttonContainer text-center my-2 text-[14px] font-bold">
              <button className="uppercase">
                Send Link <i className="fa-solid fa-arrow-right form_icon"></i>
              </button>
            </div>
          </form>

          <div className="text-center pt-3">
            <p className="text-white font-semibold text-[14px]">
              Back to{" "}
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

export default ForgotPassword;
