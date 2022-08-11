import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import StaffCard from "../../components/StaffCard";
import BreadOutlined from "../../components/BreadOutlined";
import SearchBar from "../../components/SearchBar";
import activeStaff from "../../static/activeStaff";
import leftchev from "../../assets/icons/svg/leftchev.svg";
import rightchev from "../../assets/icons/svg/rightchev.svg";
import chevfilldown from "../../assets/icons/svg/chevfilldown.svg";
import add from "../../assets/icons/svg/add.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
const Staff = () => {
  return (
    <>
      <Helmet>
        <title>Staff</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadOutlined name="HRM" breadcrumb="/hrm/staff" />
              <BreadCrumb
                name="Staff"
                breadcrumb="/hrm/staff"
                hasStyles={true}
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>
          <div className="d-md-flex justify-content-between mt-4">
            <div className="mx-3">
              <SearchBar />
            </div>
            <div className="d-flex justify-content-evenly  mt-md-0 mt-3">
              <button
                className="btn outline-btn rounded-pill px-4 text-nowrap"
                style={{ color: "#4D44B5" }}
              >
                Newest{" "}
                <img src={chevfilldown} alt="" width={15} className="mx-2" />
              </button>
              <Link
                to="/hrm/staff/add-new-staff"
                className="btn mx-md-3 signup-btn rounded-pill px-4 text-nowrap"
              >
                <img src={add} alt="" width={10} className="mx-2" /> New Staff
              </Link>
            </div>
          </div>
          <div className="row mt-md-5 mx-3 pb-5 d-grid-3">
            {activeStaff.map(({ image, name, field }, mindex) => (
              <div className="col-lg-3 gy-3 " key={mindex}>
                <StaffCard
                  link="/hrm/staff/name"
                  image={image}
                  name={name.findName()}
                  field={field}
                />
              </div>
            ))}
          </div>
          <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
            <p className="small text-center">
              Showing <span className="text-lightdeep">1-16</span> from{" "}
              <span className="text-lightdeep">100</span> data
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <img src={leftchev} alt="" className="mx-3" />
              <div className="circle rounded-circle mail circle-bgdeep text-white">
                1
              </div>
              <div className="circle rounded-circle mail mx-2">2</div>
              <div className="circle rounded-circle mail">3</div>
              <img src={rightchev} alt="" className="mx-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staff;
