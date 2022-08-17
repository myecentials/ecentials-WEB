import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Col, Form, FormGroup, Input, Label, Table } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import orders from "../../static/orders";
import updownchev from "../../assets/icons/svg/updownchev.svg";

const OrderDetails = () => {
  return (
    <>
      <Helmet>
        <title>Orders Details</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadOutlined
                name="Orders"
                breadcrumb="/orders"
                hasStyles={true}
              />
              <BreadCrumb
                name="#ORD-5789"
                breadcrumb="/orders/order-details"
                hasStyles={true}
                width="8rem"
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-8">
              <Form>
                <FormGroup row className="mx-2">
                  <Label for="name" sm={3} className="text-nowrap text-purple">
                    Customer Name:
                  </Label>
                  <Col className="w-category">
                    <Input
                      id="category"
                      className="f-border"
                      name="category"
                      placeholder="Andrews Opoku"
                      type="text"
                      style={{ borderColor: "#C1BBEB" }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="mx-2">
                  <Label for="name" sm={3} className="text-nowrap text-purple">
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
                <FormGroup row className="mx-2">
                  <Label for="name" sm={3} className="text-nowrap text-purple">
                    PaymentType:
                  </Label>
                  <Col className="w-category">
                    <Input
                      id="category"
                      className="f-border"
                      name="category"
                      placeholder="Ashanti"
                      type="select"
                      style={{ borderColor: "#C1BBEB" }}
                    >
                      <option value="">Cash</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row className="mx-2">
                  <Label for="name" sm={3} className="text-nowrap text-purple">
                    Order Number:
                  </Label>
                  <Col className="w-category">
                    <Input
                      id="category"
                      className="f-border"
                      name="category"
                      placeholder="ORD-2457"
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
              <Table borderless bgcolor="white" striped responsive>
                <thead className="ms-bg text-white">
                  <tr className="small">
                    <th className="text-nowrap">#</th>
                    <th className="text-nowrap">Product</th>
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
                  {orders.map(
                    ({
                      orderNo,
                      total,
                      productImage,
                      quantity,
                      discountType,
                      discount,
                    }) => (
                      <tr key={orderNo}>
                        <td className="py-3">#{orderNo}</td>
                        <td className="py-3">
                          <img src={productImage} alt="" />
                        </td>
                        <td className="py-3">{quantity}</td>

                        <td className="py-3">{total}</td>
                        <td className="py-3">
                          <span className="rounded-pill border-0 px-3 py-1 small">
                            {discountType}
                          </span>
                        </td>
                        <td className="py-3">
                          <span
                            className="px-3 rounded-pill py-1 small"
                            style={{
                              backgroundColor:
                                discount === "50%" ? "#EBF9F1" : "#FEF2E5",
                              color: discount === "50%" ? "#1F9254" : "#CD6200",
                            }}
                          >
                            {discount}
                          </span>
                        </td>
                        <td className="py-3">{total}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
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
                      for="name"
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
                      Tax:
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
                      Tax Amount:
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
                        className="border-0 bg order-form-last"
                        name="category"
                        placeholder="159.50"
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

          <div className="order-btns mt-3 mb-5  d-flex justify-content-end align-items-end">
            <button className="btn btn-danger btn-lg">
              <span className="small">Cancel Order</span>
            </button>
            <button className="btn ms-bg btn-lg mx-3 text-white">
              <span className="small">Process Order</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
