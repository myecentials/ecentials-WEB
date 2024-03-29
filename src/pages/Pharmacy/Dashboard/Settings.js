import React, { useState } from "react";
import { Helmet } from "react-helmet";
import BreadCrumb from "../../../components/BreadCrumb";
// import CustomeNav from "../../../components/CustomeNav";
// import NavIcons from "../../../components/NavIcons";
// import SideBar from "../../../components/SideBar";
import setting from "../../../assets/icons/svg/settings.svg";
import database from "../../../assets/icons/svg/database.svg";
import panel from "../../../assets/icons/svg/panel.svg";
import language from "../../../assets/icons/svg/language.svg";
import card from "../../../assets/images/svgs/card.svg";
import { Link } from "react-router-dom";

import GeneralSettingsForm from "../../../components/Pharmacy/Settings/GeneralSettingsForm";
import DbSettings from "../../../components/Pharmacy/Settings/DbSettings";
import PanelSettings from "../../../components/Pharmacy/Settings/PanelSettings";
import LangSettings from "../../../components/Pharmacy/Settings/LangSettings";
// import Header from "../../../components/Header";
import PharmacyName from "../../../components/PharmacyName";
// import { useEffect } from "react";
// import axios from "../../../config/api/axios";
import DateHeader from "../../../components/DateHeader";
import Billing from "../../../components/Pharmacy/Settings/Billing";

const Settings = () => {
  const [display, setDisplay] = useState(<GeneralSettingsForm />);
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const handleClick = (item) => {
    if (item === "general") {
      setDisplay(<GeneralSettingsForm />);
      setShow(true);
      setShow1(false);
      setShow2(false);
      setShow3(false);
      setShow4(false);
    } else if (item === "database") {
      setDisplay(<DbSettings />);
      setShow(false);
      setShow1(true);
      setShow2(false);
      setShow3(false);
      setShow4(false);
    } else if (item === "panel") {
      setDisplay(<PanelSettings />);
      setShow(false);
      setShow1(false);
      setShow2(true);
      setShow3(false);
      setShow4(false);
    } else if(item === "language") {
      setDisplay(<LangSettings />);
      setShow(false);
      setShow1(false);
      setShow2(false);
      setShow3(true);
      setShow4(false);
    }
    else {
      setDisplay(<Billing />);
      setShow(false);
      setShow1(false);
      setShow2(false);
      setShow3(false);
      setShow4(true);
    }
    return display;
  };
  
  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>

        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">Settings</h6>
              <DateHeader/>
              <div className="">
                <BreadCrumb
                  name="Settings"
                  breadcrumb="/pharmacy/settings"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
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
                      onClick={() => handleClick("language")}
                    >
                      Language
                    </span>
                  </Link>
                </div>
                <div
                  className={
                    show4 ? "links py-3 bord settings-bg" : "links py-3 bord"
                  }
                >
                  <Link to="" className="mx-3 text-wrap">
                    <img src={card} alt="" width={25} />
                    <span
                      className="gray-text mx-2"
                      onClick={() => handleClick()}
                    >
                      Billing and payments
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
    </>
  );
};

export default Settings;
