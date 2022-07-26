import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SettingsCard from "../../components/SettingsCard";
import SideBar from "../../components/SideBar";
import danger from "../../assets/icons/svg/danger.svg";

import logo from "../../logo.svg";
import BreadOutlined from "../../components/BreadOutlined";
import SearchBar from "../../components/SearchBar";

const Staff = () => {
  return (
    <div className="d-flex">
      <div className="col-md-3 bg-white left">
        <SideBar />
      </div>
      <div className="col-md-9 middle">
        <div className="d-flex justify-content-between align-items-center mt-md-5">
          <div className="d-flex mx-4">
            <BreadOutlined name="HRM" breadcrumb="/hrm/staff" />
            <BreadCrumb name="Staff" breadcrumb="/hrm/staff" />
          </div>
          <NavIcons />
        </div>
        <div className="d-flex justify-content-between mt-4">
          <div className="mx-3">
            <SearchBar />
          </div>
          <div className="d-flex">
            <button
              className="btn outline-btn rounded-pill px-5"
              style={{ color: "#4D44B5" }}
            >
              Newest
            </button>
            <button className="btn mx-3 signup-btn rounded-pill px-5">
              Newest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
