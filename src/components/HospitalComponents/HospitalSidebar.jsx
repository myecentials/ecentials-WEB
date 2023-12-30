import React, { useEffect } from "react";
import { useState } from "react";
// import logo from "../../logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import dashboard from "../../assets/icons/svg/dash.svg";
import hrm from "../../assets/icons/svg/hrm.svg";
// import customers from "../../assets/icons/svg/customer.svg";
// import sales from "../../assets/icons/svg/sale.svg";
// import products from "../../assets/icons/svg/product.svg";
// import appointment from "../../assets/images/svgs/appointement.svg";
// import delivery from "../../assets/icons/svg/delivery.svg";
// import manufacture from "../../assets/icons/svg/manufacture.svg";
// import returnicon from "../../assets/icons/svg/return.svg";
// import invoice from "../../assets/icons/svg/invoice.svg";
// import orders from "../../assets/icons/svg/order.svg";
// import report from "../../assets/icons/svg/report.svg";
// import latestactivity from "../../assets/icons/svg/latestactivity.svg";
// import chat from "../../assets/icons/svg/chat.svg";
import management from "../../assets/images/svgs/hospital/management.svg";
import settings from "../../assets/icons/svg/settings.svg";
import ebusiness from "../../assets/images/png/ebusiness.svg";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import { Collapse } from "reactstrap";

