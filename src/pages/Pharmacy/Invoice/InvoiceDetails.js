import React from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
// import SideBar from "../../../components/SideBar";
import { Helmet } from "react-helmet";
// import CustomeNav from "../../../components/CustomeNav";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  // ModalBody,
  Table,
} from "reactstrap";
import BreadOutlined from "../../../components/BreadOutlined";
// import orders from "../../../static/orders";
import updownchev from "../../../assets/icons/svg/updownchev.svg";
// import Header from "../../../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../../config/api/axios";
import PharmacyName from "../../../components/PharmacyName";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { facility_id } from "../../../app/features/authSlice/authSlice";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
  // const [orderCode, setOrderCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [facilityId] = useSelector(facility_id)

  useEffect(() => {
    setIsLoading(true);
    const results = JSON.parse(sessionStorage.getItem("eyeId"));
    setData({ ...data, ...results });
    setIsLoading(false);
  }, [data]);

  const {
    customer_name,
    invoice_number,
    payment_type,
    order_code,
    products_summary,
  } = data;

  const products = [];
  for (let item in products_summary) {
    products.push(products_summary[item]);
  }

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleOrderChange = (e) => {
    e.target.value === `${order_code}` ? setIsEqual(true) : setIsEqual(false);
  };

  const navigate = useNavigate();

  const handleCancelOrder = () => {
    axios
      .post("/pharmacy/orders/cancel-an-order", { order_code: order_code })
      .then((res) => {
        if (res.data.message === "success") {
          navigate("/pharmacy/orders");
        }
      })
      .catch((err) => console.log(err));
  };

  // const handleOpenModel = () => {
  //   setIsOpen(true);
  // };

  let sum = 0;
  for (let total of products) {
    sum += total.prize * total.quantity - total.discount;
  }

  const [, setPData] = useState([]);
  useEffect(() => {
    axios
      .post("/pharmacy/invoice", {
        store_id: facilityId,
      })
      .then((res) => {
        setPData(res.data.data[sessionStorage.getItem("eyeId")]);
      })
      .catch((err) => console.log(err));
  }, [facilityId]);

  return (
    <>
      <Helmet>
        <title>Orders Details</title>
      </Helmet>
   
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">ORDERS</h6>
              <DateHeader />
              <div className="d-flex ">
                <BreadOutlined
                  name="Invoice"
                  breadcrumb="/pharmacy/invoices/invoice-list"
                  hasStyles={true}
                />
                <BreadCrumb
                  name={invoice_number}
                  breadcrumb=""
                  hasStyles={true}
                  width="9rem"
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="row mt-4">
            <div className="col-md-8">
              <Form>
                <FormGroup row className="mx-2">
                  <Label
                    htmlFor="name"
                    sm={3}
                    className="text-nowrap text-purple"
                  >
                    Customer Name:
                  </Label>
                  <Col className="w-category">
                    <Input
                      id="category"
                      className="f-border"
                      name="category"
                      placeholder="Andrews Opoku"
                      value={customer_name}
                      type="text"
                      style={{ borderColor: "#C1BBEB" }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="mx-2">
                  <Label
                    htmlFor="name"
                    sm={3}
                    className="text-nowrap text-purple"
                  >
                    Invoice No.:
                  </Label>
                  <Col className="w-category">
                    <Input
                      id="category"
                      className="f-border"
                      name="category"
                      value={invoice_number}
                      placeholder="1052"
                      type="text"
                      style={{ borderColor: "#C1BBEB" }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="mx-2">
                  <Label
                    htmlFor="name"
                    sm={3}
                    className="text-nowrap text-purple"
                  >
                    PaymentType:
                  </Label>
                  <Col className="w-category">
                    <Input
                      id="category"
                      className="f-border"
                      name="category"
                      placeholder="Ashanti"
                      type="text"
                      value={payment_type}
                      style={{ borderColor: "#C1BBEB" }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="mx-2">
                  <Label
                    htmlFor="name"
                    sm={3}
                    className="text-nowrap text-purple"
                  >
                    Order Number:
                  </Label>
                  <Col className="w-category">
                    <Input
                      id="category"
                      className="f-border"
                      name="category"
                      placeholder="ORD-2457"
                      value={order_code}
                      type="text"
                      style={{ borderColor: "#C1BBEB" }}
                    />
                  </Col>
                </FormGroup>
              </Form>
            </div>
            {/*  */}
            <div className="col-md-4"></div>
          </div>
          <div className="mt-4">
            <div className="mx-3">
              {isLoading ? (
                <Loader />
              ) : (
                <Table borderless bgcolor="white" striped responsive>
                  <thead className="ms-bg text-white">
                    <tr className="small">
                      <th className="text-nowrap">#</th>
                      <th className="text-nowrap">Product Name</th>
                      <th className="text-nowrap">Product Image</th>
                      <th className="text-nowrap">
                        <img src={updownchev} alt="" className="mx-1" />
                        Quantity
                      </th>
                      <th className="text-nowrap ">
                        <img src={updownchev} alt="" className="mx-1" />
                        Price (GHC)
                      </th>

                      <th className="text-nowrap">Discount Type(GHC)</th>
                      <th className="text-nowrap">Discount</th>
                      <th className="text-nowrap">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(
                      (
                        {
                          quantity,
                          prize,
                          drug_name,
                          drug_image,
                          nhis,
                          discount,
                        },
                        index
                      ) => (
                        <tr key={index}>
                          <td className="py-3">#{index + 1}</td>
                          <td className="py-3">{drug_name}</td>
                          <td className="py-3">
                            <img
                              src={drug_image}
                              alt=""
                              className="img-fluid d-block rounded"
                              style={{
                                width: "5rem",
                                height: "3rem",
                                aspectRatio: "3 / 2",
                                objectFit: "contain",
                                mixBlendMode: "darken",
                                pointerEvents: "none",
                              }}
                            />
                          </td>
                          <td className="py-3 text-center">{quantity}</td>

                          <td className="py-3">{prize}</td>
                          <td className="py-3">
                            <span className="rounded-pill border-0 px-3 py-1 small">
                              {nhis}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="px-3 rounded-pill py-1 small">
                              {discount}
                            </span>
                          </td>
                          <td className="py-3">
                            {prize * quantity - discount}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
          {/* End of Table */}

          <div className="row mt-5">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div className="bg-white rounded mx-3 py-4">
                <Form>
                  <FormGroup row className="mx-2">
                    <Label
                      htmlFor="name"
                      sm={5}
                      className="text-nowrap text-purple"
                    >
                      Sub Total (GHC):
                    </Label>
                    <Col className="w-category">
                      <Input
                        disabled
                        id="category"
                        className="border-0 order-form"
                        name="category"
                        placeholder={sum}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className="mx-2">
                    <Label
                      htmlFor="name"
                      sm={5}
                      className="text-nowrap text-purple"
                    >
                      Tax:
                    </Label>
                    <Col className="w-category">
                      <Input
                        disabled
                        id="category"
                        className="border-0 order-form"
                        name="category"
                        placeholder="0"
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className="mx-2">
                    <Label
                      htmlFor="name"
                      sm={5}
                      className="text-nowrap text-purple"
                    >
                      Tax Amount:
                    </Label>
                    <Col className="w-category">
                      <Input
                        disabled
                        id="category"
                        className="border-0 order-form"
                        name="category"
                        placeholder="0"
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className="mx-2">
                    <Label
                      htmlFor="name"
                      sm={5}
                      className="text-nowrap text-purple"
                    >
                      Grand Total (GHC):
                    </Label>
                    <Col className="w-category">
                      <Input
                        disabled
                        id="category"
                        className="border-0 bg order-form-last"
                        name="category"
                        placeholder={sum}
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </div>

            {/*  */}
          </div>

          <Modal isOpen={isOpen} centered={true}>
            <div className="card border-0 modal_card">
              <CgClose className="close_modal" onClick={handleModalClose} />
              <p className="pt-3 mx-3">Are you absolutely sure?</p>
              <p className="py-3 px-3 warning_bg">
                Unexpected bad things will happen if you don’t read this!
              </p>
              <p className="px-3">
                This action cannot be undone. This will permanently cancel{" "}
                <b>order with code {order_code}</b> information
              </p>
              <p className="mx-3">
                Please type Order code <b>{order_code}</b> to confirm.
              </p>
              <input
                type="text"
                className="form-control delete_staff_input"
                placeholder={order_code}
                onChange={handleOrderChange}
              />
              <input
                type="submit"
                value="I understand the consequence, Cancel order"
                className={
                  isEqual
                    ? "form-control btn btn-outline-danger delete_staff_input my-4 delete_hover"
                    : "form-control btn btn-outline-danger delete_staff_input disabled  my-4 delete_hover"
                }
                onClick={handleCancelOrder}
              />
            </div>
          </Modal>

          {/* <div className="order-btns mt-3 mb-5  d-flex justify-content-end align-items-end">
            <button
              className=" btn btn-danger btn-lg py-2 px-4 rounded"
              disabled={data.order_status == "Cancelled"}
            >
              <span className="small" onClick={handleOpenModel}>
                Cancel Order
              </span>
            </button>
            <button className="btn btn-success ms-bg btn-lg mx-3 text-white py-2 px-4 rounded">
              <span className="small">Process Order</span>
            </button>
          </div> */}
        </div>
    </>
  );
};

export default OrderDetails;
