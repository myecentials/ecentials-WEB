import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import DateMenu from "../../components/RevenueDashboardComponents/DateMenu";
import ReportRevenueCard from "../../components/RevenueDashboardComponents/ReportRevenueCard";
import ReportInventoryCard from "../../components/RevenueDashboardComponents/ReportInventoryCard";
import ReportActivityMonitorCard from "../../components/RevenueDashboardComponents/ReportActivityMonitorCard";
import RevenueDeliveryCard from "../../components/RevenueDashboardComponents/RevenueDeliveryCard";
import ReportCustomerReviesCard from "../../components/RevenueDashboardComponents/ReportCustomerReviesCard";
import CustomerMapLocation from "../../components/RevenueDashboardComponents/CustomerMapLocation";
import RevenueUser from "../../components/RevenueDashboardComponents/RevenueUser";
import { Collapse } from "reactstrap";
import { Calendar } from "react-calendar";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";
const ReportDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
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
        <title>Report Dashboard</title>
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
                  name="Report Dashboard"
                  breadcrumb=""
                  width="11.5rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-md-3 mx-2 report">
            <DateMenu handleClick={handleClick} />
            <Collapse isOpen={isOpen}>
              <div className="card border-0  datemenu p-4 shadow">
                <div className="d-lg-flex justify-content-center align-items-center">
                  <Calendar className="border-0 mx-lg-4" />
                  <Calendar className="border-0 mt-lg-0 mt-4" />
                </div>
              </div>
            </Collapse>
            <div className="row gy-lg-0 gy-3 mt-4">
              <div className="col-lg-6">
                <ReportRevenueCard />
              </div>
              <div className="col-lg-3">
                <ReportInventoryCard />
              </div>
              <div className="col-lg-3">
                <ReportActivityMonitorCard />
              </div>
            </div>
            <div className="row gy-lg-0 gy-3 mt-4">
              <div className="col-lg-3">
                <RevenueDeliveryCard />
              </div>
              <div className="col-lg-3">
                <ReportCustomerReviesCard />
              </div>
              <div className="col-lg-6">
                <CustomerMapLocation />
              </div>
            </div>
            <div className="row mt-4 mb-4">
              <div className="col-lg-3">
                <RevenueUser />
              </div>
              <div className="col-lg-3"></div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportDashboard;
