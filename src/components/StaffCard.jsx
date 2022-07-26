import React from "react";
import { Link } from "react-router-dom";
import phone from "../assets/icons/svg/phone.svg";
import email from "../assets/icons/svg/emailwhite.svg";
import morevert from "../assets/icons/svg/morevert.svg";

const StaffCard = (props) => {
  return (
    <div
      className="card border-0 text-center py-4 staff-card-body"
      style={{ borderRadius: "10px" }}
    >
      <img
        src={props.image}
        alt=""
        className="rounded-circle mx-auto"
        width={90}
        height={90}
      />
      <button className="btn edit">
        <img src={morevert} alt="" width={20} />
      </button>
      <h6 className="my-3 text-deep">{props.name}</h6>
      <p className="gray-text">{props.field}</p>
      <div className="d-flex align-items-center justify-content-center">
        <Link to="" className="circle mx-2 rounded-circle ms-bg">
          <img src={phone} alt="" />
        </Link>
        <Link to="" className="circle mx-2 rounded-circle ms-bg">
          <img src={email} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default StaffCard;
