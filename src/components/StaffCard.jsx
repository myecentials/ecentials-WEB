import React from "react";
import { Link } from "react-router-dom";
import phone from "../assets/icons/svg/phone.svg";
import email from "../assets/icons/svg/emailwhite.svg";
import morevert from "../assets/icons/svg/morevert.svg";
import activeStaff from "../static/activeStaff";

const StaffCard = (props, clicked) => {
  return (
    <div
      className="card border-0 text-center py-4 staff-card-body"
      style={{ borderRadius: "10px" }}
      onClick={clicked}
    >
      <img
        src={props.image}
        alt={props.name}
        className="rounded-circle mx-auto bg-user"
        width={90}
        height={90}
      />
      <button className="btn edit">
        <img src={morevert} alt="" width={20} />
      </button>
      <Link to={props.link}>
        <h6 className="my-3 text-deep">{props.name}</h6>
      </Link>
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
