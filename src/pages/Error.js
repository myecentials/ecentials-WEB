import React from "react";
import NotFound from "../components/NotFound";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Error = () => {
  return (
    <div className="contain">
      <NotFound /> <Link to="login">Go to Login</Link>
    </div>
  );
};

export default Error;
