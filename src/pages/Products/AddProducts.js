import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Form, FormGroup, Input, Label } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import Header from "../../components/Header";

const AddProducts = () => {
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
        <title>Add Products</title>
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
              <h6 className="mt-2 text-deep">Settings</h6>
              <p className="small gray-text">
                <span className="text-primary">{dayOfWeek}, </span>
                {dayOfMonth} {curMonth}, {curYear}
              </p>
              <div className="d-flex">
                <BreadOutlined name="Products" breadcrumb="/products" />
                <BreadCrumb
                  name="Add Products"
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

          <div className="text-deep mx-3 mt-4">
            Please add category, group, dosage, company name before adding
            medicine.
          </div>
          <div className="mx-md-3 mx-2">
            <div
              className="card border-0 pb-3 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div className="ms-bg text-white py-2">
                <h6 className="mx-3">PRODUCT DETAILS</h6>
              </div>
              <div className="mx-md-4 mt-3 text-deep">
                <div className="mx-3">
                  <Form>
                    <FormGroup>
                      <Label className="small" for="fname">
                        <b>Category*</b>
                      </Label>
                      <Input
                        id="category"
                        name="category"
                        type="select"
                        style={{ borderColor: "#C1BBEB" }}
                      >
                        <option value="tablet">Tablet</option>
                        <option value="oral">Oral</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="fname">
                        <b>Medicine Group*</b>
                      </Label>
                      <Input
                        id="category"
                        name="category"
                        type="select"
                        style={{ borderColor: "#C1BBEB" }}
                      >
                        <option value="tablet">Tablet</option>
                        <option value="oral">Oral</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Medicine Name*</b>
                      </Label>
                      <Input
                        id="number"
                        name="number"
                        type="text"
                        placeholder="Tablet"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Purchase Price per Piece (GHS) *</b>
                      </Label>
                      <Input
                        id="number"
                        name="number"
                        type="text"
                        placeholder="200"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Selling Price per Piece (GHS) *</b>
                      </Label>
                      <Input
                        id="number"
                        name="number"
                        type="text"
                        placeholder="250"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label className="small" for="fname">
                        <b>Dosage*</b>
                      </Label>
                      <Input
                        id="category"
                        name="category"
                        type="select"
                        style={{ borderColor: "#C1BBEB" }}
                      >
                        <option value="tablet">250mg</option>
                        <option value="tablet">500mg</option>
                        <option value="oral">1000mg</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Supplier/Company Name*</b>
                      </Label>
                      <Input
                        id="number"
                        name="number"
                        type="text"
                        placeholder="Tobinco Pharmaceutical Company"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Medicine Description*</b>
                      </Label>
                      <Input
                        maxLength={2000}
                        max={200}
                        height={500}
                        id="number"
                        name="number"
                        type="textarea"
                        placeholder=""
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Expiry Date*</b>
                      </Label>
                      <Input
                        id="number"
                        name="number"
                        type="date"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Photo*</b>
                      </Label>
                      <div className="drug-photo"></div>
                    </FormGroup>
                  </Form>
                </div>
                <div className="d-flex justify-content-end align-items-end mt-5">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn ms-bg text-white rounded-pill px-4"
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

export default AddProducts;
