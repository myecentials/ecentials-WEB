import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import successIcon from "../../assets/icons/svg/success.svg";
import qrcode from "../../assets/icons/svg/qrcode.svg";
import CustomeNav from "../../components/CustomeNav";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Table,
  Modal,
  ModalBody,
} from "reactstrap";
import dustbin from "../../assets/icons/svg/dustbin.svg";
import blueeye from "../../assets/icons/svg/blueeye.svg";
import SearchBar from "../../components/SearchBar";
import InvoiceDrugCard from "../../components/InvoiceDrugCard";
import orders from "../../static/orders";
import Header from "../../components/Header";

const InvoicePOS = () => {
  const [focusAfterClose, setFocusAfterClose] = useState(false);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

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

  return (
    <>
      <Helmet>
        <title>Invoice POS</title>
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
            <div className="mx-4 d-none d-md-block">
              <h5 className="text-deep">Company Name</h5>
              <h5 className="small light-deep">Orange Drugs Limited</h5>
            </div>
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <div
              className="card bg border-0 pb-3 my-5 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div className="py-2 ms-bg mb-2">
                <div className="row mx-3">
                  <div className="col-sm-6">
                    <div className="row gy-md-0 gy-2">
                      <div className="col-sm-6">
                        <SearchBar radius="5px" />
                      </div>
                      <div className="col-sm-6">
                        <Input type="select">
                          <option value="">Select medicine</option>
                        </Input>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6"></div>
                </div>
              </div>

              <div className="d-lg-flex my-4">
                <div className="invoice-left-width">
                  <button className="btn ms-bg text-white mb-2 btn-width">
                    All
                  </button>
                  <button className="btn ms-bg text-white mb-2 btn-width">
                    Medicine
                  </button>
                  <button className="btn ms-bg text-white mb-2 btn-width">
                    Liquid
                  </button>
                  <button className="btn ms-bg text-white mb-2 btn-width">
                    Syrup
                  </button>
                  <button className="btn ms-bg text-white mb-2 btn-width">
                    Tablet
                  </button>
                  <button className="btn ms-bg text-white mb-2 btn-width">
                    Oitment
                  </button>
                  <button className="btn ms-bg text-white mb-2 btn-width">
                    Cream
                  </button>
                </div>
                <div className="mx-md-4">
                  <div className="invoice-grid">
                    {orders.map(() => (
                      <InvoiceDrugCard />
                    ))}
                  </div>
                </div>
              </div>

              <div className="ms-bg py-2 d-flex  align-items-center">
                <button
                  className="btn card border-0 gray-text mx-3"
                  style={{ width: "16rem", height: "2.2rem" }}
                >
                  <div className="d-flex">
                    <img src={qrcode} alt="" width={25} />
                    <span className="small mx-2 invoice-trauancate">
                      {" "}
                      Barcode or QR-code scan
                    </span>
                  </div>
                </button>

                <button
                  className="btn card border-0 gray-text"
                  style={{ width: "16rem", height: "2.2rem" }}
                >
                  <span className="small invoice-trauancate">
                    Manually input Barcode
                  </span>
                </button>
              </div>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Medicine Information</th>
                    <th className="text-nowrap">Batch</th>
                    <th className="text-nowrap">Expiry Date</th>
                    <th className="text-nowrap">Quantity</th>
                    <th className="text-nowrap">Price</th>
                    <th className="text-nowrap">Discount %</th>
                    <th className="text-nowrap">Total</th>
                    <th className="text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Input type="text" />
                    </td>
                    <td>
                      <Input type="select">
                        <option value="">Select Batch</option>
                      </Input>
                    </td>
                    <td>
                      <Input type="date" />
                    </td>
                    <td>
                      <Input type="number" min={0} />
                    </td>
                    <td>
                      <Input type="text" />
                    </td>
                    <td>
                      <Input type="text" />
                    </td>
                    <td>
                      <Input type="text" disabled placeholder="50" />
                    </td>
                    <td>
                      <div className="d-flex">
                        <button className="btn  border">
                          <img src={dustbin} alt="" />
                        </button>
                        <button className="btn mx-2 border">
                          <img src={blueeye} alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="row mt-5">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <div className=" rounded mx-3 py-4 ">
                    <Form>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={5}
                          className="text-nowrap text-purple"
                        >
                          Invoice discount:
                        </Label>
                        <Col className="w-category">
                          <Input
                            disabled
                            id="category"
                            className="border-0 order-form"
                            name="category"
                            placeholder="150.00"
                            type="text"
                            style={{
                              borderColor: "#C1BBEB",
                              background: "#F7FAFE",
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={5}
                          className="text-nowrap text-purple"
                        >
                          Total discount:
                        </Label>
                        <Col className="w-category">
                          <Input
                            disabled
                            id="category"
                            className="border-0 order-form"
                            name="category"
                            placeholder="10%"
                            type="text"
                            style={{
                              borderColor: "#C1BBEB",
                              background: "#F7FAFE",
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={5}
                          className="text-nowrap text-purple"
                        >
                          VAT:
                        </Label>
                        <Col className="w-category">
                          <Input
                            disabled
                            id="category"
                            className="border-0 order-form"
                            name="category"
                            placeholder="15.0"
                            type="text"
                            style={{
                              borderColor: "#C1BBEB",
                              background: "#F7FAFE",
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={5}
                          className="text-nowrap text-purple"
                        >
                          Grand Total (GHC):
                        </Label>
                        <Col className="w-category">
                          <Input
                            disabled
                            id="category"
                            className="border-0 bg order-form"
                            name="category"
                            placeholder="159.50"
                            type="text"
                            style={{
                              borderColor: "#C1BBEB",
                              background: "#F7FAFE",
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={5}
                          className="text-nowrap text-purple"
                        >
                          Paid:
                        </Label>
                        <Col className="w-category">
                          <Input
                            disabled
                            id="category"
                            className="border-0 bg order-form"
                            name="category"
                            placeholder="159.50"
                            type="text"
                            style={{
                              borderColor: "#C1BBEB",
                              background: "#F7FAFE",
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={5}
                          className="text-nowrap text-purple"
                        >
                          Change:
                        </Label>
                        <Col className="w-category">
                          <Input
                            disabled
                            id="category"
                            className="border-0 bg order-form"
                            name="category"
                            placeholder="159.50"
                            type="text"
                            style={{
                              borderColor: "#C1BBEB",
                              background: "#F7FAFE",
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={5}
                          className="text-nowrap text-purple"
                        >
                          <b>Net Total:</b>
                        </Label>
                        <Col className="w-category">
                          <Input
                            disabled
                            id="category"
                            className="border-0 bg order-form-last"
                            name="category"
                            placeholder="159.50"
                            type="text"
                            style={{
                              borderColor: "#C1BBEB",
                              background: "#F7FAFE",
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <div className="d-flex justify-content-end align-items-end mt-4">
                        <button
                          type="button"
                          className="btn btn-success"
                          style={{ width: "8rem" }}
                          onClick={toggle}
                        >
                          Cash
                        </button>
                        <button
                          type="button"
                          className="btn ms-bg text-white mx-2"
                          style={{ width: "8rem" }}
                          onClick={toggle}
                        >
                          Bank
                        </button>
                      </div>
                    </Form>
                    <Modal
                      returnFocusAfterClose={focusAfterClose}
                      isOpen={open}
                      centered={true}
                    >
                      <ModalBody>
                        <img
                          src={successIcon}
                          alt=""
                          className="mx-auto d-block"
                        />
                        <div className="text-center">
                          <h3 className="text-deep mt-2">Success</h3>
                          <p className="text-deep">Do want to print invoice?</p>
                        </div>
                      </ModalBody>

                      <div className="d-flex pb-4 justify-content-center align-items-center mx-auto">
                        <button
                          className="btn btn-light mx-2"
                          onClick={toggle}
                          style={{ width: "7rem" }}
                        >
                          No
                        </button>
                        <button
                          className="btn btn-success text-white mx-2"
                          onClick={toggle}
                          style={{ width: "7rem" }}
                        >
                          Yes
                        </button>
                      </div>
                    </Modal>
                  </div>
                </div>

                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePOS;
