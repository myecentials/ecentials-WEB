import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import invoicelist from "../../assets/icons/svg/invoicelist.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Form, FormGroup, Input, Label, Col, Row, Table } from "reactstrap";
import dustbin from "../../assets/icons/svg/dustbin.svg";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";
import { useState } from "react";
import axios from "../../config/api/axios";
import { fa } from "faker/lib/locales";
import drugs from "../../static/drugs.json";

const AddInvoice = () => {
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

  const [data, setData] = useState([]);
  const [mydata, setMyData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    expiry_date: "",
    quantity: 1,
    selling_price: 0,
    dosage: "",
    total: "",
  });
  const handleChange = (e) => {
    setIsChanging(true);
    setIsClicked(false);
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });

    setIsOpen(true);
    axios
      .post("/pharmacy/drugs/pharmacy-specific-drug-search", {
        search_text: details.name,
        store_id: localStorage.getItem("facility_id"),
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = (id) => {
    setIsOpen(false);
    setIsClicked(true);
    setDetails({
      ...details,
      ...data[id],
      quantity: details.quantity,
      total: details.quantity * data[id].selling_price,
    });
  };

  const tableRow = [];

  const [count, setCount] = useState(0);
  const [tables, setTables] = useState([]);
  const [isCleared, setIsCleared] = useState(false);
  const handleAddTable = () => {
    if (details.name !== "") {
      setTables([...tables, details]);
      setDetails({
        name: "",
        expiry_date: "",
        quantity: 1,
        selling_price: 0,
        dosage: "",
        total: "",
      });
    }
  };

  const handleRemove = (id) => {
    console.log(id);
  };

  const [drugsData, setDrugsData] = useState(drugs);
  drugsData.map((data) => console.log(data.img_url));

  return (
    <>
      <Helmet>
        <title>Add Invoice</title>
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
                  name="Add Invoice"
                  breadcrumb=""
                  width="8rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <div
              className="card border-0 pb-3 my-5 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div
                className="py-2"
                style={{
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                }}
              >
                <span className="d-flex align-items-end justify-content-end mx-3">
                  <div className="btn ms-bg">
                    <img src={invoicelist} alt="" />
                    <span className="mx-2 small text-white">Invoice List</span>
                  </div>
                </span>
                <hr className="mt-2" />
              </div>
              <div className="mx-3">
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="fname">
                          <b className="text-deep">Customer Name*</b>
                        </Label>
                        <Input
                          id="firstName"
                          name="fname"
                          type="text"
                          placeholder="Andrews Opoku"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="lname">
                          <b className="text-deep">Date*</b>
                        </Label>
                        <Input
                          id="lastName"
                          name="lname"
                          type="date"
                          placeholder="04/05/2020"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="fname">
                          <b className="text-deep">Payment Type*</b>
                        </Label>
                        <Input
                          id="firstName"
                          name="fname"
                          type="select"
                          placeholder="cash"
                          style={{ borderColor: "#C1BBEB" }}
                        >
                          <option value="cash">Cash</option>
                          <option value="bank">Bank</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>

              <div className="ms-bg py-2 d-flex justify-content-between align-items-center">
                <h6 className="small text-white mx-3">Medical Information</h6>
                <button
                  className="small mx-3 btn btn-light text-purple"
                  onClick={handleAddTable}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.34752 10.7299H0.382812V6.4946H6.34752V0.565186H10.5828V6.4946H16.6181V10.7299H10.5828V16.7299H6.34752V10.7299Z"
                      fill="#4D44B5"
                    />
                  </svg>
                  <span className="small mx-2"> Add Table</span>
                </button>
              </div>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th className="text-nowrap">Medicine Information</th>
                    <th className="text-nowrap">Expiry Date</th>
                    <th className="text-nowrap">Quantity</th>
                    <th className="text-nowrap">Price</th>
                    <th className="text-nowrap">Dosage</th>
                    <th className="text-nowrap">Total</th>
                    <th className="text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody id="tbody">
                  <tr>
                    <td>
                      <Input
                        type="search"
                        name="name"
                        value={details.name}
                        onChange={handleChange}
                      />
                      <div
                        className={
                          isOpen
                            ? "card border-0 search_text shadow-lg p-2"
                            : "card border-0 search_text_hidden shadow-lg p-2"
                        }
                      >
                        <ul>
                          {data.map(({ name, dosage, _id }, index) => (
                            <li key={index} onClick={() => handleSelect(index)}>
                              {name}({dosage})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={
                          details.expiry_date
                            ? `${new Date(
                                details.expiry_date
                              ).getDay()}/${new Date(
                                details.expiry_date
                              ).getMonth()}/${new Date(
                                details.expiry_date
                              ).getFullYear()}`
                            : ""
                        }
                        disabled
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        min={1}
                        name="quantity"
                        value={details.name ? details.quantity : ""}
                        onChange={handleChange}
                        disabled={details.name ? false : true}
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={details.name ? details.selling_price : ""}
                        disabled
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        name="dosage"
                        value={details.name ? details.dosage : ""}
                        onChange={handleChange}
                        disabled
                      />
                    </td>
                    <td>
                      <Input
                        type="text"
                        value={details.name ? details.total : ""}
                        disabled
                      />
                    </td>
                    <td></td>
                  </tr>
                  {tables.map(
                    (
                      {
                        name,
                        expiry_date,
                        selling_price,
                        dosage,
                        quantity,
                        total,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td>
                          <Input value={name} type="text" disabled />
                        </td>
                        <td>
                          <Input
                            value={`${new Date(
                              expiry_date
                            ).getDay()}/${new Date(
                              expiry_date
                            ).getMonth()}/${new Date(
                              expiry_date
                            ).getFullYear()}`}
                            type="text"
                            disabled
                          />
                        </td>
                        <td>
                          <Input value={quantity} type="text" disabled />
                        </td>
                        <td>
                          <Input value={selling_price} type="text" disabled />
                        </td>
                        <td>
                          <Input value={dosage} type="text" disabled />
                        </td>
                        <td>
                          <Input value={total} type="text" disabled />
                        </td>
                        <td>
                          <div
                            className="btn  border"
                            onClick={() => handleRemove()}
                          >
                            <img src={dustbin} alt="" />
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
              <div></div>
              <div className="row mt-5">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <div className="bg-white rounded mx-3 py-4 ">
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
                            style={{ borderColor: "#C1BBEB" }}
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
                            style={{ borderColor: "#C1BBEB" }}
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
                            style={{ borderColor: "#C1BBEB" }}
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
                            style={{ borderColor: "#C1BBEB" }}
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
                            style={{ borderColor: "#C1BBEB" }}
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
                            style={{ borderColor: "#C1BBEB" }}
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
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                      <div className="d-flex justify-content-end align-items-end mt-4">
                        <button
                          className="btn btn-success"
                          style={{ width: "8rem" }}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          style={{ width: "8rem" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
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

export default AddInvoice;
