import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import menulist from "../../assets/icons/svg/menulist.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import pharmLogo from "../../assets/icons/svg/pharmlogo.svg";
import { Table } from "react-bootstrap";
import logo from "../../logo.svg";

const InvoiceList = () => {
  return (
    <>
      <Helmet>
        <title>Invoice List</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
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
                <hr />
                <div className="pb-4 mt-4 d-flex justify-content-center align-items-center">
                  <span className="small deliverer-name">Powered By:</span>
                  <span>
                    <img src={logo} alt="" width={50} className="mb-2 mx-2" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-5">
            <button className="btn bg-white text-purple">
              <img src={menulist} alt="" /> Invoice List
            </button>
            <button className="btn ms-bg text-white mx-3">Print Invoice</button>
            <Link to="/invoice-list/invoice-id/email-invoice">
              <button className="btn bg-white text-purple">
                <svg
                  width="23"
                  height="16"
                  viewBox="0 0 23 16"
                  fill="#4d44b5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.5 0H3.5C2.70435 0 1.94129 0.316071 1.37868 0.87868C0.81607 1.44129 0.5 2.20435 0.5 3V13C0.5 13.7956 0.81607 14.5587 1.37868 15.1213C1.94129 15.6839 2.70435 16 3.5 16H19.5C20.2956 16 21.0587 15.6839 21.6213 15.1213C22.1839 14.5587 22.5 13.7956 22.5 13V3C22.5 2.20435 22.1839 1.44129 21.6213 0.87868C21.0587 0.316071 20.2956 0 19.5 0ZM20.5 12.75L15.6 8.35L20.5 4.92V12.75ZM2.5 4.92L7.4 8.35L2.5 12.75V4.92ZM9.08 9.53L10.93 10.82C11.0974 10.9361 11.2963 10.9984 11.5 10.9984C11.7037 10.9984 11.9026 10.9361 12.07 10.82L13.92 9.53L18.92 14H4.1L9.08 9.53ZM3.5 2H19.5C19.6857 2.00149 19.8673 2.05467 20.0245 2.15358C20.1817 2.25249 20.3083 2.39322 20.39 2.56L11.5 8.78L2.61 2.56C2.69171 2.39322 2.81826 2.25249 2.97545 2.15358C3.13265 2.05467 3.31428 2.00149 3.5 2Z"
                    fill="#4d44b5"
                  />
                </svg>
                Email Invoice
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceList;
