import React, { Component } from "react";
import logo from "../../logo.svg";
import googleplay from "../../assets/icons/svg/googledownload.svg";
import iosdownload from "../../assets/icons/svg/iosdownload.svg";
import store from "../../assets/images/svgs/store.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../../components/Footer";

class StoreSignup extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Store Sign Up</title>
        </Helmet>
        <div className="container">
          <div className="contain">
            <div className="card shadow-lg border-0 my-5 signup">
              <div className="row bg-white">
                <div className="col-md-4 bg-light">
                  <div className="d-flex flex-column">
                    <h5 className="mt-3 mb-5 text-center">
                      Get the best medical care anywhere anytime
                    </h5>
                    <img src={store} alt="" className="my-5 mx-auto d-block" />
                  </div>
                </div>
                <div className="col-md-8">
                  <img
                    src={logo}
                    alt=""
                    width={120}
                    className="mx-auto d-block mt-2"
                  />
                  <h5 className="mt-3 mb-2">Create account</h5>
                  <div className="row">
                    <div className="col">
                      <div className="form-group mb-2">
                        <label htmlFor="name" className="small">
                          Store name
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="email" className="small">
                          Email
                        </label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="location" className="small">
                          Location
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="password" className="small">
                          Password
                        </label>
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-2">
                        <label htmlFor="name" className="small">
                          License number
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="email" className="small">
                          Phone number
                        </label>
                        <input type="email" className="form-control" />
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
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div class="form-check mb-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberme"
                    />
                    <label
                      class="form-check-label light-text "
                      for="rememberme"
                    >
                      I agree to all the <Link to="">terms</Link> and{" "}
                      <Link to="">privacy policy</Link>
                    </label>
                  </div>
                  <Link to="/signup/id-created">
                    <input
                      type="submit"
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
  }
}

export default StoreSignup;
