import React from "react";
import { Link } from "react-router-dom";
import warning from "../assets//icons/svg/warning.svg";
import notification from "../assets/icons/svg/notification.svg";
import settings from "../assets/icons/svg/settings.svg";

const NavIcons = () => {
  return (
    <div className="d-md-flex d-flex justify-content-center align-items-center setting-icons shadow-sm p-2">
      <Link to="" className="bg-white circle rounded-circle border-0 disc">
        <img src={notification} alt="" width={20} />
        <div
          className="rounded-circle"
          style={{ width: "6px", height: "5px" }}
        ></div>
      </Link>
      <Link to="" className="bg-white circle rounded-circle border-0 disc mx-2">
        <img src={warning} alt="" width={20} />
        <div
          className="rounded-circle bg-danger"
          style={{
            width: "6px",
            height: "5px",
          }}
        ></div>
      </Link>
      <Link to="" className="bg-white circle rounded-circle border-0">
        <img src={settings} alt="" width={20} />
      </Link>
      <div className="d-flex mx-3">
        <div className="mx-2">
          <b className="text-deep text-nowrap">Andrews Opoku</b>
          <p className="gray-text">Admin</p>
        </div>
        <Link to="" className="circle rounded-circle border-0 circle-bg">
          <img src="" alt="" width={20} />
        </Link>
      </div>
    </div>
  );
};

export default NavIcons;
