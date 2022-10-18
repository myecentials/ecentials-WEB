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

const OwnerDetails = () => {
  const styles1 = useSpring({
    from: { x: -100 },
    to: { x: 0 },
    config: { duration: 1000 },
    loop: {
      x: 0,
    },
  });
  const styles2 = useSpring({
    from: { x: 100 },
    to: { x: 0 },
    config: { duration: 1000 },
    loop: {
      x: 0,
    },
  });
  const styles3 = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1500,
    config: { duration: 1000 },
    loop: {
      x: 0,
    },
  });

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };
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

                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="fname">
                          Full name
                        </Label>
                        <Input id="firstName" name="fname" type="text" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="lname">
                          Email
                        </Label>
                        <Input id="lastName" name="lname" type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="fname">
                          Phone number
                        </Label>
                        <Input id="email" name="email" type="email" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="date">
                          Address
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          type="text"
                          plaintext={false}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="password">
                          Password
                        </Label>
                        <Input id="password" name="password" type="password" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="confirmpass">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirmpass"
                          name="confirmpass"
                          type="password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
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
                      I agree to all the <Link to="">Terms</Link> and{" "}
                      <Link to="">Privacy policy</Link>
                    </label>
                  </div>
                  <Row className="row gy-md-0 gy-3 mt-3 justify-content-center text-center  align-items-center">
                    <Col>
                      <button
                        type="button"
                        onClick={toggle}
                        className="text-white btn btn-primary px-5 small py-2  text-nowrap  rounded w-100"
                      >
                        <span className="text-center">Create account</span>
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
                        <div className="container">
                          <div className="contain">
                            <div className="border-0 id-card">
                              <img src={circlecorrect} alt="" />
                              <p className="my-3">Successful !</p>
                              <p className="w-75 text-center">
                                Your login ID has been sent to your email{" "}
                                <Link to="">aopo****@gmail.com</Link> Use it
                                each time you sign in
                              </p>
                              <Link
                                to="/login"
                                className="btn signup-btn w-75 mt-4"
                              >
                                Sign in
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </Col>
                  </Row>
                  <p className="mt-4  text-center small">
                    Already have an account?{" "}
                    <Link to="" className="text-primary text-decoration-none">
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
