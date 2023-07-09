import { Rings } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="spinner_container">
      <Rings
        height="120"
        width="120"
        color="#00c9bb"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />

      <h2 className="spinnerH2">Loading</h2>
      <p className="spinnerp">Please Wait</p>
    </div>
  );
};

export default Spinner;
