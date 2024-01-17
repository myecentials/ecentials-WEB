import React from "react";
import { useState } from "react";
// import logo from "../logo.svg";
import { Link, NavLink,useLocation } from "react-router-dom";
import dashboard from "../assets/icons/svg/dash.svg";
import hrm from "../assets/icons/svg/hrm.svg";
import customers from "../assets/icons/svg/customer.svg";
import sales from "../assets/icons/svg/sale.svg";
import products from "../assets/icons/svg/product.svg";
import delivery from "../assets/icons/svg/delivery.svg";
import manufacture from "../assets/icons/svg/manufacture.svg";
import returnicon from "../assets/icons/svg/return.svg";
import invoice from "../assets/icons/svg/invoice.svg";
import orders from "../assets/icons/svg/order.svg";
import report from "../assets/icons/svg/report.svg";
import latestactivity from "../assets/icons/svg/latestactivity.svg";
import chat from "../assets/icons/svg/chat.svg";
import settings from "../assets/icons/svg/settings.svg";
import ebusiness from "../assets/images/png/ebusiness.svg";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import { Collapse } from "reactstrap";


const SideBar = (props) => {
  const [isOpenHRM, setIsOpenHRM] = useState(false);
  const [isOpenCustomers, setIsOpenCustomers] = useState(false);
  const [isOpenManufacture, setIsOpenManufacture] = useState(false);
  const [isOpenReturn, setIsOpenReturn] = useState(false);
  const [isOpenInvoice, setIsOpenInvoice] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);
  const [isOpenOrders, setIsOpenOrders] = useState(false);
  const location = useLocation();



