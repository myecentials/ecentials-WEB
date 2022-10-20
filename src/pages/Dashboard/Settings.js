import React, { useState } from "react";
import { Helmet } from "react-helmet";
import BreadCrumb from "../../components/BreadCrumb";
import CustomeNav from "../../components/CustomeNav";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import setting from "../../assets/icons/svg/settings.svg";
import database from "../../assets/icons/svg/database.svg";
import panel from "../../assets/icons/svg/panel.svg";
import language from "../../assets/icons/svg/language.svg";
import { Link } from "react-router-dom";

import GeneralSettingsForm from "../../components/GeneralSettingsForm";
import DbSettings from "../../components/DbSettings";
import PanelSettings from "../../components/PanelSettings";
import LangSettings from "../../components/LangSettings";
import Header from "../../components/Header";

const Settings = () => {
  const [display, setDisplay] = useState(<GeneralSettingsForm />);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const handleClick = (item) => {
    if (item === "general") {
      setDisplay(<GeneralSettingsForm />);
      setShow(true);
      setShow1(false);
      setShow2(false);
      setShow3(false);
    } else if (item === "database") {
      setDisplay(<DbSettings />);
      setShow(false);
      setShow1(true);
      setShow2(false);
      setShow3(false);
    } else if (item === "panel") {
      setDisplay(<PanelSettings />);
      setShow(false);
      setShow1(false);
      setShow2(true);
      setShow3(false);
    } else {
      setDisplay(<LangSettings />);
      setShow(false);
      setShow1(false);
      setShow2(false);
      setShow3(true);
    }
    return display;
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
      <CustomeNav />
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <Header />
      <div className="d-flex">
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
              <div className="">
                <BreadCrumb
                  name="Settings"
                  breadcrumb="/settings"
                  hasStyles={true}
                />
              </div>
            </div>
            <div className="mx-4 d-none d-md-block">
              <h5 className="text-deep">Company Name</h5>
              <h5 className="small light-deep">Orange Drugs Limited</h5>
            </div>
          </div>
          {/* <div className="d-flex justify-content-between align-items-center"></div> */}
          <div className="row mx-3 my-md-4 gy-md-0 gy-4">
            <div className="col-md-4 ">
              {/* BEGIN OF SETTTINGS CARD */}
              <div className="bg-white pb-4" style={{ borderRadius: "10px" }}>
                <h6 className="pt-4 px-3">Settings</h6>
                <hr className="my-0" />
                <div
                  className={
                    show ? "links py-3 bord settings-bg" : "links py-3 bord"
                  }
                >
                  <Link to="" className="mx-3 text-wrap">
                    <img src={setting} alt="" width={25} />
                    <span
                      className="gray-text mx-2"
                      onClick={() => handleClick("general")}
                    >
                      General Settings
                    </span>
                  </Link>
                </div>
                <div
                  className={
                    show1 ? "links py-3 bord settings-bg" : "links py-3 bord"
                  }
                >
                  <Link to="" className="mx-3 text-wrap">
                    <img src={database} alt="" width={25} />
                    <span
                      className="gray-text mx-2"
                      onClick={() => handleClick("database")}
                    >
                      Import Database
                    </span>
                  </Link>
                </div>
                <div
                  className={
                    show2 ? "links py-3 bord settings-bg" : "links py-3 bord"
                  }
                >
                  <Link to="" className="mx-3 text-wrap ">
                    <img src={panel} alt="" width={25} />
                    <span
                      className="gray-text mx-2 "
                      onClick={() => handleClick("panel")}
                    >
                      Panel Settings
                    </span>
                  </Link>
                </div>
                <div
                  className={
                    show3 ? "links py-3 bord settings-bg" : "links py-3 bord"
                  }
                >
                  <Link to="" className="mx-3 text-wrap">
                    <img src={language} alt="" width={25} />
                    <span
                      className="gray-text mx-2"
                      onClick={() => handleClick()}
                    >
                      Language
                    </span>
                  </Link>
                </div>
              </div>
              {/* END OF SETTINGS  CARD */}
            </div>
            <div className="col-md-8" style={{ borderRadius: "10px" }}>
              {display}
              {/* END OF GENERAAL */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
