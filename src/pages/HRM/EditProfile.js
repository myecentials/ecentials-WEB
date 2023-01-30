import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import SideBar from "../../components/SideBar";
import BreadOutlined from "../../components/BreadOutlined";
import BreadCrumb from "../../components/BreadCrumb";
import StaffDetailsHeader from "../../components/StaffDetailsHeader";
import { BsX } from "react-icons/bs";
import {
  Form,
  Input,
  Label,
  FormGroup,
  Col,
  Row,
  Modal,
  ToastHeader,
  Toast,
  ToastBody,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import deleteicon from "../../assets/icons/svg/delete.svg";
import Header from "../../components/Header";
import axios from "../../config/api/axios";
import { CgClose } from "react-icons/cg";
import PharmacyName from "../../components/PharmacyName";
const EditProfile = () => {
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    city: "",
    email: "",
    phone_number: "",
    photo: null,
    profile: null,
    role: "",
    university: "",
    privileges: [],
    address: "",
    degree: "",
    place_of_birth: "",
    date_of_birth: "",
    ghana_card_number: "",
    start_date: "",
    end_date: "",
    employee_id: "",
    facility_type: "Pharmacy",
    facility_id: sessionStorage.getItem("facility_id"),
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "file"
        ? e.target.files[0]
        : e.target.type === "checkbox"
        ? details.privileges.includes(e.target.name)
          ? details.privileges.sort()
          : details.privileges.push(e.target.name)
        : e.target.value;
    setDetails({ ...details, [name]: value });
  };

  useEffect(() => {
    axios
      .post("/pharmacy/staff/fetch-pharmacy-staff", {
        facility_id: sessionStorage.getItem("facility_id"),
      })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem(
          "employee_id",
          res.data.data[sessionStorage.getItem("index")].employee_id
        );
        setDetails({
          ...details,
          ...res.data.data[sessionStorage.getItem("index")],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(details.privileges);

  const date = new Date(details.date_of_birth);
  const year = date.getFullYear();
  const mon = date.getMonth();
  const day = date.getDay();
  // console.log(`${day}/${mon}/${year}`);

  // let startDate = null;
  // let endtDate = null;
  // startDate = new Date(start_date).getFullYear();
  // endtDate = new Date(start_date).getFullYear();

  // if (startDate == endtDate) {
  //   endtDate = "Present";
  // }

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleStaffName = (e) => {
    setStaffName(e.target.Value);
    e.target.value == `${details.first_name} ${details.last_name}`
      ? setIsEqual(true)
      : setIsEqual(false);
  };

  const handleClose = () => {
    setIsUpdated(false);
  };

  const formData = new FormData();
  formData.append("first_name", details.first_name);
  formData.append("last_name", details.last_name);
  formData.append("email", details.email);
  formData.append("phone_number", details.phone_number);
  formData.append("address", details.address);
  formData.append("place_of_birth", details.place_of_birth);
  formData.append("date_of_birth", details.date_of_birth);
  formData.append("ghana_card_number", details.ghana_card_number);
  formData.append("pay_grade", details.pay_grade);
  formData.append("mode_of_payment", details.mode_of_payment);
  formData.append("department", details.department);
  formData.append("start_date", details.start_date);
  formData.append("end_date", details.end_date);
  formData.append("city", details.city);
  formData.append("username", details.username);
  formData.append("employee_id", details.employee_id);
  formData.append("password", details.password);
  formData.append("degree", details.degree);
  formData.append("university", details.university);
  formData.append("facility_type", details.facility_type);
  formData.append("facility_id", details.facility_id);
  formData.append("photo", details.profile ? details.profile : details.photo);
  formData.append("cv", details.cv);
  formData.append("certificate", details.certificate);
  formData.append("staff_type", details.staff_type);
  for (let i = 0; i < details.privileges.length; i++) {
    formData.append("privileges[]", details.privileges[i]);
    console.log(details.privileges[i]);
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axios
      .post("/pharmacy/staff/update-staff-information", formData)
      .then((res) => {
        setIsLoading(false);
        navigate("/hrm/staff/name");
      })
      .catch((err) => {
        setIsLoading(false);
      });
    // console.log(details.employee_id);
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
              <h6 className="mt-2 text-deep">HRM</h6>
              <p className="small gray-text">
                <span className="text-primary">{dayOfWeek}, </span>
                {dayOfMonth} {curMonth}, {curYear}
              </p>
              <div className="d-flex flex-wrap">
                <BreadOutlined name="HRM" breadcrumb="/hrm/staff" />
                <BreadOutlined name="Staff" breadcrumb="/hrm/staff" />
                <BreadOutlined
                  name={details.first_name}
                  breadcrumb="/hrm/staff/name"
                />
                <BreadCrumb
                  name="Edit profile"
                  breadcrumb="/hrm/staff/name/edit"
                  width="7rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-auto mx-md-5">
            <StaffDetailsHeader
              name={`${details.first_name} ${details.last_name}`}
              role={details.role}
              location={details.city}
              phone={details.phone_number}
              gmail={details.email}
              img={details.photo}
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
                          type="text"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.first_name}
                          onChange={handleChange}
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
                          name="last_name"
                          type="text"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.last_name}
                          onChange={handleChange}
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
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.email}
                          onChange={handleChange}
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
                          type="text"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.phone_number}
                          onChange={handleChange}
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
                          value={details.address}
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
                          {details.photo ? (
                            <img
                              src={
                                details.profile
                                  ? URL.createObjectURL(details.profile)
                                  : details.photo
                              }
                              alt=""
                              className="w-100 h-100"
                            />
                          ) : (
                            <p className="small file_name">
                              Drag and drop or click here to select image
                            </p>
                          )}
                          <input
                            type="file"
                            className="drug_file"
                            accept="image/*"
                            name="profile"
                            onChange={handleChange}
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
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.place_of_birth}
                          onChange={handleChange}
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
                          type="date"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.date_of_birth}
                          onChange={handleChange}
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
                          onChange={handleChange}
                          id="place"
                          name="ghana_card_number"
                          type="text"
                          value={details.ghana_card_number}
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
                          type="text"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.university}
                          onChange={handleChange}
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
                          type="text"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.degree}
                          onChange={handleChange}
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
                              type="date"
                              style={{ borderColor: "#C1BBEB" }}
                              value={details.start_date}
                              onChange={handleChange}
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
                              type="date"
                              style={{ borderColor: "#C1BBEB" }}
                              value={details.end_date}
                              onChange={handleChange}
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
                          type="text"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.city}
                          onChange={handleChange}
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
                      id="rememberme"
                      name="hrm"
                      onChange={handleChange}
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
                      id="rememberme"
                      name="customers"
                      // checked={details.privileges.includes("customers")}
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
                      id="rememberme"
                      name="sales"
                      onChange={handleChange}
                      // checked={details.privileges.includes("sales")}
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
                      onChange={handleChange}
                      id="rememberme"
                      // checked={details.role.includes("products")}
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
                      id="rememberme"
                      name="delivery"
                      onChange={handleChange}
                      // checked={details.role.includes("delivery")}
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
                      id="rememberme"
                      name="manufacture"
                      onChange={handleChange}
                      // checked={details.role.includes("manufacture")}
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
                      id="rememberme"
                      name="return"
                      onChange={handleChange}
                      // checked={details.role.includes("return")}
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
                      id="rememberme"
                      name="report"
                      onChange={handleChange}
                      // checked={details.role.includes("report")}
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
                          <b className="text-deep">Business ID</b>
                        </Label>
                        <Input
                          id="username"
                          name="employee_id"
                          type="text"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.employee_id}
                          onChange={handleChange}
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
                          style={{ borderColor: "#C1BBEB" }}
                          value=""
                          onChange={handleChange}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>

            <button
              type="submit"
              className="ms-bg text-white rounded-pill px-4 mb-5 save py-2"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <span class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </span>
              ) : (
                "Submit"
              )}
            </button>

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
                    {details.first_name} {details.last_name}'s
                  </b>{" "}
                  information
                </p>
                <p className="mx-3">
                  Please type staff name{" "}
                  <b>
                    {details.first_name} {details.last_name}
                  </b>{" "}
                  to confirm.
                </p>
                <input
                  type="text"
                  className="form-control delete_staff_input"
                  onChange={handleStaffName}
                />
                <input
                  type="button"
                  value="I understand consequence, Terminate this staff"
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
