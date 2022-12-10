import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import UserSalesReportTable from "../../components/UserSalesReportTable";
import CustomerMapLocation from "../../components/RevenueDashboardComponents/CustomerMapLocation";
import { BsChevronDown } from "react-icons/bs";
import location from "../../assets/icons/svg/carbon_location.svg";
import CustomerMaps from "../../components/RevenueDashboardComponents/CustomerMaps";
import RevenueCardHeader from "../../components/RevenueDashboardComponents/RevenueCardHeader";
import GoogleMapDisplay from "../../GoogleMap/GoogleMap";
import InventoryReportBottom from "../../components/RevenueDashboardComponents/InventoryReportBottom";
import MoreMenu from "../../components/RevenueDashboardComponents/MoreMenu";
import { useState } from "react";
import CustomerMapTable from "../../components/RevenueDashboardComponents/CustomerMapTable";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";

const CustomerMapLocationDetails = () => {
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
        <title>Customer Map Location Details</title>
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
                  breadcrumb="/reports/report-dashboard"
                  hasStyles={true}
                  width="11.5rem"
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="d-md-flex flex-row-reverse  mx-3 mt-5">
            <div className="col-md-3">
              <div className="d-flex flex-column mx-md-3 mb-md-0 mb-3">
                <button className="btn shadow  mb-3 small d-flex justify-content-between align-items-center bg-white border-0">
                  <div className="d-flex align-items-center">
                    <img src={location} alt="" width={20} />
                    <span>GHANA</span>
                  </div>
                  <BsChevronDown />
                </button>
                <button className="btn shadow small d-flex justify-content-between align-items-center bg-white border-0">
                  <div className="d-flex align-items-center">
                    <img src={location} alt="" width={20} />
                    <span className="gray-text">Select Region</span>
                  </div>
                  <BsChevronDown />
                </button>
              </div>
            </div>
            <div className="col-md-9">
              <div
                className="card border-0 shadow"
                style={{ borderRadius: "15px" }}
              >
                <RevenueCardHeader
                  header="Customers Map Location"
                  subheader="Report Center"
                  handleClick={handleClick}
                />
                <MoreMenu isOpen={isOpen} />
                <div className="row m-2">
                  <div className="col-md-3">
                    <CustomerMaps />
                    <CustomerMaps />
                    <CustomerMaps />
                  </div>
                  <div className="col-md-9">
                    <div className="card-border-0 customer_map__location_height">
                      <GoogleMapDisplay />
                    </div>
                  </div>
                </div>
                <InventoryReportBottom />
              </div>
            </div>
          </div>

          <div className="mt-4 mx-3">
            <div className="card border-0">
              <div className="d-md-flex justify-content-between align-items-center m-3">
                <div className="d-flex">
                  <div>
                    <h6 className="text-deep">Customers Map</h6>
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
          {/* End of Table */}

          <div className="mx-3 mb-5">
            <CustomerMapTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerMapLocationDetails;
