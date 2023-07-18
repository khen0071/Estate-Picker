import Lottie from "lottie-react";
import animationData from "../assets/realestate.json";

const Presentation = () => {
  return (
    <div className="flex flex-col justify-between items-center mx-10 md:flex-row md:mx-20">
      <div className="w-[300px] m-auto md:w-[400px]">
        <Lottie animationData={animationData} />
      </div>

      <div className="pt-3 md:px-10 md:w-1/2 text-center md:text-start space-y-2 md:space-y-8">
        <h1 className="text-[20px] leading-[30px] font-bold text-white md:leading-[30px] md:text-[20px] lg:leading-[50px] lg:text-[30px] xl:text-[45px]">
          Discover{" "}
          <strong className="text-orange font-bold text-[25px] md:text-[30px] lg:text-[40px] xl:text-[55px]">
            Real Estate
          </strong>{" "}
          Essentials at Your Fingertips
        </h1>
        {/* <p>Search for the right home</p> */}
        {/* <p className="text-white italic font-semibold">
          - Your One-Stop Shop for Finding Your Dream Home
        </p> */}
        <p className="text-lightGray text-[14px] italic md:text-[16px]">
          - At{" "}
          <strong className="font-bold text-[16px] text-white md:text-[20px]">
            Estate Finder
          </strong>
          , we understand the importance of having access to high-quality real
          estate essentials from the comfort of your own home. Whether you're a
          real estate professional, a homeowner, or an aspiring investor, our
          online showroom offers a wide range of properties to meet your needs.
          With our commitment to quality and convenience, we strive to be your
          one-stop destination for all things real estate.
        </p>
      </div>
    </div>
  );
};

export default Presentation;
