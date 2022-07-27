import React from "react";
import morevert from "../assets/icons/svg/morevert.svg";
const StaffDetailsHeader = () => {
  return (
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

      <img src={morevert} alt="" className="morevert" />
    </div>
  );
};

export default StaffDetailsHeader;
