import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import mbleft from "../../assets/images/png/mbscreen1.png";
import mbright from "../../assets/images/png/mbscreen2.png";
import ebusiness from "../../assets/images/png/ebusiness.svg";
import mbup from "../../assets/images/png/mbscreen3.png";
import google from "../../assets/icons/svg/googleicon.svg";
import googleplay from "../../assets/icons/svg/googledownload.svg";
import iosdownload from "../../assets/icons/svg/iosdownload.svg";
import circlecorrect from "../../assets/icons/svg/circlecorrect.svg";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useSpring, animated } from "react-spring";
import {
  Form,
  FormGroup,
  Row,
  Label,
  Col,
  Input,
  ModalBody,
  Modal,
} from "reactstrap";
import { phone_number } from "faker/lib/locales/az";
import axios from "axios";
import { BASE_URL } from "../../private/keys";

const OwnerDetails = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMes, setErrMes] = useState("");
  const [details, setDetails] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    confirm_password: "",
  });

  const handleShow = () => {
    setShow(!show);
  };
  const handleCheck = () => {
    setChecked(!checked);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, confirm_password } = details;
    if (password !== confirm_password) {
      setErrMes("Password do not match");
    } else {
      axios
        .post(`${BASE_URL}/business-owner/create-business-owner`, {
          ...details,
        })
        .then((res) => {
          console.log(res);
          while (res.status !== 200) {
            console.log("Loading");
          }
          if (res.status === 200) {
            console.log("loading stopped");
            setOpen(true);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (err.request.status === 400) {
            console.log(err);
            setError(true);
            setErrMes(err.response.data.message.replace(/\"/g, ""));
          }
        });
    }
  };

  let checkClass =
    "text-white btn btn-primary px-5 small py-2  text-nowrap  rounded w-100";

  return (
    <>
      <Helmet>
        <title>Signup Information</title>
      </Helmet>

      <div className="home-center">
        <div className="card home-login bg-white border-0">
          <div className="d-lg-flex flex-row-reverse">
            <div className="col-lg-6 home-right bg-white">
              <div className="mx-4">
                <img
                  src={logo}
                  alt=""
                  width={120}
                  className="mt-4 text-center mx-auto d-block mx-md-0"
                />

                <small
                  className="card-title  mt-3 small"
                  style={{ fontSize: "12px", marginBottom: "6rem" }}
                >
                  Personal details
                </small>
                {error ? <div className="error">{errMes}</div> : ""}
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="full_name">
                          Full name
                        </Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          type="text"
                          value={details.full_name}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="email">
                          Email
                        </Label>
                        <Input
                          id="lastName"
                          name="email"
                          value={details.email}
                          onChange={handleChange}
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="phone_number">
                          Phone number
                        </Label>
                        <Input
                          id="email"
                          name="phone_number"
                          value={details.phone_number}
                          onChange={handleChange}
                          type="tel"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="date">
                          Address
                        </Label>
                        <Input
                          id="date"
                          name="address"
                          value={details.address}
                          onChange={handleChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup className="input_container">
                        <Label className="small" for="password">
                          Password
                        </Label>
                        <Input
                          id="password"
                          name="password"
                          value={details.password}
                          onChange={handleChange}
                          type={show ? "text" : "password"}
                        />
                        {show ? (
                          <RiEyeLine className="eyeicon" onClick={handleShow} />
                        ) : (
                          <RiEyeCloseLine
                            className="eyeicon"
                            onClick={handleShow}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="input_container">
                        <Label className="small" for="confirmpass">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirmpass"
                          name="confirm_password"
                          type={show ? "text" : "password"}
                          value={details.confirm_password}
                          onChange={handleChange}
                        />
                        {show ? (
                          <RiEyeLine className="eyeicon" onClick={handleShow} />
                        ) : (
                          <RiEyeCloseLine
                            className="eyeicon"
                            onClick={handleShow}
                          />
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <div class="form-check ">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberme"
                      onChange={handleCheck}
                    />
                    <label
                      class="form-check-label light-text "
                      for="rememberme"
                    >
                      I agree to all the <Link to="">Terms</Link> and{" "}
                      <Link to="">Privacy policy</Link>
                    </label>
                  </div>
                  <Row className="row gy-md-0 gy-3 mt-3 justify-content-center text-center  align-items-center">
                    <Col>
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className={
                          checked
                            ? checkClass.concat(" ")
                            : checkClass.concat(" disabled")
                        }
                      >
                        {isLoading ? (
                          <span class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                          </span>
                        ) : (
                          <span className="text-center">Create account</span>
                        )}
                      </button>
                    </Col>
                    <Col>
                      <Link
                        to=""
                        className=" text-white btn btn-dark px-5  small py-2 text-nowrap  rounded d-block"
                      >
                        <span>
                          <img src={google} alt="" />
                        </span>{" "}
                        Create account
                      </Link>
                      <Modal isOpen={open} centered={true}>
                        <div className="contain">
                          <div className="border-0 id-card">
                            <img src={circlecorrect} alt="" />
                            <p className="my-3">Successful !</p>
                            <p className="w-75 text-center">
                              Your login ID has been sent to your email{" "}
                              <Link to="">
                                {details.email.substring(0, 6)}***@gmail.com
                              </Link>{" "}
                              Use it each time you sign in
                            </p>
                            <Link
                              to="/login"
                              className="btn signup-btn w-75 mt-4"
                            >
                              Sign in
                            </Link>
                          </div>
                        </div>
                      </Modal>
                    </Col>
                  </Row>
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
                </Form>
              </div>
            </div>
            <div className="col-lg-6 owner_details_bg d-flex justify-content-center align-items-center flex-column">
              <div className=" my-5 circle-color">
                <img src={ebusiness} alt="" width={150} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerDetails;
