import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import mapimage from "../../assets/icons/svg/map.svg";
import drug1 from "../../assets/images/png/oraddrug1.png";
import drug2 from "../../assets/images/png/oraddrug2.png";
import morevert from "../../assets/icons/svg/morevert.svg";
import AllCouriers from "../../components/AllCouriers";
import OntripCouriers from "../../components/OntripCouriers";
import AvailableCouriers from "../../components/AvailableCouriers";
import distance from "../../assets/icons/svg/distance.svg";
import timespent from "../../assets/icons/svg/timespent.svg";
import mode from "../../assets/icons/svg/mode.svg";
import GoogleMapDisplay from "../../GoogleMap/GoogleMap";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Header from "../../components/Header";

const UnassignedOrderId = () => {
  const [display1, setDisplay1] = useState(<AllCouriers />);

  const handleClick = (click) => {
    if (click === "assigned") {
      setDisplay1(<OntripCouriers />);
    } else if (click === "unassigned") {
      setDisplay1(<AvailableCouriers />);
    } else if (click === "all") {
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
        <title>Deliver Orders</title>
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
                <BreadOutlined name="Delivery" breadcrumb="/delivery/orders" />
                <BreadCrumb name="Orders" breadcrumb="" />
              </div>
            </div>
            <div className="mx-4 d-none d-md-block">
              <h5 className="text-deep">Company Name</h5>
              <h5 className="small light-deep">Orange Drugs Limited</h5>
            </div>
          </div>

          <div className="mt-4 mx-md-3 mx-2 mb-5">
            <div className="row main-container gy-lg-0 gy-4">
              <div className="col-lg-4">
                <div
                  className="bg-white"
                  style={{
                    borderRadius: "40px",
                  }}
                >
                  <div className="py-4 px-3">
                    <h4 className="text-deep">#ORD-5494</h4>
                    <p className="small deliverer-name text-purple">
                      07/07.2022 3:15PM
                    </p>
                    <div className="row d-border">
                      <div className="col-8">
                        <div className="d-flex">
                          <img src={mapimage} alt="" width={15} />
                          <span className="small deliverer-name text-purple mx-2">
                            Accra, 27 New Ave
                          </span>
                        </div>
                      </div>
                      <h4 className="col-4 dl-border text-center my-0 text-purple">
                        14'
                      </h4>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-between col-left">
                    <div className="mb-md-5 pb-md-5">
                      <Table borderless responsive className="d-border">
                        <tbody>
                          <tr>
                            <td>
                              <img src={drug1} alt="" />
                            </td>
                            <td>
                              <div className="d-flex flex-column deliverer-name text-purple">
                                <span>Acetaminophen</span>
                                <span>350mg</span>
                              </div>
                            </td>
                            <td className="small deliverer-name">X5</td>
                            <td className="small deliverer-name text-nowrap">
                              GHC 100
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img src={drug2} alt="" />
                            </td>
                            <td>
                              <div className="d-flex flex-column deliverer-name text-purple">
                                <span>Acetaminophen</span>
                                <span>350mg</span>
                              </div>
                            </td>
                            <td className="small deliverer-name">X5</td>
                            <td className="small deliverer-name text-nowrap">
                              GHC 100
                            </td>
                          </tr>
                        </tbody>
                      </Table>

                      <h5 className="total-price mx-2 text-end text-purple">
                        GHC 200
                      </h5>
                    </div>

                    {/*  */}

                    <div className="col-bottom-container">
                      <div>
                        {" "}
                        <div className="courier-img rounded-circle">
                          <CircularProgressbarWithChildren
                            styles={buildStyles({
                              trailColor: "#D6E4ED",
                              pathColor: "#0097F7",
                            })}
                            value={80}
                            strokeWidth={6}
                          ></CircularProgressbarWithChildren>
                        </div>
                        <div className="d-flex justify-content-end align-items-end">
                          <img src={morevert} alt="" className="mt-3 mx-3" />
                        </div>
                      </div>
                      <div className="col-bottom  text-purple">
                        <div className="mx-2 mt-5">
                          <h6>Andrews Opoku</h6>
                          <p className="small deliverer-name">
                            Active . On way to client
                          </p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mx-auto d-block">
                          <div className="py-3 col-card d-flex flex-column justify-conntent-center align-items-center">
                            <img src={distance} alt="" width={12} />
                            <h6 className="mt-3">2.7</h6>
                            <p className="small deliverer-name">Distance</p>
                          </div>{" "}
                          <div className="py-3 col-card mx-3 d-flex flex-column justify-conntent-center align-items-center">
                            <img src={timespent} alt="" width={12} />
                            <h6 className="mt-3">14 min</h6>
                            <p className="small deliverer-name text-nowrap">
                              Time spent
                            </p>
                          </div>{" "}
                          <div className="py-3 col-card d-flex flex-column justify-conntent-center align-items-center">
                            <img src={mode} alt="" width={12} />
                            <h6 className="mt-3">Car</h6>
                            <p className="small deliverer-name">Mode</p>
                          </div>{" "}
                        </div>
                        <div className="my-2 d-flex justify-content-center">
                          <Link
                            to="/delivery/orders/assign/bol"
                            className="btn rounded-pill ms-bg text-white  px-5"
                          >
                            BOL
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/*  */}
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
                    <div>
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

          {/*  */}
        </div>
      </div>
    </>
  );
};

export default UnassignedOrderId;
