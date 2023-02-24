import React from "react";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import menulist from "../../assets/icons/svg/menulist.svg";
import mail from "../../assets/icons/svg/whitemail.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Form, FormGroup, Input, Label, Col, Table } from "reactstrap";
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
import purplemail from "../../assets/icons/svg/purpleemail.svg";
import printer from "../../assets/icons/svg/printer.svg";
import { Link } from "react-router-dom";
import pharmLogo from "../../assets/icons/svg/pharmlogo.svg";
import updownchev from "../../assets/icons/svg/updownchev.svg";
import blueeye from "../../assets/icons/svg/blueeye.svg";
import edit from "../../assets/icons/svg/edit.svg";
import phonecall from "../../assets/icons/svg/phonecall.svg";
import dustbin from "../../assets/icons/svg/dustbin.svg";
import orders from "../../static/orders";
import logo from "../../logo.svg";
import StaffNavBar from "../../components/StaffComponents/StaffNavBar";
import Header from "../../components/Header";
import DateHeader from "../../components/StaffComponents/DateHeader";

const StaffSales = () => {
  return (
    <>
      <Helmet>
        <title>Staff Sales And Payments</title>
      </Helmet>
      <Header />
      <StaffNavBar />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <DateHeader title="Sales/Payment" />
          <div className="d-flex justify-content-md-between align-items-center"></div>

          <div className="d-flex justify-content-between align-items-center mx-3 mt-5 mb-3">
            <FormGroup row className="mx-2">
              <Label htmlFor="name" sm={4} className="text-nowrap text-purple">
                Invoice No.:
              </Label>
              <Col className="w-category">
                <Input
                  id="category"
                  className="f-border"
                  name="category"
                  placeholder="1052"
                  type="text"
                  style={{ borderColor: "#C1BBEB" }}
                />
              </Col>
            </FormGroup>
            <div className="d-flex justify-content-center">
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
          <div className="bg-white py-5">
            <div className="text-center">
              <img
                src={pharmLogo}
                alt=""
                width={30}
                className="mx-auto d-block"
              />
              <p className="mb-0">Sussan Drug Store Ltd</p>
              <span className="gray-text mt-0">INVOICE: 1052</span>
            </div>

            <div className="d-flex justify-content-between mx-3 align-items-center">
              <div>
                <p className="text-deep mb-0">BILLING FROM</p>
                <div
                  className="d-flexflex-column text-small"
                  style={{ fontSize: "12px" }}
                >
                  <b>Andrews Opoku</b>
                  <p className="gray-text mb-0">Accra, Ghana</p>
                  <p className="gray-text mb-0">Phone: +233 55 974 8280</p>
                  <p className="gray-text mb-0">
                    Email: sussandrugstore@gmail.com
                  </p>
                  <p className="gray-text mb-3">Website: sussandrugstore.com</p>
                  <p className="gray-text mb-0">INVOICE NO</p>
                  <p className="gray-text mb-0">1052</p>
                </div>
              </div>
              <div>
                <p className="text-deep">BILLING TO</p>
                <div
                  className="d-flexflex-column text-small"
                  style={{ fontSize: "12px", textAlign: "right" }}
                >
                  <b>Andrews Opoku</b>
                  <p className="gray-text mb-0">Accra, Ghana</p>
                  <p className="gray-text mb-3">Accra, Ghana</p>
                  <p className="gray-text mb-0">DATE</p>
                  <p className="gray-text mb-0">2022 - 05 -20</p>
                </div>
              </div>
            </div>

            <div className="mx-3">
              <Table borderless bgcolor="white" striped className="mt-4">
                <thead className="text-white ms-bg">
                  <tr className="small">
                    <th className="text-nowrap">SL</th>
                    <th className="text-nowrap">Product</th>
                    <th className="text-nowrap">
                      <img src={updownchev} alt="" className="mx-1" />
                      Quantity
                    </th>
                    <th className="text-nowrap ">
                      <img src={updownchev} alt="" className="mx-1" />
                      Price (GHS)
                    </th>

                    <th className="text-nowrap">Discount Type</th>
                    <th className="text-nowrap">Discount</th>
                    <th className="text-nowrap">Total (GHS)</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(
                    ({ orderId, orderNo, invoiceID, total, name }) => (
                      <tr>
                        <td className="py-3">{orderNo}</td>
                        <td className="py-3">{orderId}</td>
                        <td className="py-3">{invoiceID}</td>
                        <td className="py-3">{name.findName()}</td>
                        <td className="py-3">04/05/2023</td>
                        <td className="py-3 text-center">{total}</td>
                        <td className="py-3"></td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
            <div className="d-flex justify-content-between mx-3 mb-5 align-items-center">
              <div>
                <p className="text-deep">PAYMENT INFO</p>
                <div
                  className="d-flexflex-column text-small"
                  style={{ fontSize: "12px" }}
                >
                  <p className="mb-0">Account: #123 456 789</p>
                  <p className="mb-0">Account Name: Sussan Anukem</p>
                  <p className="mb-0">Bank Details: Add bank</p>
                </div>
              </div>
              <div>
                <div
                  className="d-flexflex-column text-small"
                  style={{ fontSize: "12px" }}
                >
                  <p>Sub Total (GHS): 145.00</p>
                  <p>Tax: 10 %</p>
                  <p>Tax Amount (GHS): 14.5</p>
                  <p className="ms-bg p-2 text-white">
                    Grand Total (GHS): 159.50
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mb-4">
              <span
                className="text-deep mt-5"
                style={{ fontSize: "10px", fontFamily: "qwiqley, helvetica" }}
              >
                Powered By
              </span>{" "}
              <img src={logo} alt="" width={35} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffSales;
