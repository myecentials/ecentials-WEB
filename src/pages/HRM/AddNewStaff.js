import React from "react";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import SideBar from "../../components/SideBar";
import BreadOutlined from "../../components/BreadOutlined";
import BreadCrumb from "../../components/BreadCrumb";
import { Form, Input, Label, FormGroup, Col, Row } from "reactstrap";
const AddNewStaff = () => {
  let objToday = new Date(),
    weekday = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = (function () {
      let a = objToday;
      if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
      a = parseInt((a + "").charAt(1));
      return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th";
    })(),
    dayOfMonth =
      today + (objToday.getDate() < 10)
        ? "0" + objToday.getDate() + domEnder
        : objToday.getDate() + domEnder,
    months = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    curHour =
      objToday.getHours() > 12
        ? objToday.getHours() - 12
        : objToday.getHours() < 10
        ? "0" + objToday.getHours()
        : objToday.getHours(),
    curMinute =
      objToday.getMinutes() < 10
        ? "0" + objToday.getMinutes()
        : objToday.getMinutes(),
    curSeconds =
      objToday.getSeconds() < 10
        ? "0" + objToday.getSeconds()
        : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
  let today =
    curHour +
    ":" +
    curMinute +
    "." +
    curSeconds +
    curMeridiem +
    " " +
    dayOfWeek +
    " " +
    dayOfMonth +
    " of " +
    curMonth +
    ", " +
    curYear;
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
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">Settings</h6>
              <p className="small gray-text">
                <span className="text-primary">{dayOfWeek}, </span>
                {dayOfMonth} {curMonth}, {curYear}
              </p>
              <div className="d-flex flex-wrap">
                <BreadOutlined name="HRM" breadcrumb="/hrm/staff" />
                <BreadOutlined name="Staff" breadcrumb="/hrm/staff" />
                <BreadCrumb
                  name="Add Staff"
                  breadcrumb="/hrm/staff/name/edit"
                  hasStyles={true}
                />
              </div>
            </div>
            <div className="mx-4 d-none d-md-block">
              <h5 className="text-deep">Company Name</h5>
              <h5 className="small light-deep">Orange Drugs Limited</h5>
            </div>
          </div>

          <div className="mt-4 mx-auto mx-md-5">
            {/* PERSONAL */}
            <div
              className="card border-0 pb-3 my-5 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div className="ms-bg text-white py-2">
                <h6 className="mx-4">PERSONAL DETAILS</h6>
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
              <div className="ms-bg text-white py-2">
                <h6 className="mx-4">WORK DETAILS</h6>
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
              <div className="ms-bg text-white py-2">
                <h6 className="mx-4">EDUCATION</h6>
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
              <div className="ms-bg text-white py-2">
                <h6 className="mx-4">PRIVILEDGES</h6>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <h6>Select priviledges for this staff?</h6>
                <div className="privileges-grid">
                  <div className="form-check mx-3">
                    <input
                      className="form-check-input admin"
                      type="checkbox"
                      value=""
                      id="rememberme"
                    />
                    <label
                      className="form-check-label text-deep small "
                      htmlFor="rememberme"
                    >
                      HRM
                    </label>
                  </div>
                  <div className="form-check mx-3">
                    <input
                      className="form-check-input admin"
                      type="checkbox"
                      value=""
                      id="rememberme"
                    />
                    <label
                      className="form-check-label text-deep small "
                      htmlFor="rememberme"
                    >
                      Customers
                    </label>
                  </div>
                  <div className="form-check mx-3">
                    <input
                      className="form-check-input admin"
                      type="checkbox"
                      value=""
                      id="rememberme"
                    />
                    <label
                      className="form-check-label text-deep small "
                      htmlFor="rememberme"
                    >
                      Sales/Payment
                    </label>
                  </div>
                  <div className="form-check mx-3">
                    <input
                      className="form-check-input admin"
                      type="checkbox"
                      value=""
                      id="rememberme"
                    />
                    <label
                      className="form-check-label text-deep small "
                      htmlFor="rememberme"
                    >
                      Products
                    </label>
                  </div>
                  <div className="form-check mx-3">
                    <input
                      className="form-check-input admin"
                      type="checkbox"
                      value=""
                      id="rememberme"
                    />
                    <label
                      className="form-check-label text-deep small "
                      htmlFor="rememberme"
                    >
                      Delivery
                    </label>
                  </div>
                  <div className="form-check mx-3">
                    <input
                      className="form-check-input admin"
                      type="checkbox"
                      value=""
                      id="rememberme"
                    />
                    <label
                      className="form-check-label text-deep small "
                      htmlFor="rememberme"
                    >
                      Manufacture
                    </label>
                  </div>
                  <div className="form-check mx-3">
                    <input
                      className="form-check-input admin"
                      type="checkbox"
                      value=""
                      id="rememberme"
                    />
                    <label
                      className="form-check-label text-deep small "
                      htmlFor="rememberme"
                    >
                      Return
                    </label>
                  </div>
                  <div className="form-check mx-3">
                    <input
                      className="form-check-input admin"
                      type="checkbox"
                      value=""
                      id="rememberme"
                    />
                    <label
                      className="form-check-label text-deep small "
                      htmlFor="rememberme"
                    >
                      Report
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card border-0 pb-3 my-5 rounded pb-3 mb-5"
              style={{ borderRadius: "10px" }}
            >
              <div className="ms-bg text-white py-2">
                <h6 className="mx-4">LOGIN CREDENTIALS</h6>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <Form>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label className="small" for="fname">
                          <b className="text-deep">Username</b>
                        </Label>
                        <Input
                          id="firstName"
                          name="fname"
                          type="text"
                          placeholder="aopoku6"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label className="small" for="lname">
                          <b className="text-deep">Password</b>
                        </Label>
                        <Input
                          id="lastName"
                          name="lname"
                          type="text"
                          placeholder="Anzi45?m"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
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
