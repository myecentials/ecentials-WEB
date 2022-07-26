import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SettingsCard from "../../components/SettingsCard";
import SideBar from "../../components/SideBar";
import danger from "../../assets/icons/svg/danger.svg";

import logo from "../../logo.svg";

const Database = () => {
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
              <h6 className="pt-5 px-3">Restore Database</h6>
              <hr className="my-0" />
              <div className="text-danger mt-3 mx-3 d-flex  rounded bg-warn">
                <img src={danger} alt="" className="mx-3" />
                <p className="my-2">
                  Note: If you import any sql, previous data will be destroyed
                </p>
              </div>
              <div class="row g-3 align-items-center mt-2 mx-3">
                <div class="col-auto">
                  <label for="file" class="col-form-label">
                    Import*
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="file"
                    class="form-control "
                    aria-describedby="passwordHelpInline"
                  />
                </div>
                <div class="col-auto">
                  <input
                    type="button"
                    className="btn btn-primary"
                    value="Import"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Database;
