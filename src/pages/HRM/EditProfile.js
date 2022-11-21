import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import SideBar from "../../components/SideBar";
import BreadOutlined from "../../components/BreadOutlined";
import BreadCrumb from "../../components/BreadCrumb";
import StaffDetailsHeader from "../../components/StaffDetailsHeader";
import { Form, Input, Label, FormGroup, Col, Row, Modal } from "reactstrap";
import { Link } from "react-router-dom";
import deleteicon from "../../assets/icons/svg/delete.svg";
import Header from "../../components/Header";
import axios from "../../config/api/axios";
import { CgClose } from "react-icons/cg";
const EditProfile = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
  const [staffName, setStaffName] = useState("");

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

  useEffect(() => {
    axios
      .post(
        "/pharmacy/staff/fetch-pharmacy-staff",
        { facility_id: localStorage.getItem("facility_id") },
        { headers: { "auth-token": localStorage.getItem("userToken") } }
      )
      .then((res) => {
        // console.log(res);
        setData(res.data.data[localStorage.getItem("index")]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    first_name,
    last_name,
    city,
    email,
    phone_number,
    photo,
    role,
    university,
    privileges,
    address,
    degree,
    place_of_birth,
    date_of_birth,
    ghana_card_number,
    start_date,
    end_date,
    username,
  } = data;
  const roles = [];
  for (let privilege in privileges) {
    roles.push(privileges[privilege]);
  }

  const date = new Date(date_of_birth);
  const year = date.getFullYear();
  const mon = date.getMonth();
  const day = date.getDay();
  // console.log(`${day}/${mon}/${year}`);

  let startDate = null;
  let endtDate = null;
  startDate = new Date(start_date).getFullYear();
  endtDate = new Date(start_date).getFullYear();

  if (startDate == endtDate) {
    endtDate = "Present";
  }

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleStaffName = (e) => {
    setStaffName(e.target.Value);
    e.target.value === `${first_name} ${last_name}`
      ? setIsEqual(true)
      : setIsEqual(false);
  };

  return (
    <>
      <Helmet>
        <title>Edit Profile</title>
      </Helmet>
      <Header />
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
                <BreadOutlined name={first_name} breadcrumb="/hrm/staff/name" />
                <BreadCrumb
                  name="Edit profile"
                  breadcrumb="/hrm/staff/name/edit"
                  width="7rem"
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
            <StaffDetailsHeader
              name={`${first_name} ${last_name}`}
              role={role}
              location={city}
              phone={phone_number}
              gmail={email}
              img={photo}
            />
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
                          name="first_name"
                          value={first_name}
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
                          name="first_name"
                          value={last_name}
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
                          value={email}
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
                          name="phone_number"
                          value={phone_number}
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
                          value={address}
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
                        >
                          {photo ? (
                            <img src={photo} alt="" className="w-100 h-100" />
                          ) : (
                            <p className="small file_name">
                              Drag and drop or click here to select image
                            </p>
                          )}
                          <input
                            type="file"
                            className="drug_file"
                            accept="image/*"
                            name="photo"
                          />
                        </div>
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
                          name="place_of_birth"
                          type="text"
                          placeholder="Tafo Government Hospital"
                          style={{ borderColor: "#C1BBEB" }}
                          value={place_of_birth}
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
                          name="date_of_birth"
                          type="text"
                          value={`${day}/${mon}/${year}`}
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
                          name="ghana_card_number"
                          type="text"
                          value={ghana_card_number}
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
                          name="university"
                          value={university}
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
                          name="degree"
                          value={degree}
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
                              name="start_date"
                              value={startDate}
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
                              name="end_date"
                              value={endtDate}
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
                          name="city"
                          value={city}
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
                  <Link to="" className="text-deep my-0" download="filename">
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
                      checked={roles.includes("hrm")}
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
                      checked={roles.includes("customers")}
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
                      checked={roles.includes("sales")}
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
                      checked={roles.includes("products")}
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
                      checked={roles.includes("delivery")}
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
                      checked={roles.includes("manufacture")}
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
                      checked={roles.includes("return")}
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
                      checked={roles.includes("report")}
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
            {/*  */}

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
                          name="username"
                          value={username}
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

            <input
              type="submit"
              className="btn ms-bg text-white rounded-pill px-3 mb-5 save"
            />
            <button
              className="btn btn-danger rounded-pill border-0 shadow-lg"
              onClick={handleModalOpen}
            >
              Terminate this staff
            </button>
            <Modal isOpen={isOpen} centered={true}>
              <div className="card border-0 modal_card">
                <CgClose className="close_modal" onClick={handleModalClose} />
                <p className="pt-3 mx-3">Are you absolutely sure?</p>
                <p className="py-3 px-3 warning_bg">
                  Unexpected bad things will happen if you don’t read this!
                </p>
                <p className="px-3">
                  This action cannot be undone. This will permanently terminate{" "}
                  <b>
                    {first_name} {last_name}'s
                  </b>{" "}
                  information
                </p>
                <p className="mx-3">
                  Please type staff name{" "}
                  <b>
                    {first_name} {last_name}
                  </b>{" "}
                  to confirm.
                </p>
                <input
                  type="text"
                  className="form-control delete_staff_input"
                  value={staffName}
                  onChange={handleStaffName}
                />
                <input
                  type="button"
                  value="I understand the consequence, delete this staff"
                  className={
                    isEqual
                      ? "form-control btn btn-outline-danger delete_staff_input my-4 delete_hover"
                      : "form-control btn btn-outline-danger delete_staff_input disabled  my-4 delete_hover"
                  }
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
