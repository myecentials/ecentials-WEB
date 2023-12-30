import React from "react";
// import { Spinner } from "reactstrap";
import loading from "../assets/gifs/bouncy-loader-no background.gif";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <img src={loading} alt="" width={70} />
    </div>
  );
};

export default Loader;
