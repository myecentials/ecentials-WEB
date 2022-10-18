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
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
import StaffNavBar from "../../components/StaffComponents/StaffNavBar";

const StaffInvoiceListID = () => {
  let barcodeArr = [];
  for (let i = 0; i < 1000; i++) {
    barcodeArr.push([faker.finance.pin(4)]);
  }
  const randomNumber = Math.floor(Math.random() * 10);
  const barcode = barcodeArr[randomNumber];

  return (
    <>
      <Helmet>
        <title>Invoice List</title>
      </Helmet>
      <StaffNavBar />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadCrumb
                name="Invoice"
                breadcrumb="/invoice-list/invoice-id"
              />
              <BreadCrumb
                name="INV-1908"
                breadcrumb="/invoice-list/invoice-id"
                hasStyles={true}
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
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

                <p className="mt-4">Andrews Parmacy LTD</p>
                <div className="line">
                  <p className="small mb-4">Demo Address</p>
                  <p className="small">001245678956</p>
                </div>

                <hr className="mb-1" />
                <div className="">
                  <p className="small my-0">
                    <b>Jesse Anim</b>
                  </p>
                  <p className="my-1">Date: 2022-05-09</p>
                  <p className="text-start small mb-1">
                    <b>Invoice No.: 1908</b>
                  </p>
                </div>
                <Table borderless responsive>
                  <tr>
                    <td>SL</td>
                    <td>Item</td>
                    <td>Qty</td>
                    <td>Rate</td>
                    <td>Dis</td>
                    <td>Amount</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Boris(425)</td>
                    <td>3</td>
                    <td>25</td>
                    <td>1</td>
                    <td>12</td>
                  </tr>
                </Table>
                <hr />
                <p className="text-start small">Sales By: Admin</p>
                <div className="d-flex small justify-content-between">
                  <p className="">User</p>
                  <div>
                    <div className="row">
                      <div className="col text-start text-nowrap">Total:</div>
                      <div className="col text-end">₵50.00</div>
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
                      <div className="col text-end">₵50.00</div>
                    </div>
                    <div className="row">
                      <div className="col text-start text-nowrap">
                        Paid Amount:
                      </div>
                      <div className="col text-end">₵0.00</div>
                    </div>
                  </div>
                </div>
                <hr className="mb-0" />
                <Barcode value={barcode} height={30} marginTop={0} />
                <div className="pb-4 mt-3 d-flex justify-content-center align-items-center">
                  <span className="small deliverer-name">Powered By:</span>
                  <span>
                    <img src={logo} alt="" width={50} className="mb-2 mx-2" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-5">
            <Link to="/staff-invoice-list/invoice-id/invoice-list">
              <button className="btn d-flex justify-content-center align-items-center bg-white text-purple">
                <img src={menulist} alt="" />{" "}
                <span className="small text-nowrap">Invoice List</span>
              </button>
            </Link>
            <button className="btn d-flex justify-content-center align-items-center ms-bg text-white mx-3">
              <img src={printer} alt="" width={18} className="mx-2" />{" "}
              <span className="small text-nowrap">Print Invoice</span>
            </button>
            <Link to="/staff-invoice-list/invoice-id/email-invoice">
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

export default StaffInvoiceListID;
