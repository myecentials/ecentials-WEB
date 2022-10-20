import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import menulist from "../../assets/icons/svg/menulist.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import calander from "../../assets/icons/svg/calendar.svg";
import { BsChevronDown } from "react-icons/bs";
import RevenueCardHeader from "../../components/RevenueDashboardComponents/RevenueCardHeader";
import InventoryPieChart from "../../components/RevenueDashboardComponents/InventoryPieChart";
import InventoryReportHeader from "../../components/RevenueDashboardComponents/InventoryReportHeader";
import InventoryLineChart from "../../components/RevenueDashboardComponents/InventoryLineChart";
import RevenueCardBottom from "../../components/RevenueDashboardComponents/RevenueCardBottom";
import InventoryReportBottom from "../../components/RevenueDashboardComponents/InventoryReportBottom";
import InventtoryBarChart from "../../components/RevenueDashboardComponents/InventoryBarChart";
import MoreMenu from "../../components/RevenueDashboardComponents/MoreMenu";
import { useState } from "react";
import InventoryReportTable from "../../components/RevenueDashboardComponents/InventoryReportTable";
import DateMenu from "../../components/RevenueDashboardComponents/DateMenu";
import { Collapse } from "reactstrap";
import { Calendar } from "react-calendar";
import Header from "../../components/Header";

const InventoryReport = () => {
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
              <h6 className="mt-2 text-deep">Settings</h6>
              <p className="small gray-text">
                <span className="text-primary">{dayOfWeek}, </span>
                {dayOfMonth} {curMonth}, {curYear}
              </p>
              <div className="d-flex flex-wrap">
                <BreadCrumb
                  name="Report Dashboard"
                  breadcrumb="/reports/report-dashboard"
                  width="11.5rem"
                />
                <BreadCrumb
                  name="Inventory Report"
                  breadcrumb=""
                  width="11rem"
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
            <div className="mt-5">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="text-deep">Inventory Report</h6>
                <button className="btn shadow-sm bg-white border-0 small d-flex justify-content-center align-items-center">
                  <img src={calander} alt="" width={15} />
                  <span className="mx-2">12 Oct 2022</span>
                  <BsChevronDown />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 mx-3">
            <div className="row gy-lg-0 gy-3">
              <div className="col-lg-4 ">
                <div>
                  <div className="inventory_report__card shadow">
                    <InventoryReportHeader header="Inventory" />

                    <div className="inventory_report__height">
                      <InventoryLineChart />
                    </div>
                    <InventoryReportBottom
                      text="CHART TEXT"
                      color1="#6C60FF"
                      data1="PURCHASE"
                      color2="#CE2A96"
                      data2="SALES"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 ">
                <div className="inventory_report__card shadow">
                  <RevenueCardHeader
                    header="Inventory Overview"
                    subheader="Category"
                    handleClick={handleClick}
                  />
                  <MoreMenu isOpen={isOpen} />
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="inventory_report__height">
                      <InventoryPieChart />
                    </div>
                  </div>
                  <InventoryReportBottom />
                </div>
              </div>
              <div className="col-lg-4 ">
                <div className="inventory_report__card shadow">
                  <InventoryReportHeader header="Profit & Loss" />
                  <div className="inventory_report__height">
                    <InventtoryBarChart />
                  </div>
                  <InventoryReportBottom
                    text="CHART TEXT"
                    data1="PROFIT"
                    data2="LOSS"
                    color1="#4BFF5D"
                    color2="#A694FD"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 mx-3">
            <div className="card border-0">
              <div className="d-md-flex justify-content-between align-items-center m-3">
                <div className="d-flex">
                  <div>
                    <h6 className="text-deep">Sales Report User</h6>
                    <p className="gray-text small">
                      More than 400+ new reviews
                    </p>
                  </div>
                </div>
                <div className="d-flex">
                  <button className="btn-refresh">Refresh</button>
                  <button className="btn-export">Export as PDF</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-3 mb-5">
            <InventoryReportTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryReport;
