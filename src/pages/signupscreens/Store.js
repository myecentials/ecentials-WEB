import React, { Component } from "react";
import logo from "../../logo.svg";
import googleplay from "../../assets/icons/svg/googledownload.svg";
import iosdownload from "../../assets/icons/svg/iosdownload.svg";
import store from "../../assets/images/svgs/store.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../../components/Footer";
import sliderdots from "../../assets/images/svgs/sliderdots.svg";
import { useState } from "react";
import axios from "../../config/api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { RiEyeCloseLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const StoreSignup = () => {
  const { auth } = useAuth();
  const [agree, setAgree] = useState(false);
  const [error, setErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { setHospitalInfo } = useAuth();
  const [errMsg, setErrMsg] = useState("");
  const [details, setDetails] = useState({
    password: "",
    confirm_password: "",
    name: "",
    email: "",
    gps_address: "",
    location: "",
    phone_number: "",
    open_hours: "",
    licence_no: "",
    document: "",
  });

  const [fileName, setFileName] = useState("");
  const handleAgree = () => {
    setAgree(!agree);
  };

  const handleChange = (e) => {
    setFileName(e.target.value);
    const name = e.target.name;
    const value = e.target.type == "file" ? e.target.files[0] : e.target.value;
    setDetails({ ...details, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
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
    const {
      name,
      email,
      password,
      confirm_password,
      phone_number,
      open_hours,
      location,
      licence_no,
      gps_address,
      document,
    } = details;
    if (
      name == "" ||
      email == "" ||
      password == "" ||
      phone_number == "" ||
      open_hours == "" ||
      location == "" ||
      licence_no == "" ||
      gps_address == "" ||
      document == ""
    ) {
      setErro(true);
      setLoading(false);
      setErrMsg("Please input all fields");
    } else if (details.password !== details.confirm_password) {
      setErro(true);
      setErrMsg("Passwords do not match");
      setLoading(false);
    } else {
      axios
        .post("/pharmacies/create-new-pharmacy", formData, {
          headers: { "auth-token": localStorage.getItem("userToken") },
        })
        .then((res) => {
          setLoading(false);
          if (res.data.message === "success") {
            navigate("/dashboard");
            setHospitalInfo({ ...res.data });
            localStorage.setItem("facility_id", res.data.data._id);
          } else if (
            res.data.message === "an error occurred, please try again"
          ) {
            setErro(true);
            setErrMsg("Account already exist");
          }
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const handleClick = () => {
    setShow(!show);
  };

  let submitClassName = "btn signup-btn mx-auto d-block w-50";

  return (
    <>
      <Helmet>
        <title>Store Sign Up</title>
      </Helmet>
      <div className="container">
        <div className="contain">
          <div className="card shadow-lg border-0 my-5 signup">
            <div className="row bg-white">
              <div className="col-md-4 signup_left_bg">
                <div className="d-flex flex-column">
                  <h5 className="mt-3 mb-5 text-center">
                    Quick access to pharmacy needs{" "}
                  </h5>
                  <div className="circle-color_signup">
                    <img src={store} alt="" className="my-5 mx-auto d-block" />
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
                {error ? <div className="error">{errMsg}</div> : ""}

                <div className="row">
                  <div className="col-sm">
                    <div className="form-group mb-2">
                      <label htmlFor="name" className="small">
                        Pharmacy name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={details.name}
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="email" className="small">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={details.email}
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="location" className="small">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={details.location}
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="password" className="small">
                        GPS Digital Address
                      </label>
                      <input
                        type="text"
                        name="gps_address"
                        value={details.gps_address}
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-2 input_container">
                      <label htmlFor="password" className="small">
                        Password
                      </label>
                      <input
                        type={show ? "text" : "password"}
                        name="password"
                        value={details.password}
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                      {show ? (
                        <span className="icon2" onClick={handleClick}>
                          <RiEyeLine />
                        </span>
                      ) : (
                        <span className="icon2" onClick={handleClick}>
                          <RiEyeCloseLine />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-group mb-2">
                      <label htmlFor="name" className="small">
                        License number
                      </label>
                      <input
                        type="text"
                        name="licence_no"
                        value={details.licence_no}
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="email" className="small">
                        Phone number
                      </label>
                      <input
                        type="text"
                        name="phone_number"
                        value={details.phone_number}
                        className="form-control"
                        onChange={handleChange}
                        required
                        maxLength={10}
                        pattern="[1-9]{1}[0-9]{9}"
                        title="Please provide phone number"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="location" className="small">
                        Open hours
                      </label>
                      <select
                        name="open_hours"
                        value={details.open_hours}
                        id=""
                        className="form-control"
                        onChange={handleChange}
                        required
                      >
                        <option value="select">--select--</option>
                        <option value="24 hours">24hrs</option>
                        <option value="12 hours">12hrs</option>
                        <option value="8 hours">8hrs</option>
                      </select>
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="password" className="small">
                        Business Registration Document*
                      </label>
                      <input
                        type="file"
                        // value={details.document}
                        className="form-control btn btn-primary"
                        name="document"
                        onChange={handleChange}
                        required
                        accept=".pdf,.doc,.docx"
                        title="Upload only .PDF, .DOC or .DOCX file"
                      />
                    </div>
                    <div className="form-group mb-2 input_container">
                      <label htmlFor="password" className="small">
                        Confirm password
                      </label>
                      <input
                        type={show ? "text" : "password"}
                        value={details.confirm_password}
                        className="form-control"
                        name="confirm_password"
                        onChange={handleChange}
                        required
                      />
                      {show ? (
                        <span className="icon2" onClick={handleClick}>
                          <RiEyeLine />
                        </span>
                      ) : (
                        <span className="icon2" onClick={handleClick}>
                          <RiEyeCloseLine />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div class="form-check mb-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberme"
                    onChange={handleAgree}
                  />
                  <label class="form-check-label light-text " for="rememberme">
                    I agree to all the <Link to="">terms</Link> and{" "}
                    <Link to="">privacy policy</Link>
                  </label>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={
                    agree
                      ? submitClassName.concat("")
                      : submitClassName.concat(
                          " disabled bg-primary border-0 text-white"
                        )
                  }
                >
                  {loading ? (
                    <span class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </span>
                  ) : (
                    "Register"
                  )}
                </button>

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

export default StoreSignup;
