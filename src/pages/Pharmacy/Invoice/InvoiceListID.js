import React, { useRef } from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
// import SideBar from "../../../components/SideBar";
import menulist from "../../../assets/icons/svg/menulist.svg";
import purplemail from "../../../assets/icons/svg/purpleemail.svg";
import printer from "../../../assets/icons/svg/printer.svg";
import { Helmet } from "react-helmet";
// import CustomeNav from "../../../components/CustomeNav";
import { Link } from "react-router-dom";
// import pharmLogo from "../../../assets/icons/svg/pharmlogo.svg";
import { Table } from "react-bootstrap";
import logo from "../../../logo.svg";
import Barcode from "react-barcode";
// import { faker } from "@faker-js/faker";
// import Header from "../../../components/Header";
import { useState } from "react";
import { useEffect } from "react";
// import axios from "../../../config/api/axios";
import PharmacyName from "../../../components/PharmacyName";
import ReactToPrint from "react-to-print";

const InvoiceListID = () => {
  // let barcodeArr = [];
  // for (let i = 0; i < 1000; i++) {
  //   barcodeArr.push([faker.finance.pin(4)]);
  // }
  // const randomNumber = Math.floor(Math.random() * 10);
  // const barcode = barcodeArr[randomNumber];

  const userInfo = JSON.parse(sessionStorage.getItem("pharmacyInfo"));
  const { gps_address, email } = userInfo;

  const [data, setData] = useState([]);
  // useEffect(() => {
  //   const results = JSON.parse(sessionStorage.getItem("eyeId"));
  //   setData((prev) => ({ ...prev, ...results }));
  // }, []);
  useEffect(() => {
    const results = JSON.parse(sessionStorage.getItem("eyeId"));
    setData(results || {});  // Set directly to results or an empty object
  }, []);

  const pharmLogo = JSON.parse(sessionStorage.getItem("pharmacyInfo"));
  const pharm_logo = pharmLogo.logo;

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

  const componentRef = useRef();

  return (
    <>
      <Helmet>
        <title>Invoice List</title>
      </Helmet>

        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">INVOICE </h6>
              <DateHeader />
              <div className="d-flex">
                <BreadCrumb
                  name=" Receipt"
                  breadcrumb=""
                  width="8rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div
            className="my-5 mx-md-5 mx-2 py-3 d-flex justify-content-center align-items-center"
            ref={componentRef}
          >
            <div
              className="card border-0  text-center"
              style={{ width: "20rem" }}
            >
              <div className="mt-5 mx-4">
                <img
                  src={pharm_logo}
                  alt=""
                  width={50}
                  className="mx-auto d-block"
                />

                <p className="mt-4">{pharmacyName}</p>
                <div className="line">
                  <p className="small mb-4">{gps_address}</p>
                  <p className="small">{email}</p>
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
                <Barcode value={invoice_number} height={30} marginTop={0} />
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
            <Link to = "/pharmacy/invoices/invoice-list">

            <button className="btn d-flex justify-content-center align-items-center bg-white text-purple">
              <img src={menulist} alt="" />{" "}
              <span className="small text-nowrap">Invoice List</span>
            </button>
            </Link>
            <ReactToPrint
              trigger={() => (
                <button className="py-2 px-2 rounded d-flex justify-content-center align-items-center ms-bg text-white mx-3">
                  <img src={printer} alt="" width={18} className="mx-2" />{" "}
                  <span className="small text-nowrap">Print Invoice</span>
                </button>
              )}
              content={() => componentRef.current}
            />
            <Link to="/pharmacy/invoices/invoice-list/invoice-id/email-invoice">
              <button className="btn d-flex justify-content-center align-items-center bg-white text-purple">
                <img src={purplemail} alt="" width={18} className="mx-2" />
                <span className="small text-nowrap">Email Invoice</span>
              </button>
            </Link>
          </div>
        </div>
    </>
  );
};

export default InvoiceListID;