const handleAll= () =>{
  setIsOpenCustomers(false);
  setIsOpenManufacture(false);
  setIsOpenReturn(false);
  setIsOpenInvoice(false);
  setIsOpenReport(false);
  setIsOpenOrders(false);
  setIsOpenHRM(false);
}

  const handleHRM = () => {
    setIsOpenCustomers(false);
  setIsOpenManufacture(false);
  setIsOpenReturn(false);
  setIsOpenInvoice(false);
  setIsOpenReport(false);
  setIsOpenOrders(false);
  setIsOpenHRM(!isOpenHRM);
  
  };
  const handleCustomers = () => {
    setIsOpenManufacture(false);
    setIsOpenReturn(false);
    setIsOpenInvoice(false);
    setIsOpenReport(false);
    setIsOpenOrders(false);
    setIsOpenHRM(false);
    setIsOpenCustomers(!isOpenCustomers);
  };
  const handleManufacture = () => {
    setIsOpenCustomers(false);
    setIsOpenReturn(false);
    setIsOpenInvoice(false);
    setIsOpenReport(false);
    setIsOpenOrders(false);
    setIsOpenHRM(false);
    setIsOpenManufacture(!isOpenManufacture);
  };
  const handleReturn = () => {
    setIsOpenCustomers(false);
    setIsOpenManufacture(false);
    setIsOpenInvoice(false);
    setIsOpenReport(false);
    setIsOpenOrders(false);
    setIsOpenHRM(false);
    setIsOpenReturn(!isOpenReturn);
  };
  const handleInvoice = () => {
    setIsOpenCustomers(false);
    setIsOpenManufacture(false);
    setIsOpenReturn(false);
    setIsOpenReport(false);
    setIsOpenOrders(false);
    setIsOpenHRM(false);
    setIsOpenInvoice(!isOpenInvoice);
  };
  const handleReport = () => {
    setIsOpenCustomers(false);
    setIsOpenManufacture(false);
    setIsOpenReturn(false);
    setIsOpenInvoice(false);
    setIsOpenOrders(false);
    setIsOpenHRM(false);
    setIsOpenReport(!isOpenReport);
  };
  const handleOrders = () => {
    setIsOpenCustomers(false);
    setIsOpenManufacture(false);
    setIsOpenReturn(false);
    setIsOpenInvoice(false);
    setIsOpenReport(false);
    setIsOpenHRM(false);
    setIsOpenOrders(!isOpenOrders);
  };

  // const navigate = useNavigate();
  // useEffect(() => {
  //   function handlekeypress(event) {
  //     // event.preventDefault();
  //     if (
  //       (event.shiftKey || event.metaKey) &&
  //       (event.key === "d" || event.key === "D")
  //     ) {
  //       navigate("/dashboard");
  //     } else if (
  //       (event.shiftKey || event.metaKey) &&
  //       (event.key === "i" || event.key === "I")
  //     ) {
  //       navigate("/invoices/invoice-pos");
  //     } else if (
  //       (event.shiftKey || event.metaKey) &&
  //       (event.key === "p" || event.key === "P")
  //     ) {
  //       navigate("/products");
  //     } else if (
  //       (event.shiftKey || event.metaKey) &&
  //       (event.key === "o" || event.key === "O")
  //     ) {
  //       navigate("/orders");
  //     } else if (
  //       (event.shiftKey || event.metaKey) &&
  //       (event.key === "s" || event.key === "S")
  //     ) {
  //       navigate("/sales");
  //     } else if (
  //       (event.shiftKey || event.metaKey) &&
  //       (event.key === "r" || event.key === "R")
  //     ) {
  //       navigate("/returns/add-return");
  //     } else if (
  //       (event.shiftKey || event.metaKey) &&
  //       (event.key === "h" || event.key === "H")
  //     ) {
  //       navigate("/hrm/staff");
  //     } else if (
  //       (event.shiftKey || event.metaKey) &&
  //       (event.key === "c" || event.key === "C")
  //     ) {
  //       navigate("/customers/add-customers");
  //     } else if (
  //       (event.shiftKey || event.metaKey) &&
  //       (event.key === "w" || event.key === "W")
  //     ) {
  //       navigate("/manufacturer/add-manufacturer");
  //     } else if (
  //       (event.shiftKey || event.metaKey) &&
  //       (event.key === "x" || event.key === "X")
  //     ) {
  //       navigate("/settings");
  //     }
  //   }
  //   window.addEventListener("keydown", handlekeypress);
  //   return () => {
  //     window.removeEventListener("keydown", handlekeypress);
  //   };
  // }, []);

  // const priviledges = sessionStorage.getItem("priviledges");

  return (
    <>
      <div className="img-header mt-md-5 mx-0">
        <Link to="/pharmacy/dashboard" onClick={handleAll}>
          <img
            src={ebusiness}
            alt="Dashboard"
            width={120}
            className="mx-md-auto d-block text-md-center"
          />
        </Link>
      </div>
      <div className="my-md-5 mt-2">
        <NavLink
        onClick={handleAll}
          to="/pharmacy/dashboard"
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
            to="/pharmacy/dashboard"
            className="p-3 d-flex align-items-center justify-content-between hovered"
          >
            <div className="group text-nowrap">
              <img src={dashboard} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Dashboard</b>
            </div>
          </NavLink>
        </NavLink>

        <NavLink
        // to="/pharmacy/invoices/invoice-pos"
          className="d-flex move-left links align-items-start flex-column"
          isActive={(match, location) => location.pathname.startsWith("/pharmacy/invoices")}
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
            backgroundColor: location.pathname.startsWith("/pharmacy/invoices") ? "#f3f4ff" : "transparent",
          }}
          // style={({ isActive }) =>
          //   isActive
          //     ? {
          //         borderTopLeftRadius: "50px",
          //         borderBottomLeftRadius: "50px",
          //         backgroundColor: "#f3f4ff",
          //       }
          //     : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          // }
        >
          <div
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleInvoice}
          >
            <div className="group text-nowrap">
              <img src={invoice} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Invoice</b>
            </div>
            {isOpenInvoice ? <BsChevronDown /> : <BsChevronRight />}
          </div>
          <Collapse isOpen={isOpenInvoice}>
            <div className="sublinks">
              {/* <Link to="/pharmacy/invoices/add-invoice" className="sublink">
                Add Invoice
              </Link> */}
              <Link to="/pharmacy/invoices/invoice-pos" className="sublink">
                POS Invoice
              </Link>
              <Link to="/pharmacy/invoices/invoice-list" className="sublink">
                Invoice List
              </Link>
            </div>
          </Collapse>
        </NavLink>
        <NavLink
        onClick={handleAll}
          to="/pharmacy/products"
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
            to="/pharmacy/products"
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group text-nowrap">
              <img src={products} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Products</b>
            </div>
          </Link>
        </NavLink>
        <NavLink
        // to ="/pharmacy/orders"
          className="d-flex move-left links align-items-start flex-column"
          isActive={(match, location) => location.pathname.startsWith("/pharmacy/orders")}
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
            backgroundColor: location.pathname.startsWith("/pharmacy/orders") ? "#f3f4ff" : "transparent",
          }}
          // style={({ isActive }) =>
          //   isActive
          //     ? {
          //         borderTopLeftRadius: "50px",
          //         borderBottomLeftRadius: "50px",
          //         backgroundColor: "#f3f4ff",
          //       }
          //     : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          // }
        >
          <div
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleOrders}
          >
            <div className="group text-nowrap">
              <img src={orders} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Orders</b>
            </div>
            {isOpenOrders ? <BsChevronDown /> : <BsChevronRight />}
          </div>
          <Collapse isOpen={isOpenOrders}>
            <div className="sublinks">
              <Link to="/pharmacy/orders" className="sublink">
                Orders
              </Link>
              <Link to="/pharmacy/orders/prescription" className="sublink">
                Prescriptions
              </Link>
            </div>
          </Collapse>
        </NavLink>
        <NavLink
        onClick={handleAll}
          to="/pharmacy/sales"
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
            to="/pharmacy/sales"
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group text-nowrap">
              <img src={sales} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Sales/Payments</b>
            </div>
          </Link>
        </NavLink>
        {/** RETURNS */}
        <NavLink
          // to="/pharmacy/returns/add-return"
          className="d-flex move-left links align-items-start flex-column"
          isActive={(match, location) => location.pathname.startsWith("/pharmacy/returns")}
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
            backgroundColor: location.pathname.startsWith("/pharmacy/returns") ? "#f3f4ff" : "transparent",
          }}
          // style={({ isActive }) =>
          //   isActive
          //     ? {
          //         borderTopLeftRadius: "50px",
          //         borderBottomLeftRadius: "50px",
          //         backgroundColor: "#f3f4ff",
          //       }
          //     : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          // }
        >
          <div
            // to="/pharmacy/returns/add-return"
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleReturn}
          >
            <div className="group text-nowrap">
              <img src={returnicon} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Return</b>
            </div>
            {isOpenReturn ? <BsChevronDown /> : <BsChevronRight />}
          </div>
          <Collapse isOpen={isOpenReturn}>
            <div className="sublinks">
              <Link to="/pharmacy/returns/add-return" className="sublink">
                Add Return
              </Link>
              <Link to="/pharmacy/returns/invoice-return-list" className="sublink">
                Invoice Return List
              </Link>
              {/* <Link to="/pharmacy/returns/manufacturer-return-list" className="sublink">
                Manufacturer Return List
              </Link> */}
            </div>
          </Collapse>
        </NavLink>
        {/**HRM */}
        <NavLink
          // to="/pharmacy/hrm/staff"
          className="d-flex move-left links flex-column align-items-start links_bg"
          isActive={(match, location) => location.pathname.startsWith("/pharmacy/hrm")}
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
            backgroundColor: location.pathname.startsWith("/pharmacy/hrm") ? "#f3f4ff" : "transparent",
          }}
          // style={({ isActive }) =>
          //   isActive
          //     ? {
          //         borderTopLeftRadius: "50px",
          //         borderBottomLeftRadius: "50px",
          //         backgroundColor: "#f3f4ff",
          //       }
          //     : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          // }
        >
          <div
            // to="/pharmacy/hrm/staff"
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleHRM}
          >
            <div className="group text-nowrap">
              <img src={hrm} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">HRM</b>
            </div>
            {isOpenHRM ? <BsChevronDown /> : <BsChevronRight />}
          </div>
          <Collapse isOpen={isOpenHRM}>
            <div className="sublinks">
              <NavLink to="/pharmacy/hrm/staff" className="sublink">
                Staff
              </NavLink>
              <NavLink to="/pharmacy/hrm/org-chart" className="sublink">
                Org Chat
              </NavLink>
              {/* <NavLink to="" className="sublink">
                Recruitment
              </NavLink> */}
            </div>
          </Collapse>
        </NavLink>
        {/**Customers */}
        <NavLink
          // to="/pharmacy/customers/add-customers"
          className="d-flex move-left links align-items-start flex-column"
          isActive={(match, location) => location.pathname.startsWith("/pharmacy/customers")}
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
            backgroundColor: location.pathname.startsWith("/pharmacy/customers") ? "#f3f4ff" : "transparent",
          }}
          // style={({ isActive }) =>
          //   isActive
          //     ? {
          //         borderTopLeftRadius: "50px",
          //         borderBottomLeftRadius: "50px",
          //         backgroundColor: "#f3f4ff",
          //       }
          //     : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          // }
        >
          <div
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleCustomers}
          >
            <div className="group text-nowrap">
              <img src={customers} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Customers</b>
            </div>
            {isOpenCustomers ? <BsChevronDown /> : <BsChevronRight />}
          </div>
          <Collapse isOpen={isOpenCustomers}>
            <div className="sublinks">
              <Link to="/pharmacy/customers/add-customers" className="sublink">
                Add Customer
              </Link>
              <Link to="/pharmacy/customers/customers-list" className="sublink">
                Customer List
              </Link>
              {/* <Link to="/pharmacy/customers/customer-ledger" className="sublink">
                Customer Ledger
              </Link> */}
            </div>
          </Collapse>
        </NavLink>

        {/**WHOLESALERS */}
        <NavLink
          // to="/pharmacy/manufacturer/add-manufacturer"
          className="d-flex move-left links align-items-start flex-column"
          isActive={(match, location) => location.pathname.startsWith("/pharmacy/manufacturer")}
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
            backgroundColor: location.pathname.startsWith("/pharmacy/manufacturer") ? "#f3f4ff" : "transparent",
          }}
          // style={({ isActive }) =>
          //   isActive
          //     ? {
          //         borderTopLeftRadius: "50px",
          //         borderBottomLeftRadius: "50px",
          //         backgroundColor: "#f3f4ff",
          //       }
          //     : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
          // }
        >
          <div
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleManufacture}
          >
            <div className="group text-nowrap">
              <img src={manufacture} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Wholesaler</b>
            </div>
            {isOpenManufacture ? <BsChevronDown /> : <BsChevronRight />}
          </div>
          <Collapse isOpen={isOpenManufacture}>
            <div className="sublinks">
              <Link to="/pharmacy/manufacturer/add-manufacturer" className="sublink">
                Add Wholesaler
              </Link>
              <Link to="/pharmacy/manufacturer/manufacturer-list" className="sublink">
                Wholesaler List
              </Link>
              {/* <Link to="/pharmacy/manufacturer/manufacturer-ledger" className="sublink">
                Wholesaler Ledger
              </Link> */}
            </div>
          </Collapse>
        </NavLink>
        {/** SETTINGS */}
        <NavLink
        onClick={handleAll}
          to="/pharmacy/settings"
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
            to="/pharmacy/settings"
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group text-nowrap">
              <img src={settings} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Settings</b>
            </div>
          </Link>
        </NavLink>



        {/* <NavLink
          // to="/delivery"
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
            to="/pharmacy/delivery/orders"
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group text-nowrap">
              <img src={delivery} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Delivery</b>
            </div>
          </Link>
        </NavLink> */}

       
        {/* <div
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
              <Link to="/pharmacy/reports/report-dashboard" className="sublink">
                Report Dashboard
              </Link>
              <Link to="/pharmacy/reports/sales-report" className="sublink">
                Sales Report
              </Link>
              <Link to="/pharmacy/reports/sales-report/user" className="sublink">
                Sales Report (User)
              </Link>
              <Link to="/pharmacy/reports/sales-report/products" className="sublink">
                Sales Report (Product)
              </Link>
              <Link to="/pharmacy/reports/sales-report/category" className="sublink">
                Sales Report (Category)
              </Link>
              <Link to="/pharmacy/reports/purchase-reports" className="sublink">
                Purchase Report
              </Link>
              <Link to="/pharmacy/reports/purchase-reports/category" className="sublink">
                Purchase Report (Category)
              </Link>
            </div>
          </Collapse>
        </div> */}
        {/* <NavLink
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
        </NavLink> */}
        {/* <NavLink
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
        </NavLink>  */}

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

export default SideBar;
