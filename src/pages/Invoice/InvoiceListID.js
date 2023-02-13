import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import menulist from "../../assets/icons/svg/menulist.svg";
import purplemail from "../../assets/icons/svg/purpleemail.svg";
import printer from "../../assets/icons/svg/printer.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import pharmLogo from "../../assets/icons/svg/pharmlogo.svg";
import { Table } from "react-bootstrap";
import logo from "../../logo.svg";
import Barcode from "react-barcode";
import { faker } from "@faker-js/faker";
import Header from "../../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../config/api/axios";
import PharmacyName from "../../components/PharmacyName";

const InvoiceListID = () => {
  let objToday = new Date(),
    weekday = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = (function () {
      let a = objToday;
      if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
      a = parseInt((a + "").charAt(1));
      return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th";
    })(),
    dayOfMonth =
      today + (objToday.getDate() < 10)
        ? "0" + objToday.getDate() + domEnder
        : objToday.getDate() + domEnder,
    months = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    curHour =
      objToday.getHours() > 12
        ? objToday.getHours() - 12
        : objToday.getHours() < 10
        ? "0" + objToday.getHours()
        : objToday.getHours(),
    curMinute =
      objToday.getMinutes() < 10
        ? "0" + objToday.getMinutes()
        : objToday.getMinutes(),
    curSeconds =
      objToday.getSeconds() < 10
        ? "0" + objToday.getSeconds()
        : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
  let today =
    curHour +
    ":" +
    curMinute +
    "." +
    curSeconds +
    curMeridiem +
    " " +
    dayOfWeek +
    " " +
    dayOfMonth +
    " of " +
    curMonth +
    ", " +
    curYear;

  let barcodeArr = [];
  for (let i = 0; i < 1000; i++) {
    barcodeArr.push([faker.finance.pin(4)]);
  }
  const randomNumber = Math.floor(Math.random() * 10);
  const barcode = barcodeArr[randomNumber];

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post("/pharmacy/invoice", {
        store_id: sessionStorage.getItem("facility_id"),
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data[sessionStorage.getItem("phoneId")]);
      })
      .catch((err) => console.log(err));
  }, []);

  const pharmacyName = sessionStorage.getItem("name");
  const {
    customer_name,
    createdAt,
    invoice_number,
    products_summary,
    grand_total,
  } = data;
  const year = new Date(createdAt).getFullYear();
  const month = new Date(createdAt).getMonth() + 1;
  const day = new Date(createdAt).getDate();

  console.log(data);
  const products = [];
  for (let item in products_summary) {
    products.push(products_summary[item]);
  }

  return (
    <>
      <Helmet>
        <title>Invoice List</title>
      </Helmet>
      <Header />
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">Settings</h6>
              <p className="small gray-text">
                <span className="text-primary">{dayOfWeek}, </span>
                {dayOfMonth} {curMonth}, {curYear}
              </p>
              <div className="d-flex">
                <BreadCrumb
                  name="Invoice POS"
                  breadcrumb=""
                  width="8rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="my-5 mx-md-5 mx-2 d-flex justify-content-center align-items-center">
            <div
              className="card border-0  text-center"
              style={{ width: "20rem" }}
            >
              <div className="mt-5 mx-4">
                <img
                  src={pharmLogo}
                  alt=""
                  width={30}
                  className="mx-auto d-block"
                />

                <p className="mt-4">{pharmacyName}</p>
                <div className="line">
                  <p className="small mb-4">Demo Address</p>
                  <p className="small">001245678956</p>
                </div>

                <hr className="mb-1" />
                <div className="">
                  <p className="small my-0">
                    <b>{customer_name}</b>
                  </p>
                  <p className="my-1">
                    Date: {year}-{month}-{day}
                  </p>
                  <p className="text-start small mb-1">
                    <b>Invoice No: {invoice_number}</b>
                  </p>
                </div>
                <Table borderless responsive>
                  <tr style={{ fontSize: "12px", textAlign: "left" }}>
                    <th>SL</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Dis</th>
                    <th>Amount</th>
                  </tr>
                  {products.map(
                    ({ drug_name, quantity, prize, discount }, index) => (
                      <tr style={{ fontSize: "11px", textAlign: "left" }}>
                        <td>{index + 1}</td>
                        <td>{drug_name}</td>
                        <td>{quantity}</td>
                        <td>{prize}</td>
                        <td>{discount}</td>
                        <td>{quantity * prize}</td>
                      </tr>
                    )
                  )}
                </Table>
                <hr />
                <p className="text-start small">Sales By: Admin</p>
                <div className="d-flex small justify-content-between">
                  <p className="">User</p>
                  <div>
                    <div className="row">
                      <div className="col text-start text-nowrap">Total:</div>
                      <div className="col text-end">₵{grand_total}</div>
                    </div>
                    <div className="row">
                      <div className="col text-start text-nowrap">
                        Invoice Discount:
                      </div>
                      <div className="col text-end">₵0.00</div>
                    </div>
                    <div className="row">
                      <div className="col text-start text-nowrap">
                        <b>Grand Total:</b>
                      </div>
                      <div className="col text-end">₵{grand_total}</div>
                    </div>
                    {/* <div className="row">
                      <div className="col text-start text-nowrap">
                        Paid Amount:
                      </div>
                      <div className="col text-end">₵0.00</div>
                    </div> */}
                  </div>
                </div>
                <hr className="mb-0" />
                <Barcode value={barcode} height={30} marginTop={0} />
                <div className="pb-4 mt-3 d-flex justify-content-center align-items-center">
                  <span className="small deliverer-name">Powered By:</span>
                  <span>
                    <img
                      src={logo}
                      alt=""
                      width={50}
                      className="mb-2 mx-2"
                      style={{ pointerEvents: "none" }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-5">
            <button className="btn d-flex justify-content-center align-items-center bg-white text-purple">
              <img src={menulist} alt="" />{" "}
              <span className="small text-nowrap">Invoice List</span>
            </button>
            <button className="py-2 px-2 rounded d-flex justify-content-center align-items-center ms-bg text-white mx-3">
              <img src={printer} alt="" width={18} className="mx-2" />{" "}
              <span className="small text-nowrap">Print Invoice</span>
            </button>
            <Link to="/invoice-list/invoice-id/email-invoice">
              <button className="btn d-flex justify-content-center align-items-center bg-white text-purple">
                <img src={purplemail} alt="" width={18} className="mx-2" />
                <span className="small text-nowrap">Email Invoice</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceListID;
