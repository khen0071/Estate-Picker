// import ExploreSlider from "../components/ExploreSlider";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import Information from "../components/Information";
import Presentation from "../components/Presentation";
import Closing from "../components/Closing";

const homeVariant = {
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

const Home = () => {
  return (
    <>
      <motion.div variants={homeVariant} initial="initial" animate="animate">
        {/* <ExploreSlider /> */}
        <Hero />
        <Information />
        <Featured />
        <Presentation />
        <Closing />
      </motion.div>
    </>
  );
};

export default Home;
