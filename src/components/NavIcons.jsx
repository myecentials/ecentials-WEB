import React from "react";
import { Link, useNavigate } from "react-router-dom";
import warning from "../assets//icons/svg/warning.svg";
import notification from "../assets/icons/svg/noti.svg";
import settings from "../assets/icons/svg/settings.svg";
import logout from "../assets/icons/svg/continue.svg";
import profile from "../assets/images/png/profile.png";
import { Modal, ModalBody } from "reactstrap";
import { useState } from "react";

const NavIcons = () => {
  const [open, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    // sessionStorage.clear();
    setIsOpen(true);
  };
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
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
        // to="/login"
        className="tomato rounded-circle d-flex justify-content-center align-items-center"
        style={{
          width: "1.8rem",
          height: "1.8rem",
          // backgroundColor: "#F5F6FB",
        }}
      >
        <img src={logout} alt="" width={10} />
      </Link>
      <Modal isOpen={open} centered={true}>
        <ModalBody>
          <p className="text-center text-deep">
            Are you sure you want to logout?
          </p>
          <div className="d-flex pb-3 justify-content-center align-items-center mx-auto">
            <button
              className="btn btn-danger mx-2"
              onClick={() => setIsOpen(false)}
              style={{ width: "7rem" }}
            >
              Cancel
            </button>
            <button
              className="btn btn-success text-white mx-2"
              onClick={handleLogout}
              style={{ width: "7rem" }}
            >
              Logout
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NavIcons;
