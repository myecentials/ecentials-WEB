import React, { useEffect } from "react";
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
import NavIcons from "../../components/NavIcons";
import { BsSearch } from "react-icons/bs";
import Search from "../../components/Search";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";
import axios from "../../config/api/axios";
import product from "../../assets/images/svgs/Finance.svg";
import hrm from "../../assets/images/svgs/hrm.svg";
import invoice from "../../assets/images/svgs/invoices.svg";
import orders from "../../assets/images/svgs/food.svg";
import returns from "../../assets/images/svgs/returns.svg";
import sales from "../../assets/images/svgs/sales.svg";
import customers from "../../assets/icons/svg/customer.svg";

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
      <div className="station"></div>
      <Header />
      <NavBar />
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
              <div className="d-md-none">
                <Search />
              </div>
            </div>
            <PharmacyName />
          </div>

          <ItemsCard />

          <div className="cards_grid__container mt-3">
            <Link
              to="/products"
              className="cards_grid d-flex justify-content-center align-items-center bg-white"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: "#F0F5FB",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <div>
                  <img src={product} width={25} alt="" />
                </div>
              </div>
              <div className="text-deep mx-2">Products</div>
            </Link>
            <Link
              to="/orders"
              className="cards_grid d-flex justify-content-center align-items-center bg-white"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: "#F0F5FB",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <div>
                  <img src={orders} width={25} alt="" />
                </div>
              </div>
              <div className="text-deep mx-2">Orders</div>
            </Link>
            <Link
              to="/invoices/invoice-pos"
              className="cards_grid d-flex justify-content-center align-items-center bg-white"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: "#F0F5FB",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <div>
                  <img src={invoice} width={25} alt="" />
                </div>
              </div>
              <div className="text-deep mx-2">Invoice</div>
            </Link>
            <Link
              to="/sales"
              className="cards_grid d-flex justify-content-center align-items-center bg-white"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: "#F0F5FB",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <div>
                  <img src={sales} width={25} alt="" />
                </div>
              </div>
              <div className="text-deep mx-2">Sales</div>
            </Link>
            <Link
              to="/returns/add-return"
              className="cards_grid d-flex justify-content-center align-items-center bg-white"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: "#F0F5FB",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <div>
                  <img src={returns} width={25} alt="" />
                </div>
              </div>
              <div className="text-deep mx-2">Return</div>
            </Link>
            <Link
              to="/hrm/staff"
              className="cards_grid d-flex justify-content-center align-items-center bg-white"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  backgroundColor: "#F0F5FB",
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <div>
                  <img src={hrm} width={25} alt="" />
                </div>
              </div>
              <div className="text-deep mx-2">HRM</div>
            </Link>
          </div>

          <div className="my-4 bg-white rounded">
            <div className=" mx-4 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p
                    className="my-0 py-0 text-secondary"
                    style={{ fontSize: "12px" }}
                  >
                    OVERVIEW
                  </p>
                  <h6 className="text-deep my-0 py-0">Sales graph</h6>
                </div>
                  
                  <div>
                  <p
                    className="my-0 py-0 text-secondary"
                    style={{ fontSize: "12px" }}
                  >
                    CURRENT MONTH
                  </p>
                  <h6 className="text-deep my-0 py-0">{new Date().toLocaleDateString("en-US", { month: "long" })}</h6>
                </div>
              </div>
            </div>
            <hr className="mt-0 py-0" />
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

          {/* <Shipment name="Awaiting Shipments" /> */}
        </div>

        {/* RIGHT */}
      </div>
    </>
  );
};

export default Dashboard;
