import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="d-flex flex-column justify-content-center align-items-center middle">
        <h1>Welcome To Ecentials Homepage</h1>
        <Link to="login">
          <h6>Go to Login</h6>
        </Link>
      </div>
    </>
  );
};

export default Home;
