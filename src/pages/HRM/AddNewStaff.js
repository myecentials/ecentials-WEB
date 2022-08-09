import React from "react";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import SideBar from "../../components/SideBar";
import BreadOutlined from "../../components/BreadOutlined";
import BreadCrumb from "../../components/BreadCrumb";
import StaffDetailsHeader from "../../components/StaffDetailsHeader";
import { Form, Input, Label, FormGroup, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import cv from "../../assets/files/andrews_opoku_cv.pdf";
import deleteicon from "../../assets/icons/svg/delete.svg";
const AddNewStaff = () => {
  return (
    <>
      <Helmet>
        <title>Add New Staff</title>
      </Helmet>
      <CustomeNav />
      <div className="d-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle edit-relative pb-5">
          <div className="d-flex mx-md-5 mt-5 flex-wrap">
            <BreadOutlined name="HRM" breadcrumb="/hrm/staff" />
            <BreadOutlined name="Staff" breadcrumb="/hrm/staff" />
            <BreadCrumb name="Add Staff" breadcrumb="/hrm/staff/name/edit" />
          </div>
          <div className="mt-4 mx-auto mx-md-5">
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

            {/* WORK */}
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
                <h6 className="mx-4">Work details</h6>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="fname">
                          <b className="text-deep">Department*</b>
                        </Label>
                        <Input
                          id="select"
                          name="fnselectame"
                          type="select"
                          style={{ borderColor: "#C1BBEB" }}
                        >
                          <option value="pos"></option>
                          <option value="pos">POS</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="lname">
                          <b className="text-deep">Supervisor*</b>
                        </Label>
                        <Input
                          id="supname"
                          name="supname"
                          type="select"
                          placeholder="namee"
                          style={{ borderColor: "#C1BBEB" }}
                        >
                          <option value="pos"></option>
                          <option value="pos">Jesse Anim</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Col>
                        <FormGroup>
                          <Label className="small" for="fname">
                            <b className="text-deep">Pay Grade*</b>
                          </Label>
                          <Input
                            id="supname"
                            name="supname"
                            type="select"
                            placeholder="namee"
                            style={{ borderColor: "#C1BBEB" }}
                          >
                            <option value="pos">GH₵</option>
                            <option value="pos">2000-3000</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="number">
                          <b className="text-deep">Mode of Payment*</b>
                        </Label>
                        <Input
                          id="supname"
                          name="supname"
                          type="select"
                          placeholder="namee"
                          style={{ borderColor: "#C1BBEB" }}
                        >
                          <option value="pos"></option>
                          <option value="pos">Bank</option>
                        </Input>
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
                <div className=" mb-3">
                  <button className="btn ms-bg text-white small rounded-pill cvfile">
                    Choose file
                    <Input type="file" className="cvinput" />
                  </button>
                </div>
                <p className="gray-text small">Degree Certificcate</p>
                <div className="">
                  <button className="btn ms-bg text-white small rounded-pill cvfile">
                    Choose file
                    <Input
                      type="file"
                      className="cvinput"
                      title="select a file"
                    />
                  </button>
                </div>
              </div>
            </div>

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
                <h6 className="mx-4">Priviledges</h6>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <h6>Allow Administrative priviledges for this staff?</h6>
                <div className="d-flex">
                  <FormGroup check>
                    <Input name="radio1" type="radio" />{" "}
                    <Label check>Yes</Label>
                  </FormGroup>
                  <FormGroup check className="mx-3">
                    <Input name="radio1" type="radio" /> <Label check>No</Label>
                  </FormGroup>
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

export default AddNewStaff;
