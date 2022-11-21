import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import StaffCard from "../../components/StaffCard";
import BreadOutlined from "../../components/BreadOutlined";
import SearchBar from "../../components/SearchBar";
import activeStaff from "../../static/activeStaff";
import leftchev from "../../assets/icons/svg/leftchev.svg";
import rightchev from "../../assets/icons/svg/rightchev.svg";
import chevfilldown from "../../assets/icons/svg/chevfilldown.svg";
import add from "../../assets/icons/svg/add.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import axios from "../../config/api/axios";
import { useState } from "react";
import { useEffect } from "react";
import { Modal, Progress, Spinner } from "reactstrap";
import CountUp from "react-countup";
import empty from "../../assets/images/svgs/empty.svg";
const Staff = () => {
  const [value, setValue] = useState(0);

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

  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        "/pharmacy/staff/fetch-pharmacy-staff",
        { facility_id: localStorage.getItem("facility_id") },
        { headers: { "auth-token": localStorage.getItem("userToken") } }
      )
      .then((res) => {
        setDetails(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Staff</title>
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
                <BreadOutlined name="HRM" breadcrumb="/hrm/staff" />
                <BreadCrumb
                  name="Staff"
                  breadcrumb="/hrm/staff"
                  hasStyles={true}
                />
              </div>
            </div>
            <div className="mx-4 d-none d-md-block">
              <h5 className="text-deep">Company Name</h5>
              <h5 className="small light-deep">Orange Drugs Limited</h5>
            </div>
          </div>

          <div className="d-md-flex justify-content-between mt-4">
            <div className="mx-3"></div>
            <div className="d-flex justify-content-evenly  mt-md-0 mt-3">
              <button
                className="btn outline-btn rounded-pill px-4 text-nowrap"
                style={{ color: "#4D44B5" }}
              >
                Newest{" "}
                <img src={chevfilldown} alt="" width={15} className="mx-2" />
              </button>
              <Link
                to="/hrm/staff/add-new-staff"
                className="btn mx-md-3 signup-btn rounded-pill px-4 text-nowrap"
              >
                <img src={add} alt="" width={10} className="mx-2" /> New Staff
              </Link>
            </div>
          </div>
          <Modal isOpen={isLoading}></Modal>
          {details.length === 0 ? (
            <div className="staff_contain">
              <img
                src={empty}
                alt=""
                className="img-fluid d-block"
                width={300}
              />
              <p className="text-center mt-2 text-deep">No Staff Available</p>
            </div>
          ) : (
            <div className="row mt-md-5 mx-3 pb-5 d-grid-3">
              {details.map(
                ({ first_name, last_name, photo, department, _id }, index) => (
                  <div className="col-lg-3 gy-3" key={_id}>
                    <StaffCard
                      image={photo}
                      link={`/hrm/staff/${first_name} ${last_name} ${_id}`}
                      name={`${first_name} ${last_name}`}
                      field={department}
                      id={index}
                    />
                  </div>
                )
              )}
            </div>
          )}

          <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
            <p className="small text-center">
              Showing <span className="text-lightdeep">1-{details.length}</span>{" "}
              from <span className="text-lightdeep">{details.length}</span> data
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <img src={leftchev} alt="" className="mx-3" />
              <div className="circle rounded-circle mail circle-bgdeep text-white">
                1
              </div>
              <div className="circle rounded-circle mail mx-2">2</div>
              <div className="circle rounded-circle mail">3</div>
              <img src={rightchev} alt="" className="mx-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staff;
