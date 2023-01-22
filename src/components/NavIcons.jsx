import React from "react";
import { Link } from "react-router-dom";
import warning from "../assets//icons/svg/warning.svg";
import notification from "../assets/icons/svg/noti.svg";
import settings from "../assets/icons/svg/settings.svg";
import logout from "../assets/icons/svg/continue.svg";
import profile from "../assets/images/png/profile.png";

const NavIcons = () => {
  const handleClick = () => {
    sessionStorage.clear();
  };
  return (
    <div className="d-flex nav_icons">
      <div className="admin_container mx-3 d-flex justify-content-center align-items-center">
        <div
          className="bg-user rounded-circle"
          style={{ width: "1.8rem", height: "1.8rem" }}
        >
          <img src={profile} alt="" width={30} />
        </div>
        <div
          className="d-flex flex-column mx-1"
          style={{ lineHeight: "0.8em" }}
        >
          <span style={{ fontSize: "10px" }}>Pato</span>
          <span className="text-primary" style={{ fontSize: "8px" }}>
            Admin
          </span>
        </div>
      </div>
      <div
        to=""
        className="bg-user rounded-circle d-flex justify-content-center align-items-center"
        style={{
          width: "1.8rem",
          height: "1.8rem",
          backgroundColor: "#F5F6FB",
          cursor: "pointer",
        }}
      >
        <img src={notification} alt="" width={15} />
      </div>
      <Link
        to=""
        className="bg-user mx-2 rounded-circle d-flex justify-content-center align-items-center"
        style={{
          width: "1.8rem",
          height: "1.8rem",
          backgroundColor: "#F5F6FB",
        }}
      >
        <img src={settings} alt="" width={10} />
      </Link>
      <Link
        onClick={handleClick}
        to="/login"
        className="tomato rounded-circle d-flex justify-content-center align-items-center"
        style={{
          width: "1.8rem",
          height: "1.8rem",
          // backgroundColor: "#F5F6FB",
        }}
      >
        <img src={logout} alt="" width={10} />
      </Link>
    </div>
  );
};

export default NavIcons;