const HospitalSidebar = (props) => {
  const [isOpenHRM, setIsOpenHRM] = useState(false);
  const [isOpenCustomers, setIsOpenCustomers] = useState(false);
  // const [isOpenManufacture, setIsOpenManufacture] = useState(false);
  // const [isOpenReturn, setIsOpenReturn] = useState(false);
  // const [isOpenInvoice, setIsOpenInvoice] = useState(false);
  // const [isOpenReport, setIsOpenReport] = useState(false);
  // const [isOpenOrders, setIsOpenOrders] = useState(false);

  const handleHRM = () => {
    setIsOpenHRM(!isOpenHRM);
  };
  const handleCustomers = () => {
    setIsOpenCustomers(!isOpenCustomers);
  };
  // const handleManufacture = () => {
  //   setIsOpenManufacture(!isOpenManufacture);
  // };
  // const handleReturn = () => {
  //   setIsOpenReturn(!isOpenReturn);
  // };
  // const handleInvoice = () => {
  //   setIsOpenInvoice(!isOpenInvoice);
  // };
  // const handleReport = () => {
  //   setIsOpenReport(!isOpenReport);
  // };
  // const handleOrders = () => {
  //   setIsOpenOrders(!isOpenOrders);
  // };

  const navigate = useNavigate();
  useEffect(() => {
    function handlekeypress(event) {
      // event.preventDefault();
      if (
        (event.shiftKey || event.metaKey) &&
        (event.key === "d" || event.key === "D")
      ) {
        navigate("/dashboard");
      } else if (
        (event.shiftKey || event.metaKey) &&
        (event.key === "i" || event.key === "I")
      ) {
        navigate("/invoices/invoice-pos");
      } else if (
        (event.shiftKey || event.metaKey) &&
        (event.key === "p" || event.key === "P")
      ) {
        navigate("/products");
      } else if (
        (event.shiftKey || event.metaKey) &&
        (event.key === "o" || event.key === "O")
      ) {
        navigate("/orders");
      } else if (
        (event.shiftKey || event.metaKey) &&
        (event.key === "s" || event.key === "S")
      ) {
        navigate("/sales");
      } else if (
        (event.shiftKey || event.metaKey) &&
        (event.key === "r" || event.key === "R")
      ) {
        navigate("/returns/add-return");
      } else if (
        (event.shiftKey || event.metaKey) &&
        (event.key === "h" || event.key === "H")
      ) {
        navigate("/hrm/staff");
      } else if (
        (event.shiftKey || event.metaKey) &&
        (event.key === "c" || event.key === "C")
      ) {
        navigate("/customers/add-customers");
      } else if (
        (event.shiftKey || event.metaKey) &&
        (event.key === "w" || event.key === "W")
      ) {
        navigate("/manufacturer/add-manufacturer");
      } else if (
        (event.shiftKey || event.metaKey) &&
        (event.key === "x" || event.key === "X")
      ) {
        navigate("/settings");
      }
    }
    window.addEventListener("keydown", handlekeypress);
    return () => {
      window.removeEventListener("keydown", handlekeypress);
    };
  }, []);

  // const priviledges = sessionStorage.getItem("priviledges");

  return (
    <>
      <div className="img-header mt-md-5 mx-0">
        <Link to="/hospital/dashboard">
          <img
            src={ebusiness}
            alt=""
            width={120}
            className="mx-md-auto d-block text-md-center"
          />
        </Link>
      </div>
      <div className="my-md-5 mt-2">
        <NavLink
          to="/hospital/dashboard"
          className="links move-left d-flex align-items-start flex-column"
          style={({ isActive }) =>
            isActive
              ? {
                  borderTopLeftRadius: "50px",
                  borderBottomLeftRadius: "50px",
                  backgroundColor: "#f3f4ff",
                }
              : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          }
        >
          <NavLink
            to="/hospital/dashboard"
            className="p-3 d-flex align-items-center justify-content-between hovered"
          >
            <div className="group text-nowrap">
              <img src={dashboard} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Home</b>
            </div>
          </NavLink>
        </NavLink>
        <NavLink
          to="/hospital/doctors/dashboard"
          className="d-flex move-left links flex-column align-items-start links_bg"
          style={({ isActive }) =>
            isActive
              ? {
                  borderTopLeftRadius: "50px",
                  borderBottomLeftRadius: "50px",
                  backgroundColor: "#f3f4ff",
                }
              : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          }
        >
          <NavLink
            to="/hospital/doctors/dashboard"
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleHRM}
            style={({ isActive }) =>
              isActive
                ? {
                    borderTopLeftRadius: "50px",
                    borderBottomLeftRadius: "50px",
                    backgroundColor: "#f3f4ff",
                  }
                : {
                    borderTopLeftRadius: "50px",
                    borderBottomLeftRadius: "50px",
                  }
            }
          >
            <div className="group text-nowrap">
              <img src={hrm} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Doctors</b>
            </div>
            {isOpenHRM ? <BsChevronDown /> : <BsChevronRight />}
          </NavLink>
          <Collapse isOpen={isOpenHRM}>
            <div className="sublinks">
              <NavLink to="/hospital/doctors/dashboard" className="sublink">
                Dashboard
              </NavLink>
              <NavLink to="/hospital/doctors/appointments" className="sublink">
                My Appointments
              </NavLink>
              <NavLink
                to="/hospital/doctors/pending-appointments"
                className="sublink"
              >
                Pending
              </NavLink>
              <NavLink to="" className="sublink">
                Dashboard Settings
              </NavLink>
            </div>
          </Collapse>
        </NavLink>

        <NavLink
          to="/hospital/management"
          className="d-flex move-left links flex-column align-items-start links_bg"
          style={({ isActive }) =>
            isActive
              ? {
                  borderTopLeftRadius: "50px",
                  borderBottomLeftRadius: "50px",
                  backgroundColor: "#f3f4ff",
                }
              : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          }
        >
          <NavLink
            to="/hospital/management"
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleCustomers}
            style={({ isActive }) =>
              isActive
                ? {
                    borderTopLeftRadius: "50px",
                    borderBottomLeftRadius: "50px",
                    backgroundColor: "#f3f4ff",
                  }
                : {
                    borderTopLeftRadius: "50px",
                    borderBottomLeftRadius: "50px",
                  }
            }
          >
            <div className="group text-nowrap">
              <img src={management} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Clinical Mgt</b>
            </div>
            {isOpenCustomers ? <BsChevronDown /> : <BsChevronRight />}
          </NavLink>
          <Collapse isOpen={isOpenCustomers}>
            <div className="sublinks">
              <NavLink to="" className="sublink">
                Staff
              </NavLink>
              <NavLink to="" className="sublink">
                Org Chart
              </NavLink>
              <NavLink to="" className="sublink">
                Recruitment
              </NavLink>
            </div>
          </Collapse>
        </NavLink>

        <NavLink
          to="/hospital/settings"
          className="d-flex move-left links align-items-start"
          style={({ isActive }) =>
            isActive
              ? {
                  borderTopLeftRadius: "50px",
                  borderBottomLeftRadius: "50px",
                  backgroundColor: "#f3f4ff",
                }
              : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          }
        >
          <Link
            to="/hospital/settings"
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group text-nowrap">
              <img src={settings} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Settings</b>
            </div>
          </Link>
        </NavLink>
        {/* <NavLink
          to="/delivery"
          className="d-flex move-left links align-items-start"
          style={({ isActive }) =>
            isActive
              ? {
                  borderTopLeftRadius: "50px",
                  borderBottomLeftRadius: "50px",
                  backgroundColor: "#f3f4ff",
                }
              : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          }
        >
          <Link
            to="/delivery/orders"
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group text-nowrap">
              <img src={delivery} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Delivery</b>
            </div>
          </Link>
        </NavLink>

       
        <div
          className="d-flex move-left links align-items-start flex-column"
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleReport}
          >
            <div className="group text-nowrap">
              <img src={report} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Report</b>
            </div>
            {isOpenReport ? <BsChevronDown /> : <BsChevronRight />}
          </Link>
          <Collapse isOpen={isOpenReport}>
            <div className="sublinks">
              <Link to="/reports/report-dashboard" className="sublink">
                Report Dashboard
              </Link>
              <Link to="/reports/sales-report" className="sublink">
                Sales Report
              </Link>
              <Link to="/reports/sales-report/user" className="sublink">
                Sales Report (User)
              </Link>
              <Link to="/reports/sales-report/products" className="sublink">
                Sales Report (Product)
              </Link>
              <Link to="/reports/sales-report/category" className="sublink">
                Sales Report (Category)
              </Link>
              <Link to="/reports/purchase-reports" className="sublink">
                Purchase Report
              </Link>
              <Link to="/reports/purchase-reports/category" className="sublink">
                Purchase Report (Category)
              </Link>
            </div>
          </Collapse>
        </div>
        <NavLink
          to="/activity"
          className="d-flex move-left links align-items-start"
          style={({ isActive }) =>
            isActive
              ? {
                  borderTopLeftRadius: "50px",
                  borderBottomLeftRadius: "50px",
                  backgroundColor: "#f3f4ff",
                }
              : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          }
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group text-nowrap">
              <img src={latestactivity} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Latest Activity</b>
            </div>
          </Link>
        </NavLink>
        <NavLink
          to="/chat"
          className="d-flex move-left links align-items-start"
          style={({ isActive }) =>
            isActive
              ? {
                  borderTopLeftRadius: "50px",
                  borderBottomLeftRadius: "50px",
                  backgroundColor: "#f3f4ff",
                }
              : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          }
        >
          <Link
            to="/chat"
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group text-nowrap">
              <img src={chat} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Chat</b>
            </div>
          </Link>
        </NavLink> */}

        {/* <div
          className="d-flex move-left links align-items-start"
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to="/orders"
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group text-nowrap">
              <img src={orders} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Orders</b>
            </div>
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default HospitalSidebar;
