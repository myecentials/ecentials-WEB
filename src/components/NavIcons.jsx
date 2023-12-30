import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import warning from "../assets//icons/svg/warning.svg";
import notification from "../assets/icons/svg/noti.svg";
import settings from "../assets/icons/svg/settings.svg";
import logout from "../assets/icons/svg/continue.svg";
import profile from "../assets/images/png/staff.jpeg";
import { Modal, ModalBody } from "reactstrap";
import { useState } from "react";
// import { dispatchD3 } from "d3";
import { resetAuth } from "../app/features/authSlice/authSlice";
import { resetCustomers } from "../app/features/customers/customerSlice";
import { resetDashboard } from "../app/features/dashboard/dashboardSlice";
import { resetHrm } from "../app/features/hrm/hrmSlice";
import { resetInvoice } from "../app/features/invoice/invoiceSlice";
import { resetOrders } from "../app/features/orders/ordersSlice";
import { resetProducts } from "../app/features/products/productsSlice";
import { resetReturns } from "../app/features/returns/returnsSlice";
import { resetSettings } from "../app/features/settings/settingsSlice";
import { resetWholesalers } from "../app/features/wholesaler/wholesalerSlice";
import { useDispatch, useSelector } from "react-redux";
import { pharmacyLogo } from "../app/features/authSlice/authSlice";
const NavIcons = () => {
  const [open, setIsOpen] = useState(false);
  const pharmacylogo = useSelector(pharmacyLogo)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    // sessionStorage.clear();
    setIsOpen(true);
  };
  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(resetAuth());
    dispatch(resetCustomers());
    dispatch(resetDashboard());
    dispatch(resetHrm());
    dispatch(resetInvoice());
    dispatch(resetOrders());
    dispatch(resetProducts());
    dispatch(resetReturns());
    dispatch(resetSettings());
    dispatch(resetWholesalers());
    navigate("/login");
  };
  const staff_name = sessionStorage.getItem("staff_name");
  const position = sessionStorage.getItem("position");
  return (
    <div className="d-flex nav_icons">
      <div className="admin_container mx-3 d-flex justify-content-center align-items-center">
        <div
          className="bg-user rounded-circle"
          style={{ width: "1.8rem", height: "1.8rem" }}
        >
          <img
            src={ pharmacylogo !== "undefined"  ? pharmacylogo : profile}
            alt=""
            width={30}
            className="img-fluid rounded-circle"
            style={{
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
        </div>
        <div
          className="d-flex flex-column mx-1"
          style={{ lineHeight: "0.8em" }}
        >
          <span style={{ fontSize: "10px" }}>{staff_name}</span>
          <span className="text-primary" style={{ fontSize: "8px" }}>
            {position}
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
        to="/settings"
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
