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
const EditProfile = () => {
  return (
    <>
      <Helmet>
        <title>Edit Profile</title>
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
            <BreadOutlined name="Andrews" breadcrumb="/hrm/staff/name" />
            <BreadCrumb name="Edit profile" breadcrumb="/hrm/staff/name/edit" />
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
                          First name*
                        </Label>
                        <Input id="firstName" name="fname" type="text" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="lname">
                          Last name*
                        </Label>
                        <Input id="lastName" name="lname" type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="fname">
                          Email*
                        </Label>
                        <Input id="email" name="email" type="email" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="number">
                          Phone number*
                        </Label>
                        <Input id="number" name="number" type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="place">
                          Place of birth*
                        </Label>
                        <Input id="place" name="place" type="address" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="date">
                          Date of birth*
                        </Label>
                        <Input id="date" name="date" type="date" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="address">
                          Address*
                        </Label>
                        <Input id="address" name="address" type="address" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="about">
                          About
                        </Label>
                        <Input
                          id="about"
                          name="about"
                          type="textarea"
                          maxLength={200}
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
                          Department*
                        </Label>
                        <Input id="select" name="fnselectame" type="select">
                          <option value="pos"></option>
                          <option value="pos">POS</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="lname">
                          Supervisor*
                        </Label>
                        <Input
                          id="supname"
                          name="supname"
                          type="select"
                          placeholder="namee"
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
                            Pay Grade*
                          </Label>
                          <Input
                            id="supname"
                            name="supname"
                            type="select"
                            placeholder="namee"
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
                          Mode of Payment*
                        </Label>
                        <Input
                          id="supname"
                          name="supname"
                          type="select"
                          placeholder="namee"
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
                          University*
                        </Label>
                        <Input id="firstName" name="fname" type="text" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="lname">
                          Degree*
                        </Label>
                        <Input id="lastName" name="lname" type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label className="small" for="fname">
                              Start Date*
                            </Label>
                            <Input id="email" name="email" type="email" />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label className="small" for="fname">
                              End Date*
                            </Label>
                            <Input id="email" name="email" type="email" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="number">
                          City*
                        </Label>
                        <Input id="number" name="number" type="text" />
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

export default EditProfile;
