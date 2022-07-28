import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import logo from "../logo.svg";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="contain">
        <h1 className="text-center">
          Welcome To{" "}
          <span>
            <img src={logo} alt="" className="mb-4" width={150} />
          </span>{" "}
          Homepage
        </h1>
        <Link to="login">
          <h6>Go to Login</h6>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Home;
