import React, { useRef, useState } from "react";
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
import PharmacyName from "../../components/PharmacyName";
import drug1 from "../../assets/images/png/oraddrug4.png";
import axios from "../../config/api/axios";
import { useEffect } from "react";
import Category from "../Products/Category";
import { de } from "faker/lib/locales";
import { date } from "faker/lib/locales/az";

const ProcessPrescription = () => {
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

  const [searchText, setSearchText] = useState("");
  const [selectCat, setSelectCat] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Fetch Drugs in pharmacy
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(
        "/pharmacy/drugs",
        {
          store_id: sessionStorage.getItem("facility_id"),
        },
        { headers: { "auth-token": sessionStorage.getItem("userToken") } }
      )
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch All Category
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .post(
        "/pharmacy/drug-category/fetch-drug-categories",
        {
          pharmacy_id: sessionStorage.getItem("facility_id"),
        },
        { headers: { "auth-token": sessionStorage.getItem("userToken") } }
      )
      .then((res) => {
        console.log(res);
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [details, setDetails] = useState({
    name: "",
    expiry_date: "",
    quantity: "",
    selling_price: 0,
    discount: 0,
    total: 0,
    isChecked: false,
  });

  const [newData, setNewData] = useState([]);

  const handleChange = (e, itemId) => {
    const name = e.target.name;
    const value = e.target.value;
    setSelectedTable((prevSelectedTable) =>
      prevSelectedTable.map((item) => {
        // console.log(item._id, itemId);
        if (item._id == itemId) {
          return {
            ...item,
            [name]: value,
            total: item.quantity * item.selling_price - item.discount,
          };
        }
        return item;
      })
    );
  };

  const [isFocuse, setIsFocuse] = useState(false);

  // HANDLECLICK
  const handleClick = (index, id) => {
    sessionStorage.setItem("drug_id", id);
    setDetails({
      ...details,
      ...data.filter(({ _id }) => _id === id)[0],
      isChecked: true,
    });
  };

  // HANDLE SELECT
  const [selectedTable, setSelectedTable] = useState([]);

  const handleCheck = (e, id, index) => {
    const value = e.target.checked;
    if (!value) {
      setSelectedTable(selectedTable.filter(({ _id }, i) => _id !== id));
    } else {
      setSelectedTable([
        ...selectedTable,
        ...data.filter(({ _id }) => _id === id),
      ]);
    }
  };

  const [tables, setTables] = useState([]);
  const handleAddTable = () => {
    if (details.name !== "") {
      selectedTable.forEach((table) => {
        if (!tables.find((t) => t.name === table.name)) {
          tables.push({ ...table, quantity: table.quantity || 1, total: 0 });
        }
      });

      setDetails({
        name: "",
        expiry_date: "",
        quantity: 1,
        selling_price: 0,
        discount: 0,
        total: 0,
      });
    }

    setSelectedTable([]);
  };

  const newTable = [];

  const handleRemove = (id) => {
    setTables(tables.filter(({ _id }) => _id !== id));
  };

  const newDate = new Date();
  let day = newDate.getDate();
  let mon = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  if (day.toString().length === 1) {
    day = `0${day}`;
  }
  if (mon.toString().length === 1) {
    mon = `0${mon}`;
  }

  const [info, setInfo] = useState({
    customer_name: "",
    payment_type: "cash",
    // invoice_discount: 0,
    grand_total: 0,
    // amount_paid: 0,
    change: 0,
    net_total: 0,
    date: `${day}/${mon}/${year}`,
  });

  const [isFocused, setIsFocused] = useState(true);
  let sum = 0;
  const handleTotal = () => {
    setIsFocused(false);
    tables.forEach(
      ({ quantity, selling_price }) => (sum += quantity * selling_price)
    );
    setInfo({ ...info, grand_total: sum });
  };

  const handleInvoiceChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo({ ...info, [name]: value });
  };

  const [invoiceDetails, setInvoiceDetails] = useState({
    store_id: sessionStorage.getItem("facility_id"),
    name: sessionStorage.getItem("name"),
    grand_total: 0,
    delivery_date: newDate,
    delivery_method: "Pickup",
    product_summary: [],
  });

  // const formData = new FormData();
  // formData.append("store_id", invoiceDetails.store_id);
  // formData.append("name", invoiceDetails.name);
  // formData.append("customer_name", info.customer_name);
  // formData.append("grand_total", info.grand_total);
  // formData.append("delivery_date", invoiceDetails.delivery_date);
  // formData.append("payment_type", info.payment_type);
  // formData.append("delivery_method", invoiceDetails.delivery_method);
  // for (let i = 0; i < tables.length; i++) {
  //   formData.append("products_summary[]", tables[i]);
  // }

  const formData = new FormData();
  formData.append("name", "Andrews Opoku");

  const handlePostInvoice = (e) => {
    e.preventDefault();
    axios
      .post(
        "/pharmacy/invoice/add-invoice",
        {
          store_id: invoiceDetails.store_id,
          name: invoiceDetails.name,
          grand_total: info.grand_total,
          delivery_date: invoiceDetails.delivery_date,
          delivery_method: invoiceDetails.delivery_method,
          products_summary: tables.map((item) => item),
        },
        { headers: { "auth-token": sessionStorage.getItem("userToken") } }
      )
      .then((res) => {
        console.log(res);
        if (res.data.message === "success") {
          setIsOpen(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const [isDate, setIsDate] = useState(false);
  const handleDate = () => {
    setIsDate(true);
  };

  const [pdata, setPData] = useState([]);
  useEffect(() => {
    axios
      .post("/prescriptions/get-prescriptions-for-pharmacy", {
        store_id: sessionStorage.getItem("facility_id"),
      })
      .then((res) => {
        console.log(res);
        setPData(res.data.data[sessionStorage.getItem("presId")]);
      })
      .catch((err) => console.log(err));
  }, []);

  const { image } = pdata;

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
                  name="Prescriptions"
                  breadcrumb="/orders/prescription"
                  width="8rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <img
              src={image}
              alt=""
              className="img-fluid d-block mx-auto"
              width={500}
              style={{
                aspectRatio: "3 / 2",
                objectFit: "contain",
                mixBlendMode: "darken",
                pointerEvents: "none",
              }}
            />

            <div
              className="card bg border-0 pb-3 my-5 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div className="py-2 ms-bg mb-2">
                <div className="row mx-3">
                  <div className="col-sm-9">
                    <div className="row gy-md-0 gy-2">
                      <div className="col-sm-4">
                        <input
                          type="search"
                          className="form-control"
                          onChange={(e) => setSearchText(e.target.value)}
                          placeholder="search drug"
                        />
                      </div>
                      <div className="col-sm-4">
                        <Input
                          type="select"
                          onChange={(e) => setSelectCat(e.target.value)}
                        >
                          <option value="All">All</option>
                          {category.map(({ name, index }) => (
                            <option value={name} key={index}>
                              {name}
                            </option>
                          ))}
                        </Input>
                      </div>
                      <div className="col-sm-4">
                        <Input
                          type={isDate ? "date" : "text"}
                          value={info.date}
                          name="date"
                          placeholder="dd/mm/yyyy"
                          onChange={handleInvoiceChange}
                          onClick={handleDate}
                        ></Input>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-sm-6"></div> */}
                </div>
              </div>

              <div className="mx-md-3">
                <div className="invoice-grid">
                  {data
                    .filter(({ name }) => {
                      return name.toLowerCase() === ""
                        ? name.toLowerCase()
                        : name.toLowerCase().includes(searchText.toLowerCase());
                    })
                    .filter(({ medicine_group }) => {
                      return selectCat.toLowerCase() === "all"
                        ? medicine_group
                        : medicine_group
                            .toLowerCase()
                            .includes(selectCat.toLowerCase());
                    })
                    .map(
                      (
                        {
                          image,
                          name,
                          medicine_group,
                          selling_price,
                          total_stock,
                          _id,
                        },
                        index
                      ) => (
                        <InvoiceDrugCard
                          drug_img={image}
                          drug_name={name}
                          price={selling_price}
                          stock={total_stock}
                          category={medicine_group}
                          drug_count="0"
                          id={_id}
                          handleClick={() => handleClick(index, _id)}
                          handleChange={(e) => handleCheck(e, _id, index)}
                          className="card rounded invoice-card shadow-sm selected_border"
                          // : "card rounded invoice-card shadow-sm selected_border"
                        />
                      )
                    )}
                </div>
              </div>

              <div className="ms-bg py-2 d-flex  align-items-center">
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
                    <th className="text-nowrap">Discount %</th>
                    <th className="text-nowrap">Total</th>
                    <th className="text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTable.map((item) => (
                    <tr>
                      <td>
                        <Input
                          type="text"
                          name="name"
                          value={item.name}
                          disabled
                          className="bg-white"
                        />
                      </td>

                      <td>
                        <Input
                          type="text"
                          name="expiry_date"
                          value={
                            item.name === ""
                              ? ""
                              : `${new Date(
                                  item.expiry_date
                                ).getDate()}/${new Date(
                                  item.expiry_date
                                ).getMonth()}/${new Date(
                                  item.expiry_date
                                ).getFullYear()}`
                          }
                          disabled
                          className="bg-white"
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          min={1}
                          name="quantity"
                          value={Number(item.quantity) || 1}
                          onChange={(e) => handleChange(e, item._id)}
                          disabled={details.name === ""}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          name="selling_price"
                          value={item.selling_price}
                          disabled
                          className="bg-white"
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          name="discount"
                          value={item.discount}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          name="total"
                          value={
                            item.quantity * item.selling_price -
                              item.discount || item.selling_price
                          }
                          disabled
                          className="bg-white"
                        />
                      </td>
                      <td>
                        {/* <div className="d-flex">
                          <button className="btn  border">
                            <img src={dustbin} alt="" />
                          </button>
                          <button className="btn mx-2 border">
                            <img src={blueeye} alt="" />
                          </button>
                        </div> */}
                      </td>
                    </tr>
                  ))}

                  {tables.map(
                    (
                      {
                        name,
                        expiry_date,
                        selling_price,
                        discount,
                        quantity,
                        total,
                        _id,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td>
                          <Input value={name} type="text" disabled />
                        </td>
                        <td>
                          <Input
                            value={`${new Date(expiry_date).getDate()}/${
                              new Date(expiry_date).getMonth() + 1
                            }/${new Date(expiry_date).getFullYear()}`}
                            type="text"
                            disabled
                          />
                        </td>
                        <td>
                          <Input value={quantity || 1} type="text" disabled />
                        </td>
                        <td>
                          <Input value={selling_price} type="text" disabled />
                        </td>
                        <td>
                          <Input value={discount} type="text" disabled />
                        </td>
                        <td>
                          <Input
                            value={
                              quantity * selling_price - discount ||
                              selling_price
                            }
                            type="text"
                            disabled
                          />
                        </td>
                        <td>
                          <div
                            className="btn  border"
                            onClick={() => handleRemove(_id)}
                          >
                            <img src={dustbin} alt="" />
                          </div>
                        </td>
                      </tr>
                    )
                  )}
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
                          Customer Name:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 order-form"
                            name="customer_name"
                            value={info.customer_name}
                            type="text"
                            style={{
                              borderColor: "#C1BBEB",
                              background: "#F7FAFE",
                            }}
                            onChange={handleInvoiceChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={5}
                          className="text-nowrap text-purple"
                        >
                          Payment Type:
                        </Label>
                        <Col className="w-category">
                          <Input
                            className="border-0 order-form"
                            name="payment_type"
                            value={info.payment_type}
                            type="select"
                            style={{
                              borderColor: "#C1BBEB",
                              background: "#F7FAFE",
                            }}
                            onChange={handleInvoiceChange}
                          >
                            <option value="cash">Cash</option>
                            <option value="bank">Bank</option>
                          </Input>
                        </Col>
                      </FormGroup>
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
                            name="invoice_discount"
                            value={info.invoice_discount}
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
                            name="grand_total"
                            value={info.grand_total}
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
                            id="category"
                            className="border-0 bg order-form"
                            name="amount_paid"
                            value={info.amount_paid}
                            type="text"
                            style={{
                              borderColor: "#C1BBEB",
                              background: "#F7FAFE",
                            }}
                            onChange={handleInvoiceChange}
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
                            name="change"
                            value={info.change}
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
                            name="net_total"
                            value={info.net_total}
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
                          className="ms-bg text-white mx-2 py-2 rounded"
                          style={{ width: "8rem" }}
                          onClick={handleTotal}
                          disabled={tables.length == 0}
                        >
                          compute
                        </button>
                        <button
                          disabled={isFocused}
                          type="submit"
                          className="btn btn-success"
                          style={{ width: "8rem" }}
                          onClick={handlePostInvoice}
                        >
                          Save
                        </button>
                      </div>
                    </Form>
                    <Modal
                      returnFocusAfterClose={focusAfterClose}
                      isOpen={isOpen}
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
                          onClick={() => setIsOpen(false)}
                          style={{ width: "7rem" }}
                        >
                          No
                        </button>
                        <button
                          className="btn btn-success text-white mx-2"
                          onClick={() => setIsOpen(false)}
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

export default ProcessPrescription;