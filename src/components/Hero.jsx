import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="container flex flex-col-reverse justify-between xl:px-20 items-center mx-auto my-2 md:flex-row md:my-8 xl:my-0">
        <div className="space-y-6 xl:w-1/2 lg:w-full md:w-1/2 my-6 text-center md:text-start xl:my-1 md:my-3 md:space-y-3 lg:space-y-5">
          <h1 className="text-3xl font-bold text-white mx-2 xl:text-6xl md:text-2xl lg:text-3xl md:mx-0">
            Explore, Sell, Rent Properties{" "}
            <strong className="text-orange">Quick</strong> &{" "}
            <strong className="text-orange">Easy!</strong>
          </h1>

          <p className="text-sm pb-4 font-normal text-lightGray mx-3 md:text-[12px] lg:text-[16px] md:mx-0">
            Showcase your property with our effortless listing process.
          </p>

          <Link to="offers">
            <div className="buttonContainer font-bold w-28 mx-auto text-[12px] md:mx-0 md:text-[12px] md:w-24">
              Explore
            </div>
          </Link>
        </div>

        <div className="xl:flex-[1.5] flex items-end w-full xl:h-[480px]">
          <div className="relative  w-[100%]  xl:w-full  xl:h-full ">
            <img src="/house.png" alt="hero" className="object-contain" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
