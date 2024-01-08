import React, {  useEffect } from "react";
import logo from "../../logo.svg";
import googleplay from "../../assets/icons/svg/googledownload.svg";
import iosdownload from "../../assets/icons/svg/iosdownload.svg";
import ambulance from "../../assets/images/svgs/ambulance.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../../components/Footer";
import sliderdots from "../../assets/images/svgs/sliderdots.svg";

const AmbulanceSignup = () => {
  useEffect(() => {
    window.alert("Comming soon");
  }, []);

  return (
    <>
      <Helmet>
        <title>Ambulance Sign Up</title>
      </Helmet>
      <div className="container">
        <div className="contain">
          <div className="card shadow-lg border-0 my-5 signup">
            <div className="row bg-white">
              <div className="col-md-4 signup_left_bg">
                <div className="d-flex flex-column">
                  <h5 className="mt-3 mb-5 text-center">Help is on the way </h5>
                  <div className="circle-color_signup">
                    <img
                      src={ambulance}
                      alt=""
                      className="my-5 mx-auto d-block"
                    />
                  </div>
                  <img
                    src={sliderdots}
                    alt=""
                    width={30}
                    className="mx-auto d-none d-md-block move-slider-down"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <Link to="/" className="mx-auto d-block text-center mt-2">
                  <img src={logo} alt="" width={120} />
                </Link>
                <h5 className="mt-3 mb-2">Create account</h5>
                <div className="row">
                  <div className="col-sm">
                    <div className="form-group mb-2">
                      <label htmlFor="name" className="small">
                        Ambulance name
                      </label>
                      <input disabled type="text" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="email" className="small">
                        Email
                      </label>
                      <input disabled type="email" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="location" className="small">
                        Location
                      </label>
                      <input disabled type="text" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="password" className="small">
                        Password
                      </label>
                      <input
                        disabled
                        type="password"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-group mb-2">
                      <label htmlFor="name" className="small">
                        License number
                      </label>
                      <input disabled type="text" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="email" className="small">
                        Phone number
                      </label>
                      <input disabled type="email" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="location" className="small">
                        Open hours
                      </label>
                      <select name="opening" id="" className="form-control">
                        <option value="fullday">--select--</option>
                        <option value="fullday">24hrs</option>
                        <option value="halday">12hrs</option>
                      </select>
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="password" className="small">
                        Confirm password
                      </label>
                      <input
                        disabled
                        type="password"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberme"
                    disabled
                  />
                  <label
                    className="form-check-label light-text "
                    htmlFor="rememberme"
                  >
                    I agree to all the <Link to="">terms</Link> and{" "}
                    <Link to="">privacy policy</Link>
                  </label>
                </div>
                <Link>
                  <input
                    disabled
                    type="button"
                    value="Register"
                    className="btn signup-btn mx-auto d-block w-50"
                  />
                </Link>
                <p className="mt-4  text-center small">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary text-decoration-none"
                  >
                    login
                  </Link>
                </p>
                <div className="pb-3 mx-auto text-center">
                  <Link to="" className="col">
                    <img src={googleplay} alt="" />
                  </Link>
                  <Link to="" className="col mx-2">
                    <img src={iosdownload} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AmbulanceSignup;
