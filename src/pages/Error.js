import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "../logo.svg";
import NavIcons from "../components/NavIcons";

const Error = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className="bg-white" style={{ width: "100%", height: "100vh" }}>
        <div className="container">
          <div className="d-md-flex d-none  justify-content-between align-items-center">
            <div className="mt-5  error_logo__image">
              <Link to="/">
                <img
                  src={logo}
                  alt=""
                  width={120}
                  className="mx-md-auto d-block text-md-center"
                />
              </Link>
              <h5 className="small error_logo__text">Business</h5>
            </div>
            <div className="mt-5 ">
              <NavIcons />
            </div>
          </div>
          <div className="error_container__height">
            <div className="row">
              <div className="col-sm text-sm-start text-center">
                <h1>404</h1>
                <p>Ooooooop!</p>
                <p>
                  <b className="text-nowrap">Page Not Found</b>
                </p>
                <p className="gray-text">
                  This page does not exit or was removed we suggest you go back
                  to home
                </p>
                <Link
                  to="/dashboard"
                  className="btn bg-user text-purple rounded-pill mx-auto error_container__btn"
                >
                  <b>Return to Dashboard</b>
                </Link>
              </div>
              <div className="col-sm d-sm-block d-none">
                <div className="error_image__container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
