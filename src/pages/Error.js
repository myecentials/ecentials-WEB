import React from "react";
import NotFound from "../components/NotFound";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="container">
      <NotFound /> <Link to="login">Go to Login</Link>
    </div>
  );
};

export default Error;
