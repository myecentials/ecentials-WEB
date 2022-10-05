import React from "react";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import SideBar from "../../components/SideBar";
import BreadOutlined from "../../components/BreadOutlined";
import BreadCrumb from "../../components/BreadCrumb";
import StaffDetailsHeader from "../../components/StaffDetailsHeader";
import { Form, Input, Label, FormGroup, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import deleteicon from "../../assets/icons/svg/delete.svg";
import NavIcons from "../../components/NavIcons";
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
const StaffProfile = () => {
  return (
    <>
      <Helmet>
        <title>Edit Profile</title>
      </Helmet>
      <CustomeNav />
      <div className="d-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle edit-relative pb-5">
        <div className="mx-5 d-flex justify-content-md-between align-items-center mt-md-5">
        <h5 className="mt-2 text-deep">Edit Profile</h5>
            <div className="d-lg-block d-none">
              <NavIcons />
            </div>
          </div>
          <div className="mt-4 mx-auto mx-md-5">
            <StaffDetailsHeader />
            {/* PERSONAL */}
            <div
              className="card border-0 pb-3 my-5 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div
                className="ms-bg text-white py-2"
                style={{
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                }}
              >
                <h6 className="mx-4">Personal Details</h6>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="fname">
                          <b className="text-deep">First name*</b>
                        </Label>
                        <Input
                          id="firstName"
                          name="fname"
                          type="text"
                          placeholder="Andrews"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="lname">
                          <b className="text-deep">Last name*</b>
                        </Label>
                        <Input
                          id="lastName"
                          name="lname"
                          type="text"
                          placeholder="Opoku"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="fname">
                          <b className="text-deep">Email*</b>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="aopoku255@gmail.com"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="number">
                          <b className="text-deep">Phone number*</b>
                        </Label>
                        <Input
                          id="number"
                          name="number"
                          type="text"
                          placeholder="+233545098438"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="address">
                          <b className="text-deep">Address*</b>
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          type="textarea"
                          placeholder="PLT 16 BLK III, Tafo-Kumasi"
                          style={{ height: "9rem", borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="about">
                          <b className="text-deep">Photo*</b>
                        </Label>
                        <div
                          className="drug-photo"
                          style={{ cursor: "pointer" }}
                        ></div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="place">
                          <b className="text-deep">Place of birth*</b>
                        </Label>
                        <Input
                          id="place"
                          name="place"
                          type="address"
                          placeholder="Tafo Government Hospital"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="date">
                          <b className="text-deep">Date of birth*</b>
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="place">
                          <b className="text-deep">Ghana Card Number*</b>
                        </Label>
                        <Input
                          style={{ borderColor: "#C1BBEB" }}
                          id="place"
                          name="place"
                          type="text"
                          placeholder="GHA-0123456789"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>

            {/* Education */}
            <div
              className="card border-0 pb-3 my-5 rounded pb-3 mb-5"
              style={{ borderRadius: "10px" }}
            >
              <div
                className="ms-bg text-white py-2"
                style={{
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                }}
              >
                <h6 className="mx-4">Education</h6>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="fname">
                          <b className="text-deep">University*</b>
                        </Label>
                        <Input
                          id="firstName"
                          name="fname"
                          type="text"
                          placeholder="Kwame Nkrumah University of Science and Technology"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="lname">
                          <b className="text-deep">Degree*</b>
                        </Label>
                        <Input
                          id="lastName"
                          name="lname"
                          type="text"
                          placeholder="Bsc. Computer Science"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label className="small" for="fname">
                              <b className="text-deep">Start Date*</b>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="2017"
                              style={{ borderColor: "#C1BBEB" }}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label className="small" for="fname">
                              <b className="text-deep">End Date*</b>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="2021"
                              style={{ borderColor: "#C1BBEB" }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="number">
                          <b className="text-deep">City*</b>
                        </Label>
                        <Input
                          id="number"
                          name="number"
                          type="text"
                          placeholder="Kumasi, Ghana"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>

                {/* Documents */}
                <h6 className="small">Documents</h6>
                <p className="gray-text small">Curriculum vitae</p>
                <div className="d-flex mb-3">
                  <Link to="" className="text-deep my-0">
                    andrews_opoku_cv.pdf
                  </Link>
                  <img src={deleteicon} alt="" className="mx-5" />
                </div>
                <p className="gray-text small">Degree Certificcate</p>
                <div className="d-flex">
                  <Link to="" className="text-deep my-0">
                    andrews_opoku_cert.pdf
                  </Link>
                  <img src={deleteicon} alt="" className="mx-5" />
                </div>
              </div>
            </div>

            
            {/*  */}
            <input
              type="submit"
              className="btn ms-bg text-white rounded-pill px-3 mb-5 save"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffProfile;
