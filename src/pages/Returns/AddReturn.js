import React, { useState } from "react";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Input } from "reactstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";

const AddReturn = () => {
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

  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleReturns = () => {
    if (details === "") {
      console.log("empty");
    } else {
      axios
        .post("/pharmacy/returns/fetch-returns", {
          store_id: localStorage.getItem("facility_id"),
          invoice_number: details,
        })
        .then((res) => {
          if (res.data.message === "success") {
            navigate("/returns/invoice-return-list");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <Helmet>
        <title>Add Return</title>
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
                <BreadCrumb
                  name="Add Return"
                  breadcrumb=""
                  hasStyles={true}
                  width="8rem"
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
                <div className="row mx-2">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <h6 className="mx-3 text-nowrap">Ship from: </h6>
                      <Input type="select">
                        <option value="">Customer</option>
                      </Input>
                    </div>
                  </div>
                  <div className="col-sm-6"></div>
                </div>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <div
                  className="d-flex justify-content-sm-center align-items-sm-center "
                  style={{ minHeight: "5rem" }}
                >
                  <div className="d-sm-flex align-items-sm-center">
                    <label htmlFor="" className="text-nowrap">
                      Invoice ID
                    </label>
                    <input
                      className="form-control add_return__form mx-sm-3 my-sm-0 my-3"
                      type="text"
                      placeholder=""
                      onChange={(e) => setDetails(e.target.value)}
                    />
                    <input
                      disabled={details === ""}
                      type="submit"
                      value="Add"
                      className=" ms-bg rounded text-white px-4 btn-sm py-2"
                      onClick={handleReturns}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddReturn;
