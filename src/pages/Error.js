import React from "react";
import NotFound from "../components/NotFound";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Error = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className="contain">
        <NotFound /> <Link to="/">Go to Home</Link>
      </div>
    </>
  );
};

export default Error;
