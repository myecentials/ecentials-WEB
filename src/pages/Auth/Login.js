import React, { Component } from "react";
import logo from "../../logo.svg";
import briefcase from "../../assets/icons/svg/briefcase.svg";
import lock from "../../assets/icons/svg/lock.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../../components/Footer";
import { useState } from "react";
import axios from "../../config/api/axios";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import ProtectedRoutes from "../../config/ProtectedRoutes";
import useAuth from "../../hooks/useAuth";

export const LoggedInContext = React.createContext();
const Login = () => {
  const [errMes, setErrMes] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoadin, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [details, setDetails] = useState({ account_id: "", password: "" });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };
  const handleFocus = () => {
    setIsLoading(true);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname || "login";
  const { setAuth } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/business-owner/login-business-owner", { ...details })
      .then((res) => {
        if (res.data.message == "an error occurred, please try again") {
          setIsLoading(false);
          setError(true);
          setErrMes("Wrong Business ID, please try again");
        } else if (res.data.message == "wrong password, please try again") {
          setIsLoading(false);
          setError(true);
          setErrMes("Wrong password please try again");
        } else {
          const token = res.data.result.token;
          const ownerId = res.data.result.owner_id;
          localStorage.setItem("userToken", token);
          localStorage.setItem("ownerId", ownerId);
          setAuth({ token: localStorage.getItem("userToken") });
          setIsLoading(false);
          navigate("/signup");
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <LoggedInContext.Provider value={true}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="container">
        <div className="contain">
          <div className="card shadow-lg border-0 login">
            <Link to="/" className=" mx-auto mt-4">
              <img src={logo} alt="" width={120} />
            </Link>
            <div className="card-body">
              <h5 className="card-title  mt-4 mb-4">Welcome Back</h5>

              {error ? <div className="error">{errMes}</div> : ""}
              <div className="form-group ">
                <div class="form-floating mb-4">
                  <input
                    type="text"
                    class="form-control login-form-control"
                    id="email"
                    placeholder="Business ID"
                    name="account_id"
                    value={details.account_id}
                    onChange={handleChange}
                  />
                  <label for="email" className="light-text">
                    <img src={briefcase} alt="" className="mb-2" />
                    <span className="mx-4">Business ID</span>
                  </label>
                </div>
                <div class="form-floating input_container">
                  <input
                    type={show ? "text" : "password"}
                    class="form-control login-form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={details.password}
                    onChange={handleChange}
                  />
                  <label for="password" className="light-text">
                    <img src={lock} alt="" className="mb-2" />
                    <span className="mx-4">Password</span>
                  </label>
                  {!details.password ? (
                    ""
                  ) : (
                    <div>
                      {show ? (
                        <span className="eye" onClick={handleClick}>
                          <RiEyeLine />
                        </span>
                      ) : (
                        <span className="eye" onClick={handleClick}>
                          <RiEyeCloseLine />
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="row justify-content-center mt-3 ">
                  <div className="col-6 col-md-8">
                    <div class="form-check ">
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
                        Remember Me
                      </label>
                    </div>
                  </div>

                  <div className="col-6 col-md-4 text-center">
                    <Link to="" className="text-primary light-text">
                      Forgot Password
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn signup-btn w-100 mt-4 bold-font btn-auth"
                  onClick={handleSubmit}
                  onFocus={handleFocus}
                >
                  {isLoadin ? (
                    <span class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>

                <p className="mt-4  text-center small">
                  Don't have an account?{" "}
                  <Link
                    to="/owner-information"
                    className="text-primary text-decoration-none"
                  >
                    sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LoggedInContext.Provider>
  );
};

export default Login;
