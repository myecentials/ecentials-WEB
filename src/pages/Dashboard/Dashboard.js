import React from "react";
import { useState } from "react";
import ItemsCard from "../../components/ItemsCard";
import SearchBar from "../../components/SearchBar";
import notification from "../../assets/icons/svg/notification.svg";
import settings from "../../assets/icons/svg/settings.svg";
import circleperson from "../../assets/icons/svg/circleperson.svg";
import continueicon from "../../assets/icons/svg/continue.svg";
import { Link } from "react-router-dom";
import ActiveStaff from "../../components/ActiveStaff";
import CurvedChat from "../../components/CurvedChat";
import SideBar from "../../components/SideBar";
import { Collapse } from "reactstrap";
import DeliveryCalander from "../../components/DeliveryCalander";
import BarGraph from "../../components/BarGraph";
import Shipment from "../../components/Shipment";
import { Helmet } from "react-helmet";
import NavBar from "../../components/NavBar";
import dayofWeek from "../../static/todaysDate";
import dayOfMonth from "../../static/todaysDate";
import curMonth from "../../static/todaysDate";
import curYear from "../../static/todaysDate";
import todaysDate from "../../static/todaysDate";
import deliverycard from "../../assets/images/svgs/deliverycard.svg";
import hrmcard from "../../assets/images/svgs/hrmcard.svg";
import returncard from "../../assets/images/svgs/returncard.svg";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div>
        <NavBar name={<ActiveStaff />} />
        <div className="d-md-flex dashboard">
          {/* LEFT */}
          <div className="col-md-3 d-none d-md-block left">
            <SideBar />
          </div>

          {/* MIDDLE */}
          <div className="col-md-9 px-3 middle">
            <div className="d-block d-md-flex mt-md-4 mt-2 justify-content-between align-items-center">
              <div>
                <h5 className="mt-2 text-deep">Dashboard</h5>
                <p className="small gray-text">
                  <span className="text-primary">{dayOfWeek}, </span>
                  {dayOfMonth} {curMonth}, {curYear}
                </p>
              </div>
              <div className="mx-4 pb-4 d-none d-md-block">
                <h5 className="text-deep">Company Name</h5>
                <h5 className="small light-deep">Orange Drugs Limited</h5>
              </div>
            </div>

            <ItemsCard />

            <div className="mb-4 ">
              <CurvedChat />
            </div>
            {/* <div className="row my-3 gy-lg-0 gy-3 reverse">
              <div className="col-lg-6">
                <DeliveryCalander />
              </div>
              <div className="col-lg-6 ">
                <BarGraph />
              </div>
            </div> */}

            <Shipment name="Awaiting Shipments" />
          </div>

          {/* RIGHT */}
          <div className="col-md-3 d-block right ">
            <div className="card border-0">
              <div className="mx-4 pb-4">
                <h5 className="mt-5 text-deep">Company Name</h5>
                <h5 className="small light-deep">Orange Drugs Limited</h5>
              </div>
            </div>
            <div className="icons py-2">
              <Link to="" className="card circle rounded-circle border-0 disc">
                <img src={notification} alt="" width={20} />
                <div
                  className="rounded-circle"
                  style={{ width: "5px", height: "5px" }}
                ></div>
              </Link>
              <Link
                to="/settings"
                className="card circle rounded-circle border-0"
              >
                <img src={settings} alt="" width={20} />
              </Link>
              <Link to="" className="card circle rounded-circle border-0">
                <img src={circleperson} alt="" width={20} />
              </Link>
              <Link
                to="/login"
                className="card circle rounded-circle border-0"
                style={{ backgroundColor: "#F15744" }}
              >
                <img src={continueicon} alt="" width={20} />
              </Link>
            </div>
            <div className="mx-4 mt-4">
              <h5 className="text-deep">Active Staff</h5>
              <p className="gray-text">
                You have <b>57</b> staff online
              </p>
              <ActiveStaff />
              <Collapse isOpen={isOpen}>
                <ActiveStaff />
              </Collapse>
              <button
                className="btn mb-4 mx-auto d-block w-75 rounded-pill border-0"
                style={{
                  backgroundColor: "#c1bbeb",
                  color: "#4d44b5",
                  fontWeight: "bold",
                }}
                onClick={handleClick}
              >
                {isOpen ? "View Less" : "View More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
