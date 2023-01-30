import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import menulist from "../../assets/icons/svg/menulist.svg";
import mail from "../../assets/icons/svg/mail.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Col } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "../../config/api/axios";
import PharmacyName from "../../components/PharmacyName";

const AddCustomers = () => {
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
    facility_id: sessionStorage.getItem("facility_id"),
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    country: "",
  });

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (details.name === "") {
      setError(true);
      setErrorMsg("Please input all fields");
      setIsLoading(false);
    } else {
      axios
        .post("/pharmacy/customers/add-new-customer", { ...details })
        .then((res) => {
          if (res.data.message === "success") {
            navigate("/customers/customers-list");
          }
          if (res.data.error.code === 11000) {
            setError(true);
            setErrorMsg(`${details.name} already exist. Check customer list`);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Customers</title>
      </Helmet>
      <Header />
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">CUSTOMERS</h6>
              <p className="small gray-text">
                <span className="text-primary">{dayOfWeek}, </span>
                {dayOfMonth} {curMonth}, {curYear}
              </p>
              <div className="d-flex">
                <BreadOutlined
                  name="Customers"
                  breadcrumb="/customers/add-customers"
                  width="8rem"
                />
                <BreadCrumb
                  name="Add Customers"
                  breadcrumb=""
                  width="10rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-md-5 mx-2">
            <div
              className="card border-0 pb-3 my-5 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div
                className="ms-bg text-white pt-2 d-flex align-items-center justify-content-between"
                style={{
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                }}
              >
                <h6 className="mx-3 text-nowrap">Add Customer</h6>
                <h6 className="mx-3">
                  <Link
                    to="/customers/customers-list"
                    className="btn btn-light d-flex"
                  >
                    <img src={menulist} alt="" />
                    <b
                      className="mx-2 small text-nowrap"
                      style={{ color: "#4D44B5" }}
                    >
                      Customer List
                    </b>
                  </Link>
                </h6>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <Form>
                  {error ? <div className="error">{errorMsg}</div> : ""}
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2} className="text-nowrap">
                      Customer Name*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="name"
                        placeholder="Andrews Opoku"
                        value={details.name}
                        onChange={handleChange}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2} className="text-nowrap">
                      Email Addresss*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="email"
                        placeholder="aopoku255@gmail.com"
                        value={details.email}
                        onChange={handleChange}
                        type="email"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2} className="text-nowrap">
                      Phone*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="phone"
                        placeholder="+233545098438"
                        value={details.phone}
                        onChange={handleChange}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2} className="text-nowrap">
                      Address*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="address"
                        placeholder="PLT 16 BLK III"
                        value={details.address}
                        onChange={handleChange}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2} className="text-nowrap">
                      City*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="city"
                        placeholder="Kumasi"
                        value={details.city}
                        onChange={handleChange}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2} className="text-nowrap">
                      Region*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="region"
                        placeholder="Kumasi"
                        value={details.region}
                        onChange={handleChange}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2} className="text-nowrap">
                      Country*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="country"
                        placeholder="Ghana"
                        value={details.country}
                        onChange={handleChange}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>

                  <div className="d-flex justify-content-end align-items-end mt-4">
                    <img src={mail} alt="" />
                    <input
                      type="submit"
                      value="Save"
                      onClick={handleClick}
                      className="ms-bg text-white rounded-pill px-4 py-2"
                    />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCustomers;
