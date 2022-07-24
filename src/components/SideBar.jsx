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

const SideBar = () => {
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
      <div className="img-header mt-5">
        <Link to="/">
          <img
            src={logo}
            alt=""
            width={120}
            className="mx-auto d-block text-center"
          />
        </Link>
        <h5 className="small mt-1">Business</h5>
      </div>
      <div className="my-5 links-height">
        <div
          className="links d-flex align-items-start flex-column"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="p-3 d-flex align-items-center justify-content-between hovered"
          >
            <div className="group">
              <img src={dashboard} alt="" width={25} />
              <b className="text-deep mx-4">Dashboard</b>
            </div>
          </Link>
        </div>
        <div
          className="d-flex links flex-column align-items-start"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleHRM}
          >
            <div className="group">
              <img src={hrm} alt="" width={25} />
              <b className="text-deep mx-4">HRM</b>
            </div>
            {isOpenHRM ? <BsChevronDown /> : <BsChevronRight />}
          </Link>
          <Collapse isOpen={isOpenHRM}>
            <div className="sublinks">
              <Link to="" className="sublink">
                Staff
              </Link>
              <Link to="" className="sublink">
                Org Chat
              </Link>
              <Link to="" className="sublink">
                Recruitment
              </Link>
            </div>
          </Collapse>
        </div>
        <div
          className="d-flex links align-items-start flex-column"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleCustomers}
          >
            <div className="group">
              <img src={customers} alt="" width={25} />
              <b className="text-deep mx-4">Customers</b>
            </div>
            {isOpenCustomers ? <BsChevronDown /> : <BsChevronRight />}
          </Link>
          <Collapse isOpen={isOpenCustomers}>
            <div className="sublinks">
              <Link to="" className="sublink">
                Add Customer
              </Link>
              <Link to="" className="sublink">
                Customer List
              </Link>
              <Link to="" className="sublink">
                Customer Ledger
              </Link>
            </div>
          </Collapse>
        </div>
        <div
          className="d-flex links align-items-start"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group">
              <img src={sales} alt="" width={25} />
              <b className="text-deep mx-4">Sales/Payments</b>
            </div>
          </Link>
        </div>
        <div
          className="d-flex links align-items-start"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group">
              <img src={products} alt="" width={25} />
              <b className="text-deep mx-4">Products</b>
            </div>
          </Link>
        </div>
        <div
          className="d-flex links align-items-start"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group">
              <img src={delivery} alt="" width={25} />
              <b className="text-deep mx-4">Delivery</b>
            </div>
          </Link>
        </div>
        <div
          className="d-flex links align-items-start flex-column"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleManufacture}
          >
            <div className="group">
              <img src={manufacture} alt="" width={25} />
              <b className="text-deep mx-4">Manufacturer</b>
            </div>
            {isOpenManufacture ? <BsChevronDown /> : <BsChevronRight />}
          </Link>
          <Collapse isOpen={isOpenManufacture}>
            <div className="sublinks">
              <Link to="" className="sublink">
                Add Manufacturer
              </Link>
              <Link to="" className="sublink">
                Manufacturer List
              </Link>
              <Link to="" className="sublink">
                Manufacturer Ledger
              </Link>
            </div>
          </Collapse>
        </div>
        <div
          className="d-flex links align-items-start flex-column"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleReturn}
          >
            <div className="group">
              <img src={returnicon} alt="" width={25} />
              <b className="text-deep mx-4">Return</b>
            </div>
            {isOpenReturn ? <BsChevronDown /> : <BsChevronRight />}
          </Link>
          <Collapse isOpen={isOpenReturn}>
            <div className="sublinks">
              <Link to="" className="sublink">
                Add Return
              </Link>
              <Link to="" className="sublink">
                Invoice Return List
              </Link>
              <Link to="" className="sublink">
                Manufacturer Return List
              </Link>
            </div>
          </Collapse>
        </div>
        <div
          className="d-flex links align-items-start flex-column"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleInvoice}
          >
            <div className="group">
              <img src={invoice} alt="" width={25} />
              <b className="text-deep mx-4">Invoice</b>
            </div>
            {isOpenInvoice ? <BsChevronDown /> : <BsChevronRight />}
          </Link>
          <Collapse isOpen={isOpenInvoice}>
            <div className="sublinks">
              <Link to="" className="sublink">
                Add Invoice
              </Link>
              <Link to="" className="sublink">
                POS Invoice
              </Link>
              <Link to="" className="sublink">
                Invoice List
              </Link>
            </div>
          </Collapse>
        </div>
        <div
          className="d-flex links align-items-start"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group">
              <img src={orders} alt="" width={25} />
              <b className="text-deep mx-4">Orders</b>
            </div>
          </Link>
        </div>
        <div
          className="d-flex links align-items-start flex-column"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
            onClick={handleReport}
          >
            <div className="group">
              <img src={report} alt="" width={25} />
              <b className="text-deep mx-4">Report</b>
            </div>
            {isOpenReport ? <BsChevronDown /> : <BsChevronRight />}
          </Link>
          <Collapse isOpen={isOpenReport}>
            <div className="sublinks">
              <Link to="" className="sublink">
                Sales Report
              </Link>
              <Link to="" className="sublink">
                Purchace Report
              </Link>
            </div>
          </Collapse>
        </div>
        <div
          className="d-flex links align-items-start"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group">
              <img src={latestactivity} alt="" width={25} />
              <b className="text-deep mx-4">Latest Activity</b>
            </div>
          </Link>
        </div>
        <div
          className="d-flex links align-items-start"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group">
              <img src={chat} alt="" width={25} />
              <b className="text-deep mx-4">Chat</b>
            </div>
          </Link>
        </div>
        <div
          className="d-flex links align-items-start"
          style={{
            marginLeft: "50px",
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
        >
          <Link
            to=""
            className="link p-3 d-flex align-items-center justify-content-between"
          >
            <div className="group">
              <img src={settings} alt="" width={25} />
              <b className="text-deep mx-4">Settings</b>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
