import React from "react";
import { Spinner } from "reactstrap";

const Loader = () => {
  return (
    <Spinner color="secondary" className="text-center mx-auto d-block my-5">
      Loading...
    </Spinner>
  );
};

export default Loader;
