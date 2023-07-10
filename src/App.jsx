import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

import ScrollToTop from "./components/ScrollToTop";

import AnimatedRoutes from "./components/AnimatedRoutes";
import AnimatedPage from "./components/AnimatedPage";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <>
      <div>
        <Router>
          <ScrollToTop />

          <AnimatePresence mode="wait">
            <AnimatedPage>
              <AnimatedRoutes />
            </AnimatedPage>
          </AnimatePresence>

          <Navbar />
        </Router>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};

export default App;
