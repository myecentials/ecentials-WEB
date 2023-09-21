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
import { HiOutlineMail } from "react-icons/hi";
import { Modal } from "reactstrap";

export const LoggedInContext = React.createContext();
const ForgotPaasword = () => {
  const [errMes, setErrMes] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoadin, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [details, setDetails] = useState({ email: "", code: "" });

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
    const remove = toast.loading("Loading...");
    if (details.email === "") {
      toast.dismiss(remove);
      toast.error("Email is required");
    } else {
      sessionStorage.setItem("email", details.email);
      axios
        .post("/user/forgot-password", { email: details.email })
        .then((res) => {
          toast.dismiss(remove);
          if (res.data.status === 400) {
            toast.error("Please provide a valid email");
          } else {
            //  ;
            axios
              .post("/user/recover_password", { email: details.email })
              .then((res) =>  res)
              .catch((err) => console.log(err));
            setShow(true);
          }
        })
        .catch((err) => {
          toast.dismiss(remove);
          if (err.message === "Network Error") {
            toast.error("Please check internet connection");
            setIsLoading(false);
          }
        });
    }
  };

  const handleCode = (e) => {
    e.preventDefault();

    axios
      .post(
        "/user/verify_code",
        { code: details.code, email: details.email },
        { headers: {} }
      )
      .then((res) => {
        if (res.data.message === "success") {
          setTimeout(() => {
            navigate("/reset-password");
          }, 3000);
          toast.success("Verified");
        }
      })
      .catch((err) => console.log(err));
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
              <h5 className="card-title text-center text-secondary  mt-4 mb-4">
                Reset your password
              </h5>

              {error ? <div className="error">{errMes}</div> : ""}
              <form
                className="form-group"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <div className="form-floating mb-">
                  <input
                    type="text"
                    className="form-control login-form-control"
                    id="email"
                    placeholder="example@gmail.com"
                    name="email"
                    value={details.email}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="email" className="light-text">
                    <HiOutlineMail size={20} />
                    <span className="mx-4">example@gmail.com</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn signup-btn w-100 my-4 bold-font btn-auth"
                  onClick={handleSubmit}
                  onFocus={handleFocus}
                >
                  Verify
                </button>
                <Toaster />
              </form>
              <Modal isOpen={show} centered={true}>
                <div className="contain">
                  <div className="border-0 id-card">
                    {/* <img src={circlecorrect} alt="" />   */}
                    <p className="my-3">Successful !</p>
                    <p className="w-75 text-center">
                      Enter verification code sent to{" "}
                      <Link to="">
                        {details.email.substring(0, 6)}***@gmail.com
                      </Link>
                    </p>
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control login-form-control"
                        id="code"
                        placeholder="Enter verification code"
                        name="code"
                        value={details.code}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                      <label htmlFor="email" className="light-text">
                        {/* <HiOutlineMail size={20} /> */}
                        <span className="mx-4">Enter Code</span>
                      </label>
                    </div>
                    <button
                      onClick={handleCode}
                      className="btn signup-btn w-100 mt-4 btn-auth d-flex align-items-center justify-content-center"
                    >
                      Verify Code
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LoggedInContext.Provider>
  );
};

export default ForgotPaasword;
