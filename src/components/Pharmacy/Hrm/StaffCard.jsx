import React from "react";
import { Link } from "react-router-dom";
import phone from "../../../assets/icons/svg/phone.svg";
import email from "../../../assets/icons/svg/emailwhite.svg";
import morevert from "../../../assets/icons/svg/morevert.svg";
// import { useRef } from "react";

const StaffCard = (props) => {
  const handleClick = (e) => {
    sessionStorage.setItem("index", e);
  };
  return (
    <div
      className="card border-0 text-center py-4 staff-card-body"
      style={{ borderRadius: "10px" }}
    >
      <img
        src={props.image}
        alt={props.name}
        className="rounded-circle mx-auto bg-user"
        width={90}
        height={90}
        style={{
          aspectRatio: "3 / 2",
          objectFit: "cover",
          mixBlendMode: "normal",
          pointerEvents: "none",
        }}
      />

      <Link
        to={props.to}
        className="btn edit"
        onClick={() => handleClick(props.id)}
      >
        <img src={morevert} alt="" width={20} />
      </Link>
      <Link to={props.link} onClick={() => handleClick(props.id)}>
        <h6 className="my-3 text-deep">{props.name}</h6>
      </Link>
      <p className="gray-text">{props.field}</p>
      <div className="d-flex align-items-center justify-content-center">
        <Link
          to=""
          className="circle mx-1 rounded-circle ms-bg"
          style={{ width: "2rem", height: "2rem" }}
        >
          <img src={phone} alt="" width={15} />
        </Link>
        <Link
          to=""
          className="circle mx-1 rounded-circle ms-bg"
          style={{ width: "2rem", height: "2rem" }}
        >
          <img src={email} alt="" width={15} />
        </Link>
      </div>
      <h6 className="text-danger my-0 mx-0">
        {props.active ? "Terminated" : ""}
      </h6>
    </div>
  );
};

export default StaffCard;
