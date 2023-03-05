import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import menulist from "../../assets/icons/svg/menulist.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Form, FormGroup, Input, Label, Col, Row, Modal } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import Header from "../../components/Header";
import axios from "../../config/api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PharmacyName from "../../components/PharmacyName";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
const AddCategory = () => {
  const [data, setData] = useState([]);
  const {auth}  = useAuth()

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

  const [drugCategory, setDrugCategory] = useState({
    name: "",
    status: "active",
    pharmacy_id: sessionStorage.getItem("facility_id"),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDrugCategory({ ...drugCategory, [name]: value });
  };

  const navigate = useNavigate();

  let placeholder = "Tablet";
  const handleClick = async () => {
    if (drugCategory.name == "") {
      toast.error("Enter product category", {
        iconTheme: {
          // primary: "#28A745",
          secondary: "#fff",
        },
      });
    } else {
      setLoading(true);
      console.log(drugCategory);
      const myPromise = axios.post(
        "/pharmacy/drug-category/add-drug-category",
        { ...drugCategory },
        { headers: { "auth-token": auth.token ||  sessionStorage.getItem("userToken") } }
      );
      toast.promise(
        myPromise,
        {
          loading: "Loading",
          success: "Category Added successfully",
          error: "Please add category",
        },
        setDrugCategory({ name: "" }),
        setTimeout(() => {
          navigate("/products/category");
        }, 2000)
      );
    }
  };
  useEffect(() => {
    axios
      .post(
        "/pharmacy/drug-category/fetch-drug-categories",
        {
          pharmacy_id: sessionStorage.getItem("facility_id"),
        },
        { headers: { "auth-token": sessionStorage.getItem("userToken") } }
      )
      .then((res) => {
        setData(res.data.data[sessionStorage.getItem("editNum")]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Add Categories</title>
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
              <h6 className="mt-2 text-deep">CATEGORY</h6>
              <p className="small gray-text">
                <span className="text-primary">{dayOfWeek}, </span>
                {dayOfMonth} {curMonth}, {curYear}
              </p>
              <div className="d-flex">
                <BreadOutlined name="Products" breadcrumb="/products" />
                <BreadCrumb
                  name="Add Category"
                  breadcrumb=""
                  width="9rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <div
              className="card border-0 pb-3 my-5 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div className="ms-bg text-white py-2">
                <div className="d-flex align-items-center justify-content-between mx-3">
                  <h6>ADD CATEGORY</h6>
                  <Link to="/products/category" className="btn btn-light">
                    <img src={menulist} alt="" />
                    <b className="mx-2 small" style={{ color: "#4D44B5" }}>
                      Category List
                    </b>
                  </Link>
                </div>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <Form>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Category Name*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="name"
                        value={drugCategory.name}
                        placeholder={placeholder}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                        onChange={handleChange}
                        required={true}
                      />
                    </Col>
                  </FormGroup>
                </Form>

                <FormGroup row>
                  <Col>
                    <Label>Status*</Label>
                  </Col>
                  <Col sm={10}>
                    <Row>
                      <Col>
                        <FormGroup check>
                          <Input
                            name="status"
                            type="radio"
                            onChange={handleChange}
                            value="active"
                            checked={drugCategory.status === "active"}
                          />{" "}
                          <Label check className="small">
                            Active
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col sm={9}>
                        <FormGroup check>
                          <Input
                            name="status"
                            type="radio"
                            onChange={handleChange}
                            value="inactive"
                            checked={drugCategory.status === "inactive"}
                          />{" "}
                          <Label check className="small">
                            Inactive
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </FormGroup>
                <div className="d-block mx-auto text-center mt-4">
                  <input
                    type="submit"
                    value="Save"
                    className="ms-bg text-white rounded-pill px-5 py-2"
                    onClick={handleClick}
                  />
                </div>
                <Toaster />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
