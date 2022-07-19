import React from "react";
import { Helmet } from "react-helmet";
import circlecorrect from "../../assets/icons/svg/circlecorrect.svg";
import { Link } from "react-router-dom";
const IDCreated = () => {
  return (
    <>
      <Helmet>
        <title>id created</title>
      </Helmet>
      <div className="container">
        <div className="contain">
          <div className="card border-0 shadow-lg id-card">
            <img src={circlecorrect} alt="" />
            <p className="my-3">Successful !</p>
            <p className="w-75 text-center">
              Your login ID has been sent to your email{" "}
              <Link to="">aopo****@gmail.com</Link> Use it each time you sign in
            </p>
            <Link to="/login" className="btn signup-btn w-75 mt-4">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default IDCreated;
