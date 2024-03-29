import React from "react";
import DateHeader from "../../components/DateHeader";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
// import SideBar from "../../components/SideBar";
import BreadOutlined from "../../components/BreadOutlined";
import BreadCrumb from "../../components/BreadCrumb";
import { Form, Input, Label, FormGroup, Col, Row } from "reactstrap";
import Header from "../../components/Header";
import { useState } from "react";
// import file from "../../assets/files/andrews_opoku_cv.pdf";
import useAuth from "../../hooks/useAuth";
import axios from "../../config/api/axios";
// import { useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";
import PharmacyName from "../../components/PharmacyName";
import { toast, Toaster } from "react-hot-toast";
import schools from "../../static/schools.json";
import Select from "react-select";
import HospitalSidebar from "../../components/Hospital/HospitalSidebar";

const AddNewStaff = () => {
  const random = faker.internet.password();
  const staffRan = faker.finance.pin(3);
  const { auth } = useAuth();

  //
  // const { hospitalInfo } = useAuth();
  const [, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");
  // const [fileName1, setFileName1] = useState(null);
  // const [fileName2, setFileName2] = useState(null);
  // const navigate = useNavigate();
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    degree: "",
    place_of_birth: "",
    date_of_birth: "",
    ghana_card_number: "",
    pay_grade: "2000-3000",
    mode_of_payment: "MoMo",
    department: "pos",
    start_date: "",
    end_date: "",
    city: "",
    username: "",
    employee_id: "",
    password: "",
    supervisor: "",
    university: "",
    facility_type: "hospital",
    facility_id: sessionStorage.getItem("facility_id"),
    photo: null,
    cv: null,
    staff_type: "Hospital staff",
    certificate: null,
    privileges: ["dashboard"],
  });
  // let fileImage = null;
  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "file"
        ? e.target.files[0]
        : e.target.type === "checkbox"
        ? details.privileges.push(e.target.name)
        : e.target.value;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  // const handleCheck = (e) => {
  //   details.privileges.push(e.target.name);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(details);
    // try {
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
    // formData.append("employee_id", details.employee_id);
    formData.append("password", details.password);
    formData.append("degree", details.degree);
    formData.append("university", details.university);
    formData.append("facility_type", details.facility_type);
    formData.append("facility_id", details.facility_id);
    formData.append("photo", details.photo);
    formData.append("cv", details.cv);
    formData.append("certificate", details.certificate);
    formData.append("staff_type", details.staff_type);
    for (let i = 0; i < details.privileges.length; i++) {
      formData.append("privileges[]", details.privileges[i]);
    }

    // const {
    //   first_name,
    //   last_name,
    //   email,
    //   password,
    //   address,
    //   ghana_card_number,
    //   mode_of_payment,
    //   department,
    //   start_date,
    //   city,
    //   username,
    //   employee_id,
    //   degree,
    //   photo,
    // } = details;

    // if (first_name == "" || last_name == "" || email == "" || photo == "") {
    //   setIsLoading(false);
    //   setError(true);
    //   setErrorMsg("Please Input required fields");
    // } else {
    //   const response = await axios.post(
    //     "/pharmacy/staff/add-new-staff",
    //     formData,
    //     {
    //       headers: {
    //         "auth-token": auth.token || sessionStorage.getItem("userToken"),
    //       },
    //     }
    //   );

    //   if (response.status === 200 || response.status === 400) {
    //     setIsLoading(false);
    //   }
    //   if (response.data.message === "success") {
    //     navigate("/hrm/staff");
    //   }
    //   // console.log(...formData);
    // }
    // } catch (error) {
    //   setError(true);
    //   setIsLoading(false);
    //   setErrorMsg("Please Input required fields");
    // }

    // if (first_name == "" || last_name == "" || email == "" || photo == "") {
    //   toast.error("Please Input required fields");
    // } else {
    // }
    const myPromise = axios.post("/hospital/staff/add-new-staff", formData, {
      headers: {
        "auth-token": auth.token || sessionStorage.getItem("userToken"),
      },
    });
    toast.promise(
      myPromise,
      {
        loading: "Loading...",
        success: "Staff created successfully",
        error: "Please Input required fields",
      }
      // navigate("/hrm/staff")
    );
  };

  // const [school, setSchool] = useState(schools);

  return (
    <>
      <Helmet>
        <title>Add New Staff</title>
      </Helmet>
      <Header />
      <CustomeNav />
      <div className="d-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <HospitalSidebar />
        </div>
        <div className="col-md-9 middle edit-relative pb-5">
          <Toaster />
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">HRM</h6>
              <DateHeader />
              <div className="d-flex flex-wrap">
                <BreadOutlined
                  name="Cli Mgt"
                  breadcrumb="/hospital/management"
                />
                <BreadOutlined name="Staff" breadcrumb="/hospital/management" />
                <BreadCrumb
                  name="Add Staff"
                  breadcrumb="/hospital/management/add-staff"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
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
                  {/* {error ? <p className="error">{errorMsg}</p> : ""} */}
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="fname">
                          <b className="text-deep">First name*</b>
                        </Label>
                        <Input
                          id="firstName"
                          name="first_name"
                          type="text"
                          placeholder="Andrews"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.first_name}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="lname">
                          <b className="text-deep">Last name*</b>
                        </Label>
                        <Input
                          id="lastName"
                          name="last_name"
                          type="text"
                          placeholder="Opoku"
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
                        <Label className="small" htmlFor="fname">
                          <b className="text-deep">Email*</b>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="example@gmail.com"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.email}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="number">
                          <b className="text-deep">Phone number*</b>
                        </Label>
                        <Input
                          id="number"
                          name="phone_number"
                          type="text"
                          placeholder="0000000000"
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
                        <Label className="small" htmlFor="address">
                          <b className="text-deep">Address*</b>
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          type="textarea"
                          placeholder="PLT 16 BLK III, Tafo-Kumasi"
                          style={{ height: "9rem", borderColor: "#C1BBEB" }}
                          value={details.address}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="about">
                          <b className="text-deep">Photo*</b>
                        </Label>
                        <div
                          className="drug-photo"
                          style={{ cursor: "pointer" }}
                        >
                          {details.photo ? (
                            <img
                              src={URL.createObjectURL(details.photo)}
                              alt=""
                              className="w-100 h-100"
                              style={{
                                aspectRatio: "3 / 2",
                                objectFit: "cover",
                                // mixBlendMode: "darken",
                                pointerEvents: "none",
                              }}
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
                            name="photo"
                            onChange={handleChange}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="place">
                          <b className="text-deep">Place of birth*</b>
                        </Label>
                        <Input
                          id="place"
                          name="place_of_birth"
                          type="address"
                          placeholder="Tafo Government Hospital"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.place_of_birth}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="date">
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
                        <Label className="small" htmlFor="place">
                          <b className="text-deep">Ghana Card Number*</b>
                        </Label>
                        <Input
                          style={{ borderColor: "#C1BBEB" }}
                          id="place"
                          name="ghana_card_number"
                          type="text"
                          placeholder="GHA-0123456789"
                          value={details.ghana_card_number}
                          onChange={handleChange}
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
                        <Label className="small" htmlFor="fname">
                          <b className="text-deep">Department*</b>
                        </Label>
                        <select
                          className="form-control"
                          id="select"
                          name="department"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.department}
                          onChange={handleChange}
                        >
                          <option value="select" disabled>
                            --select department--
                          </option>
                          <option value="pos">POS</option>
                          <option value="health">Health</option>
                          <option value="nurse">Nurse</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="lname">
                          <b className="text-deep">Supervisor*</b>
                        </Label>
                        <select
                          id="supname"
                          name="supervisor"
                          className="form-control"
                          placeholder="namee"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.supervisor}
                          onChange={handleChange}
                        >
                          <option value="select" disabled>
                            --select supervisor--
                          </option>
                          <option value="andrews">Andrews Opoku</option>
                          <option value="sup1">Jesse Anim</option>
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Col>
                        <FormGroup>
                          <Label className="small" htmlFor="pay_grade">
                            <b className="text-deep">Pay Grade*</b>
                          </Label>
                          <select
                            id="supname"
                            name="pay_grade"
                            className="form-control"
                            placeholder="namee"
                            style={{ borderColor: "#C1BBEB" }}
                            value={details.pay_grade}
                            onChange={handleChange}
                          >
                            <option value="select" disabled>
                              --select pay grade--
                            </option>
                            <option value="grade1">GH₵ 2000-3000</option>
                            <option value="grade2">4000-6000</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="number">
                          <b className="text-deep">Mode of Payment*</b>
                        </Label>
                        <select
                          id="supname"
                          name="mode_of_payment"
                          className="form-control"
                          placeholder="namee"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.mode_of_payment}
                          onChange={handleChange}
                        >
                          <option value="select" disabled>
                            --mode of payment--
                          </option>
                          <option value="momo">MoMo</option>
                          <option value="bank">Bank</option>
                        </select>
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
                        <Label className="small" htmlFor="fname">
                          <b className="text-deep">University*</b>
                        </Label>

                        <Select
                          isSearchable={true}
                          options={schools.sort().map(({ name }) => ({
                            value: name,
                            label: name,
                          }))}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: "#C1BBEB",
                            }),
                          }}
                          onChange={(e) =>
                            setDetails({ ...details, university: e.value })
                          }
                        />

                        {/* <Input
                          id="university"
                          name="university"
                          type="text"
                          list="universities"
                          placeholder="Kwame Nkrumah University of Science and Technology"
                          style={{ borderColor: "#C1BBEB" }}
                          value={details.university}
                          onChange={handleChange}
                        /> */}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" htmlFor="lname">
                          <b className="text-deep">Degree*</b>
                        </Label>
                        <Input
                          id="lastName"
                          name="degree"
                          type="text"
                          placeholder="Bsc. Computer Science"
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
                            <Label className="small" htmlFor="fname">
                              <b className="text-deep">Start Date*</b>
                            </Label>
                            <Input
                              id="email"
                              name="start_date"
                              type="date"
                              placeholder="2017"
                              style={{ borderColor: "#C1BBEB" }}
                              value={details.start_date}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label className="small" htmlFor="fname">
                              <b className="text-deep">End Date*</b>
                            </Label>
                            <Input
                              id="date"
                              name="end_date"
                              type="date"
                              placeholder="2021"
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
                        <Label className="small" htmlFor="number">
                          <b className="text-deep">City*</b>
                        </Label>
                        <Input
                          id="number"
                          name="city"
                          type="text"
                          placeholder="Kumasi, Ghana"
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
                <div className=" mb-3">
                  <Input
                    style={{ borderColor: "#C1BBEB" }}
                    type="file"
                    className="form-control"
                    onChange={handleChange}
                    accept=".pdf,.docx,.doc"
                    name="cv"
                  />
                </div>
                <p className="gray-text small">Degree Certificcate</p>
                <div className="">
                  <Input
                    style={{ borderColor: "#C1BBEB" }}
                    type="file"
                    className="form-control"
                    title="select a file"
                    name="certificate"
                    accept=".pdf,.docx,.doc"
                    onChange={handleChange}
                  />
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
                      onChange={handleChange}
                      name="doctor"
                    />
                    <label
                      className="form-check-label text-deep small "
                      htmlFor="rememberme"
                    >
                      Doctors
                    </label>
                  </div>
                  <div className="form-check mx-3">
                    <input
                      className="form-check-input admin"
                      type="checkbox"
                      name="management"
                      id="rememberme"
                      onChange={handleChange}
                      // onFocus={handleCheck}
                    />
                    <label
                      className="form-check-label text-deep text-nowrap small "
                      htmlFor="rememberme"
                    >
                      Hospital Management
                    </label>
                  </div>
                  {/* <div className="form-check mx-3">
                    <input
                      className="form-check-input admin"
                      type="checkbox"
                      name="sales"
                      id="rememberme"
                      onChange={handleChange}
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
                      name="products"
                      id="rememberme"
                      onChange={handleChange}
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
                      name="delivery"
                      id="rememberme"
                      onChange={handleChange}
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
                      name="manufacture"
                      id="rememberme"
                      onChange={handleChange}
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
                      name="return"
                      id="rememberme"
                      onChange={handleChange}
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
                      name="orders"
                      id="rememberme"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label text-deep small "
                      htmlFor="rememberme"
                    >
                      Orders
                    </label>
                  </div>
                  <div className="form-check mx-3">
                    <input
                      className="form-check-input admin"
                      type="checkbox"
                      name="report"
                      id="rememberme"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label text-deep small "
                      htmlFor="rememberme"
                    >
                      Report
                    </label>
                  </div> */}
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
                        <Label className="small" htmlFor="fname">
                          <b className="text-deep">Business ID</b>
                        </Label>
                        <Input
                          id="firstName"
                          name="employee_id"
                          type="text"
                          placeholder="AN123456"
                          style={{ borderColor: "#C1BBEB" }}
                          value={
                            (details.employee_id = details.first_name
                              ? details.first_name
                                  .toUpperCase()
                                  .substring(0, 1)
                                  .concat(details.last_name)
                                  .toString()
                                  .concat(staffRan.toString())
                              : "")
                          }
                          onChange={handleChange}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label className="small" htmlFor="lname">
                          <b className="text-deep">Password</b>
                        </Label>
                        <Input
                          id="lastName"
                          name="password"
                          type="password"
                          placeholder="Anzi45?m"
                          style={{ borderColor: "#C1BBEB" }}
                          value={
                            (details.password = details.first_name
                              ? `${random}`
                              : "")
                          }
                          onChange={handleChange}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>

            {/*  */}

            <button
              type="submit"
              className="ms-bg text-white rounded-pill px-4 mb-5 save py-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewStaff;
