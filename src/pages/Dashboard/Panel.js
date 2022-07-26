import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SettingsCard from "../../components/SettingsCard";
import SideBar from "../../components/SideBar";
import danger from "../../assets/icons/svg/danger.svg";
import { Helmet } from "react-helmet";
import logo from "../../logo.svg";
import CustomeNav from "../../components/CustomeNav";

const Panel = () => {
  return (
    <>
      <CustomeNav />
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <div className="d-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-between align-items-center mt-md-5">
            <div className="mx-4">
              <BreadCrumb name="Settings" breadcrumb="/settings" />
            </div>{" "}
            <div className="d-none">
              <NavIcons />
            </div>
          </div>
          <div className="row mx-3 my-md-5 gy-md-0 gy-4 mt-3">
            <div className="col-md-4">
              <SettingsCard />
            </div>
            <div className="col-md-8" style={{ borderRadius: "10px" }}>
              <div className="bg-white pb-5" style={{ borderRadius: "10px" }}>
                <h6 className="pt-5 px-3">Panel Settings</h6>
                <hr className="my-0" />
                <p className="mx-3 mt-4">Appearance</p>
                <select
                  name=""
                  id=""
                  className="form-control mt-3 mx-3 w-md-50 w-75"
                >
                  <option value="">Use device theme</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Panel;
