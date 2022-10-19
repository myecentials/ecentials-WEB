import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import menulist from "../../assets/icons/svg/menulist.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";

const AddCategory = () => {
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
        <title>Add Categories</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">Settings</h6>
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
            <div className="mx-4 d-none d-md-block">
              <h5 className="text-deep">Company Name</h5>
              <h5 className="small light-deep">Orange Drugs Limited</h5>
            </div>
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <div
              className="card border-0 pb-3 my-5 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div className="ms-bg text-white py-2">
                <div className="d-flex align-items-center justify-content-between mx-3">
                  <h6>ADD CATEGORY</h6>
                  <div className="btn btn-light">
                    <img src={menulist} alt="" />
                    <b className="mx-2 small" style={{ color: "#4D44B5" }}>
                      Category List
                    </b>
                  </div>
                </div>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <Form>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={2} className="text-nowrap">
                      Category Name*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="category"
                        placeholder="Category Name"
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
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
                          <Input name="active" type="radio" />{" "}
                          <Label check className="small">
                            Active
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col sm={9}>
                        <FormGroup check>
                          <Input name="active" type="radio" />{" "}
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
                    className="btn ms-bg text-white rounded-pill px-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
