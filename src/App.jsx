import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import ForgotPassword from "./pages/ForgotPassword";
import Contact from "./pages/Contact";

import ScrollToTop from "./components/ScrollToTop";

import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <div>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Explore />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/category/:categoryName" element={<Category />} />

            {/* Private Route */}
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            {/* Private Route End*/}

            <Route path="/profile" element={<Profile />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/edit-listing/:listingId" element={<EditListing />} />
            <Route
              path="/category/:categoryName/:listingId"
              element={<Listing />}
            />
            <Route path="/contact/:landlordId" element={<Contact />} />
          </Routes>
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
