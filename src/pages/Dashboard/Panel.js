import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SettingsCard from "../../components/SettingsCard";
import SideBar from "../../components/SideBar";
import danger from "../../assets/icons/svg/danger.svg";

import logo from "../../logo.svg";

const Panel = () => {
  return (
    <div className="d-flex">
      <div className="col-md-3 bg-white left">
        <SideBar />
      </div>
      <div className="col-md-9 middle">
        <div className="d-flex justify-content-between align-items-center mt-md-5">
          <BreadCrumb name="Settings" breadcrumb="/settings" />
          <NavIcons />
        </div>
        <div className="row mx-3 my-md-5">
          <div className="col-md-4">
            <SettingsCard />
          </div>
          <div className="col-md-8" style={{ borderRadius: "10px" }}>
            <div className="bg-white pb-5" style={{ borderRadius: "10px" }}>
              <h6 className="pt-5 px-3">Panel Settings</h6>
              <hr className="my-0" />
              <p className="mx-3 mt-4">Appearance</p>
              <select name="" id="" className="form-control mt-3 mx-3 w-50">
                <option value="">Use device theme</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
