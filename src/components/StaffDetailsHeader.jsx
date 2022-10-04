import React from "react";
import morevert from "../assets/icons/svg/morevert.svg";
import { Link } from "react-router-dom";
import location from "../assets/icons/svg/location.svg";
import phone from "../assets/icons/svg/phone.svg";
import emailwhite from "../assets/icons/svg/emailwhite.svg";
const StaffDetailsHeader = () => {
  return (
    <div className="card border-0 rounded pb-3">
      <div
        className="card-header-container"
        style={{ height: "11rem", width: "100%" }}
      >
        <div
          className="card-header-img ms-bg"
          style={{
            height: "8rem",
            width: "100%",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <div className="half-circle">
            <svg
              width="262"
              height="110"
              viewBox="0 0 262 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0"
                y="0"
                width="261"
                height="275.13"
                rx="130.5"
                fill="#FCC43E"
              />
            </svg>
          </div>
          <div className="small-half">
            <svg
              width="262"
              height="64"
              viewBox="0 0 262 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.0651855"
                width="261"
                height="275.13"
                rx="130.5"
                fill="#FB7D5B"
              />
            </svg>
          </div>
        </div>
        <div className="circle rounded-circle bg-user user-img"></div>

        <Link to="/hrm/staff/name/edit">
          <img src={morevert} alt="" className="morevert" />
        </Link>
      </div>
      <div className="staff-name mx-4">
        <h6 className="text-deep">Andrews Opoku</h6>
        <p className="text-deep small mt-0">Staff</p>
      </div>
      <div className="d-lg-flex grid-2 mx-lg-0 mx-3 justify-content-md-around">
        <div className="d-flex justify-content-lg-center  align-items-center">
          <div className="rounded-circle circle staff-icons">
            <img src={location} alt="" />
          </div>
          <span className="text-deep mx-2 small">Accra, Ghana</span>
        </div>
        <div className="d-flex my-lg-0 my-3 justify-content-lg-center  align-items-center">
          <div className="rounded-circle circle staff-icons">
            <img src={phone} alt="" />
          </div>
          <span className="text-deep mx-2 small">+233 54 509 8438</span>
        </div>

        <div className="d-flex justify-content-lg-center  align-items-center">
          <div className="rounded-circle circle staff-icons">
            <img src={emailwhite} alt="" />
          </div>
          <span className="text-deep mx-2 small">aopoku255@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailsHeader;
