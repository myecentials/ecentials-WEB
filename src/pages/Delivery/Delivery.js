import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import BreadOutlined from "../../components/BreadOutlined";
import AllOrders from "../../components/AllOrders";
import AssignedOrder from "../../components/AssignedOrders";
import UnassignedOrder from "../../components/UnassignedOrder";
import AllCouriers from "../../components/AllCouriers";
import AvailableCouriers from "../../components/AvailableCouriers";
import OntripCouriers from "../../components/OntripCouriers";
import GoogleMapDisplay from "../../GoogleMap/GoogleMap";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";

const Delivery = () => {
  const [display, setDisplay] = useState(<AllOrders />);
  const [display1, setDisplay1] = useState(<AllCouriers />);

  const handleClick = (click) => {
    if (click === "assigned") {
      setDisplay(<AssignedOrder />);
      setDisplay1(<OntripCouriers />);
    } else if (click === "unassigned") {
      setDisplay(<UnassignedOrder />);
      setDisplay1(<AvailableCouriers />);
    } else if (click === "all") {
      setDisplay(<AllOrders />);
      setDisplay1(<AllCouriers />);
    }
  };

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
        <title>Delivery Orders</title>
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
                <BreadOutlined name="Delivery" breadcrumb="" />
                <BreadCrumb name="Orders" breadcrumb="" hasStyles={true} />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <div className="row gy-lg-0 gy-4 mb-5">
              <div className="col-lg-4">
                <div
                  className="px-3 py-4 bg-white "
                  style={{
                    borderRadius: "40px",
                  }}
                >
                  <h4 className="text-deep">Order</h4>
                  <div className="d-flex my-3 small justify-content-start align-items-start">
                    <Link
                      to=""
                      className="light-purple"
                      onClick={() => handleClick("assigned")}
                    >
                      Assigned
                    </Link>
                    <Link
                      to=""
                      className="light-purple mx-2"
                      onClick={() => handleClick("unassigned")}
                    >
                      Unassigned
                    </Link>
                    <Link
                      to=""
                      className="light-purple"
                      onClick={() => handleClick("all")}
                    >
                      All
                    </Link>
                  </div>
                  <div className="my-4 delivery_orders__container">
                    {display}
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div
                  className="bg-white px-2 py-4 row"
                  style={{
                    borderRadius: "40px",
                  }}
                >
                  <div className="col-sm-4">
                    <div className="">
                      <h4 className="text-deep">Couriers</h4>
                      <div className="d-flex my-3 small justify-content-start align-items-start">
                        <Link
                          to=""
                          className="light-purple"
                          onClick={() => handleClick("unassigned")}
                        >
                          Available
                        </Link>
                        <Link
                          to=""
                          className="light-purple text-nowrap"
                          onClick={() => handleClick("assigned")}
                        >
                          On-trip
                        </Link>
                        <Link
                          to=""
                          className="light-purple"
                          onClick={() => handleClick("all")}
                        >
                          All
                        </Link>
                      </div>
                      {display1}
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div
                      className=""
                      style={{
                        borderRadius: "40px",
                      }}
                    >
                      <GoogleMapDisplay />
                    </div>
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

export default Delivery;
