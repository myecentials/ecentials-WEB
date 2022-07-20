import React from "react";
import email from "../assets/icons/svg/email.svg";

const ActiveStaff = () => {
  return (
    <div className="mt-3 d-flex justify-content-between align-items-start">
      <div className="d-flex">
        <div
          className="circle rounded-circle"
          style={{ backgroundColor: "#c1bbeb" }}
        ></div>
        <div className="mx-2">
          <h6>Andrews Opoku</h6>
          <p className="gray-text">Courier dept</p>
        </div>
      </div>

      <div className="">
        <div className="circle mail rounded-circle">
          <img src={email} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ActiveStaff;
