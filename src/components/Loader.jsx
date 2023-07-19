import { Rings } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="spinner_container">
      <Rings
        height="120"
        width="120"
        color="#ffcd37"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />

      <p className="text-white text-[14px]">Please Wait</p>
      <h2 className="text-white text-[18px] font-bold">Uploading Images</h2>
    </div>
  );
};

export default Loader;
