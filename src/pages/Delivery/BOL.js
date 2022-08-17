import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Form, FormGroup, Input, Label, Col } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import { Table } from "reactstrap";

const BOL = () => {
  return (
    <>
      <Helmet>
        <title>Bill Of Loading</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4 flex-wrap">
              <BreadOutlined name="Delivery" breadcrumb="/delivery/orders" />
              <BreadOutlined name="Orders" breadcrumb="/delivery/orders" />
              <BreadOutlined
                name="Assign"
                breadcrumb="/delivery/orders/assign"
              />
              <BreadCrumb name="BOL" breadcrumb="" hasStyles={true} />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>
          <div className="mt-4 mx-3 mb-5">
            <div
              className="card border-0 bg-white bol"
              style={{ borderRadius: "40px" }}
            >
              <h5 className="text-purple text-center bol-header pt-3 mb-0">
                BILL OF LOADING
              </h5>
              <div className="row ">
                <div className="col">
                  {/* SHIP FROM */}

                  <h6 className="small py-3 text-center ms-bg text-white">
                    SHIP FROM
                  </h6>

                  <div className="mt-3">
                    <Form>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Name:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="Doctor Mensah Herbal"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Address:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="PLT 16 BLK III"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Region:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="Ashanti"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          City:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="Kumasi"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </div>

                  {/* SHIP TO FORM */}
                  <div className="text-center ms-bg text-white">
                    <h6 className="small py-3">SHIP TO</h6>
                  </div>
                  <div className="mt-3">
                    <Form>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Name:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="Doctor Mensah Herbal"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Address:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="PLT 16 BLK III"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Region:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="Ashanti"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Ghana Card:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="GHA-0123456789"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </div>

                  {/* THIRD PARTY FREIGHT CHARGES */}

                  <div className="text-center ms-bg text-white">
                    <h6 className="small py-3">
                      THIRD PARTY FREIGHT CHARGES BILL TO
                    </h6>
                  </div>
                  <div className="mt-3">
                    <Form>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Name:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="Doctor Mensah Herbal"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Address:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="PLT 16 BLK III"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Region:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="Ashanti"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Ghana Card:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="GHA-0123456789"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </div>
                </div>
                <div className="col ">
                  <div className="bol-number">
                    <FormGroup row className="mx-2">
                      <Label
                        for="name"
                        sm={3}
                        className="text-nowrap text-purple"
                      >
                        Bol No.:
                      </Label>
                      <Col className="w-category">
                        <Input
                          id="category"
                          className="border-0 bg-light"
                          name="category"
                          placeholder="Doctor Mensah Herbal"
                          type="text"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </Col>
                    </FormGroup>
                  </div>
                  <div className="bol-carrier bol-number">
                    <Form>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Carrier Name:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="Doctor Mensah Herbal"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Vehicle No.:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="PLT 16 BLK III"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mx-2">
                        <Label
                          for="name"
                          sm={3}
                          className="text-nowrap text-purple"
                        >
                          Seal No.:
                        </Label>
                        <Col className="w-category">
                          <Input
                            id="category"
                            className="border-0 bg-light"
                            name="category"
                            placeholder="GHC 40"
                            type="text"
                            style={{ borderColor: "#C1BBEB" }}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </div>
                  <div className="freight-charges bol-number">
                    <h6 className="text-purple mx-3">
                      Freight Charges Terms: ({""}
                      <i>Freight charges are prepaid unless marked otherwise</i>
                      )
                    </h6>
                    <div className="bol-check mx-3 small">
                      <Form>
                        <FormGroup check inline>
                          <Input type="checkbox" className="admin" />
                          <Label check>Prepaid</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input type="checkbox" className="admin" />
                          <Label check>Collect</Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Input type="checkbox" className="admin" />
                          <Label check>3rd Party</Label>
                        </FormGroup>
                      </Form>
                    </div>
                  </div>
                  <div className="cod-amount bol-number">
                    <FormGroup row className="mx-2">
                      <Label
                        for="name"
                        sm={3}
                        className="text-nowrap text-purple"
                      >
                        COD Amount.:
                      </Label>
                      <Col className="w-category">
                        <Input
                          id="category"
                          className="border-0 bg-light"
                          name="category"
                          placeholder="Ashanti"
                          type="text"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </Col>
                    </FormGroup>
                  </div>
                </div>
              </div>
              <h5 className="text-white ms-bg text-center py-3 small">
                CUSTOMER ORDER INFORMATION
              </h5>
              <div className="row b-border">
                <div className="col">
                  <Table borderless striped responsive className="small">
                    <thead className="text-center">
                      <tr>
                        <th>Order ID</th>
                        <th>Packages</th>
                        <th>Weight</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      <tr>
                        <td>#ORD-5786</td>
                        <td>2</td>
                        <td>2.7kg</td>
                      </tr>
                      <tr>
                        <td>#ORD-7523</td>
                        <td>5</td>
                        <td>8.4kg</td>
                      </tr>
                      <tr>
                        <td>#ORD-5583</td>
                        <td>4</td>
                        <td>3.0kg</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="col">
                  <FormGroup row className="mx-2">
                    <Label
                      for="name"
                      sm={5}
                      className="text-nowrap text-purple"
                    >
                      Special instructions:
                    </Label>
                    <Col className="w-category">
                      <Input
                        id="category"
                        className="border-0 bg-light"
                        name="category"
                        placeholder=""
                        type="textarea"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                </div>
              </div>
              <div className="signature">
                <div className="row text-purple">
                  <div className="col">
                    <h6 className="mx-sm-3 pt-2">SHIPPER SIGNATURE/DATE </h6>
                  </div>
                  <h6 className="col pt-2">CUSTOMER SIGNATURE/PICKUP DATE</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-end mx-3 mb-5">
            <button className="btn btn-size btn-success btn-sm rounded">
              Print
            </button>
            <button className="btn btn-size ms-bg text-white btn-sm rounded mx-3">
              Add field
            </button>
            <button className="btn btn-size ms-bg text-white btn-sm rounded">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BOL;
