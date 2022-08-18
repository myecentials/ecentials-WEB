import React from "react";
import { useState } from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
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
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import { Collapse } from "reactstrap";

const SideBar = (props) => {
  const [isOpenHRM, setIsOpenHRM] = useState(false);
  const [isOpenCustomers, setIsOpenCustomers] = useState(false);
  const [isOpenManufacture, setIsOpenManufacture] = useState(false);
  const [isOpenReturn, setIsOpenReturn] = useState(false);
  const [isOpenInvoice, setIsOpenInvoice] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);

  const handleHRM = () => {
    setIsOpenHRM(!isOpenHRM);
  };
  const handleCustomers = () => {
    setIsOpenCustomers(!isOpenCustomers);
  };
  const handleManufacture = () => {
    setIsOpenManufacture(!isOpenManufacture);
  };
  const handleReturn = () => {
    setIsOpenReturn(!isOpenReturn);
  };
  const handleInvoice = () => {
    setIsOpenInvoice(!isOpenInvoice);
  };
  const handleReport = () => {
    setIsOpenReport(!isOpenReport);
  };
  return (
    <>
      <div className="img-header mt-md-5 mx-0">
        <Link to="/dashboard">
          <img
            src={logo}
            alt=""
            width={120}
            className="mx-md-auto d-block text-md-center"
          />
        </Link>
        <h5 className="small mt-1 d-none d-md-block">Business</h5>
      </div>
      <div className="my-md-5 mt-2">
        <div
          className="links move-left d-flex align-items-start flex-column"
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to="/dashboard"
            className="p-3 d-flex align-items-center justify-content-between hovered"
          >
            <div className="group text-nowrap">
              <img src={dashboard} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Dashboard</b>
            </div>
          </Link>
        </div>
        <div
          className="d-flex move-left links flex-column align-items-start"
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleHRM}
          >
            <div className="group text-nowrap">
              <img src={hrm} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">HRM</b>
            </div>
            {isOpenHRM ? <BsChevronDown /> : <BsChevronRight />}
          </Link>
          <Collapse isOpen={isOpenHRM}>
            <div className="sublinks">
              <Link to="/hrm/staff" className="sublink">
                Staff
              </Link>
              <Link to="/hrm/org-chart" className="sublink">
                Org Chat
              </Link>
              <Link to="" className="sublink">
                Recruitment
              </Link>
            </div>
          </Collapse>
        </div>
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
            onClick={handleCustomers}
          >
            <div className="group text-nowrap">
              <img src={customers} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Customers</b>
            </div>
            {isOpenCustomers ? <BsChevronDown /> : <BsChevronRight />}
          </Link>
          <Collapse isOpen={isOpenCustomers}>
            <div className="sublinks">
              <Link to="/customers/add-customers" className="sublink">
                Add Customer
              </Link>
              <Link to="/customers/customers-list" className="sublink">
                Customer List
              </Link>
              <Link to="/customers/customer-ledger" className="sublink">
                Customer Ledger
              </Link>
            </div>
          </Collapse>
        </div>
        <div
          className="d-flex move-left links align-items-start"
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to="/sales"
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group text-nowrap">
              <img src={sales} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Sales/Payments</b>
            </div>
          </Link>
        </div>
        <div
          className="d-flex move-left links align-items-start"
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to="/products"
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group text-nowrap">
              <img src={products} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Products</b>
            </div>
          </Link>
        </div>
        <div
          className="d-flex move-left links align-items-start"
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
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
        </div>
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
            onClick={handleManufacture}
          >
            <div className="group text-nowrap">
              <img src={manufacture} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Manufacturer</b>
            </div>
            {isOpenManufacture ? <BsChevronDown /> : <BsChevronRight />}
          </Link>
          <Collapse isOpen={isOpenManufacture}>
            <div className="sublinks">
              <Link to="/manufacturer/add-manufacturer" className="sublink">
                Add Manufacturer
              </Link>
              <Link to="/manufacturer/manufacturer-list" className="sublink">
                Manufacturer List
              </Link>
              <Link to="/manufacturer/manufacturer-ledger" className="sublink">
                Manufacturer Ledger
              </Link>
            </div>
          </Collapse>
        </div>
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
            onClick={handleReturn}
          >
            <div className="group text-nowrap">
              <img src={returnicon} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Return</b>
            </div>
            {isOpenReturn ? <BsChevronDown /> : <BsChevronRight />}
          </Link>
          <Collapse isOpen={isOpenReturn}>
            <div className="sublinks">
              <Link to="/returns/add-return" className="sublink">
                Add Return
              </Link>
              <Link to="/returns/invoice-return-list" className="sublink">
                Invoice Return List
              </Link>
              <Link to="/returns/manufacturer-return-list" className="sublink">
                Manufacturer Return List
              </Link>
            </div>
          </Collapse>
        </div>
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
            onClick={handleInvoice}
          >
            <div className="group text-nowrap">
              <img src={invoice} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Invoice</b>
            </div>
            {isOpenInvoice ? <BsChevronDown /> : <BsChevronRight />}
          </Link>
          <Collapse isOpen={isOpenInvoice}>
            <div className="sublinks">
              <Link to="/add-invoice" className="sublink">
                Add Invoice
              </Link>
              <Link to="/invoice-pos" className="sublink">
                POS Invoice
              </Link>
              <Link to="/invoice-list" className="sublink">
                Invoice List
              </Link>
            </div>
          </Collapse>
        </div>
        <div
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
        </div>
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
              <Link
                to="/reports/report-dashboard-customer-reviews"
                className="sublink"
              >
                Report Dashboard
              </Link>
              <Link to="" className="sublink">
                Sales Report
              </Link>
              <Link to="" className="sublink">
                Sales Report (User)
              </Link>
              <Link to="" className="sublink">
                Sales Report (Product)
              </Link>
              <Link to="" className="sublink">
                Sales Report (Category)
              </Link>
              <Link to="" className="sublink">
                Purchase Report
              </Link>
              <Link to="" className="sublink">
                Purchase Report (Category)
              </Link>
            </div>
          </Collapse>
        </div>
        <div
          className="d-flex move-left links align-items-start"
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
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
        </div>
        <div
          className="d-flex move-left links align-items-start"
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
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
        </div>
        <div
          className="d-flex move-left links align-items-start"
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to="/settings"
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group text-nowrap">
              <img src={settings} alt="" width={25} />
              <b className="text-deep mx-lg-4 mx-2">Settings</b>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
