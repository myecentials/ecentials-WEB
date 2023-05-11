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
import { toast, Toaster } from "react-hot-toast";
import { defaultTheme } from "react-select";

export const LoggedInContext = React.createContext();
const ResetPassword = () => {
  const [errMes, setErrMes] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoadin, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [details, setDetails] = useState({
    password: "",
    confirmPassword: "",
    email: sessionStorage.getItem("email"),
  });

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
    const remove = toast.loading();
    e.preventDefault();
    axios
      .post("/user/reset-password", { ...details })
      .then((res) => {
        console.log(res);
        toast.dismiss(remove);
        if (res.data.status === 200) {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
          toast.success("Password has been reset");
        }
      })
      .catch((err) => {
        toast.dismiss(remove);
        if (err.message === "Network Error") {
          toast.error("Please check internet connection");
          setIsLoading(false);
        }
      });
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <LoggedInContext.Provider value={true}>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Health Care application" />
        <meta
          name="keywords"
          content="ecentails, ecential, hospital, pharmacy, epharmacy, e-pharmacy, lab, Health Care application"
        />
      </Helmet>
      <div className="container">
        <div className="contain">
          <div className="card shadow-lg border-0 login">
            <Link to="/" className=" mx-auto mt-4">
              <img src={logo} alt="" width={120} />
            </Link>
            <div className="card-body">
              <h5 className="card-title text-secondary mt-4 mb-4">
                Reset Your Password
              </h5>

              {error ? <div className="error">{errMes}</div> : ""}
              <form
                className="form-group"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <div className="form-floating input_container">
                  <input
                    type={show ? "text" : "password"}
                    className="form-control login-form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={details.password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password" className="light-text">
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
                <div className="form-floating input_container mt-4">
                  <input
                    type={show ? "text" : "password"}
                    className="form-control login-form-control"
                    id="password"
                    placeholder="Password"
                    name="confirmPassword"
                    value={details.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password" className="light-text">
                    <img src={lock} alt="" className="mb-2" />
                    <span className="mx-4">Confirm Password</span>
                  </label>
                  {!details.confirmPassword ? (
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

                <button
                  type="submit"
                  className="btn signup-btn w-100 my-4 bold-font btn-auth"
                  onClick={handleSubmit}
                  onFocus={handleFocus}
                  disabled={details.password !== details.confirmPassword}
                >
                  {isLoadin ? (
                    <span className="spinner-border" role="status">
                      <span className="sr-only"></span>
                    </span>
                  ) : (
                    "Confirm"
                  )}
                </button>
                <Toaster />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LoggedInContext.Provider>
  );
};

export default ResetPassword;
