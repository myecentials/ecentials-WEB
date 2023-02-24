import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import mbleft from "../assets/images/svgs/mbleft.svg";
import mbright from "../assets/images/svgs/mbright.svg";
import mbup from "../assets/images/svgs/mbup.svg";
import google from "../assets/icons/svg/googleicon.svg";
import googleplay from "../assets/icons/svg/googledownload.svg";
import iosdownload from "../assets/icons/svg/iosdownload.svg";
import { useSpring, animated } from "react-spring";
import { Form, FormGroup, Row, Label, Col, Input } from "reactstrap";

const Home = () => {
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

  return (
    <>
      <Helmet>
        <title>
          ecentials home: Get the best medical care anywhere anytime!
        </title>
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

                <h5 className="card-title  mt-3">Create account</h5>
                <p className="light-text text-sm ">
                  For{" "}
                  <Link
                    to="/owner-information"
                    className="text-primary bold-font text-decoration-none"
                  >
                    business{" "}
                  </Link>
                  or yourself
                </p>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="fname">
                          First name
                        </Label>
                        <Input id="firstName" name="fname" type="text" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="lname">
                          Last name
                        </Label>
                        <Input id="lastName" name="lname" type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="fname">
                          Email or phone number
                        </Label>
                        <Input id="email" name="email" type="email" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="date">
                          Date of birth(MM/DD/YY)
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          plaintext={false}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="password">
                          Password
                        </Label>
                        <Input id="password" name="password" type="password" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="confirmpass">
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
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberme"
                    />
                    <label
                      className="form-check-label light-text "
                      htmlFor="rememberme"
                    >
                      I agree to all the <Link to="">Terms</Link> and{" "}
                      <Link to="">Privacy policy</Link>
                    </label>
                  </div>
                  <Row className="row gy-md-0 gy-3 mt-3 justify-content-center text-center  align-items-center">
                    <Col>
                      <Link
                        to=""
                        className="text-white btn btn-primary px-5 small py-2  text-nowrap  rounded d-block"
                      >
                        Create account
                      </Link>
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
            <div className="col-lg-6 home-left  d-flex justify-content-center align-items-center flex-column">
              <h6 className="text-white text-center mx-auto flex-start w-75">
                Get the best medical care anywhere anytime!
              </h6>
              <div className="phone-card my-5">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div className="d-flex back-phones">
                    <animated.div style={styles1}>
                      <img src={mbleft} alt="" className="mbleft" />
                    </animated.div>
                    <animated.div style={styles2}>
                      <img src={mbright} alt="" className="mbright" />
                    </animated.div>
                  </div>
                  <animated.div style={styles3} className="mbup">
                    <img src={mbup} alt="" />
                  </animated.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
