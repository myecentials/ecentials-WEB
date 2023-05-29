import React, { Component, useEffect, useState } from "react";
import logo from "../../logo.svg";
import googleplay from "../../assets/icons/svg/googledownload.svg";
import iosdownload from "../../assets/icons/svg/iosdownload.svg";
import hospital from "../../assets/images/svgs/hospital.svg";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../../components/Footer";
import sliderdots from "../../assets/images/svgs/sliderdots.svg";
import useAuth from "../../hooks/useAuth";
import { Input } from "reactstrap";
import axios from "../../config/api/axios";
import { Toaster, toast } from "react-hot-toast";

const HospitalSignup = () => {
  const { auth } = useAuth();
  const [agree, setAgree] = useState(false);
  const [error, setErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { setHospitalInfo } = useAuth();
  const [errMsg, setErrMsg] = useState("");
  const [details, setDetails] = useState({
    name: "",
    email: "",
    gps_address: "",
    location: "",
    phone_number: "",
    open_hours: "",
    licence_no: "",
    document: null,
  });

  const emailReg = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  const passReg =
    /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const phoneReg = /^0\d{9}$/;

  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);

  const handleAgree = () => {
    setAgree(!agree);
  };

  useEffect(() => {
    const result = emailReg.test(details.email);
    setValidEmail(result);
  }, [details.email]);

  useEffect(() => {
    const result = passReg.test(details.password);
    setValidPass(result);
  }, [details.password]);

  useEffect(() => {
    const result = phoneReg.test(details.phone_number);
    setPhoneValid(result);
  }, [details.phone_number]);

  const handleChange = (e) => {
    // setFileName(e.target.value);
    const name = e.target.name;
    const value = e.target.type == "file" ? e.target.files[0] : e.target.value;
    setDetails({ ...details, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const remove = toast.loading("Loading...");

    const formData = new FormData();
    formData.append("name", details.name);
    formData.append("email", details.email);
    formData.append("password", details.password);
    formData.append("location", details.location);
    formData.append("gps_address", details.gps_address);
    formData.append("phone_number", details.phone_number);
    formData.append("open_hours", details.open_hours);
    formData.append("licence_no", details.licence_no);
    formData.append("document", details.document);

    axios
      .post("/hospitals/add-new-hospital", formData, {
        headers: { "auth-token": sessionStorage.getItem("userToken") },
      })
      .then((res) => {
        toast.dismiss(remove);
        if (res.data.message === "success") {
          navigate("/hospital/dashboard");
          setHospitalInfo({ ...res.data });
          sessionStorage.setItem("facility_id", res.data.data._id);
        } else if (res.data.message === "an error occurred, please try again") {
          setErro(true);
          setErrMsg("Account already exist");
        }
        console.log(res);
      })
      .catch((err) => {
        toast.dismiss(remove);
        console.log(err);
      });
  };

  let submitClassName = "btn signup-btn mx-auto d-block w-50";

  return (
    <>
      <Helmet>
        <title>Hospital Sign Up</title>
      </Helmet>
      <div className="container">
        <Toaster />
        <div className="contain">
          <div className="card shadow-lg border-0 my-5 signup card-radius">
            <div className="row bg-white">
              <div className="col-md-4 signup_left_bg">
                <div className="d-flex flex-column">
                  <h5 className="mt-3 mb-5 text-center">
                    Get the best medical care anywhere anytime
                  </h5>
                  <div className="circle-color_signup">
                    <img
                      src={hospital}
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
                        Hopital name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        required
                        value={details.name}
                        name="name"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="email" className="small">
                        Email
                      </label>
                      <Input
                        type="email"
                        className="form-control"
                        onChange={handleChange}
                        required
                        value={details.email}
                        name="email"
                        invalid={details.email && !validEmail}
                      />
                      <p className="text-danger small" id="note">
                        {details.email && !validEmail
                          ? "Please enter a valid email"
                          : ""}
                      </p>
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="location" className="small">
                        Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        required
                        value={details.location}
                        name="location"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="location" className="small">
                        GPS Digital Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        required
                        value={details.gps_address}
                        name="gps_address"
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-group mb-2">
                      <label htmlFor="name" className="small">
                        License number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        required
                        value={details.licence_no}
                        name="licence_no"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="text" className="small">
                        Phone number
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        required
                        value={details.phone_number}
                        name="phone_number"
                        invalid={details.phone_number && !phoneValid}
                        valid={details.phone_number && phoneValid}
                        maxLength={10}
                      />
                      <p></p>
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="location" className="small">
                        Open hours
                      </label>
                      <select
                        name="open_hours"
                        id="select"
                        className="form-control"
                        onChange={handleChange}
                        required
                        value={details.open_hours}
                      >
                        <option selected id="select">
                          --select working hours--
                        </option>
                        <option id="select" value="24 hours">
                          24hrs{" "}
                        </option>
                        <option id="select" value="12 hours">
                          12hrs
                        </option>
                        <option id="select" value="8 hours">
                          8hrs
                        </option>
                      </select>
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="text" className="small">
                        Business Registration Document
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleChange}
                        required
                        // value={details.document}
                        name="document"
                        accept=".pdf"
                        maxLength={10}
                      />
                      <p></p>
                    </div>
                  </div>
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberme"
                    onChange={handleAgree}
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
                    type="submit"
                    value="Register"
                    onClick={handleSubmit}
                    className={
                      agree && validEmail && phoneValid
                        ? submitClassName.concat("")
                        : submitClassName.concat(
                            " disabled bg-primary border-0 text-white"
                          )
                    }
                  />
                </Link>
                {/* <p className="mt-4  text-center small">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary text-decoration-none"
                  >
                    login
                  </Link>
                </p> */}
                <div className="pb-3 mx-auto text-center mt-5">
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

export default HospitalSignup;
