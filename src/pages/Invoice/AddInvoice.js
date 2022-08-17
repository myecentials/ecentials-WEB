import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import invoicelist from "../../assets/icons/svg/invoicelist.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Form, FormGroup, Input, Label, Col, Row, Table } from "reactstrap";
import dustbin from "../../assets/icons/svg/dustbin.svg";

const AddInvoice = () => {
  const handleAddTable = () => {
    console.log("table");
  };
  return (
    <>
      <Helmet>
        <title>Add Invoice</title>
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
                name="Add Invoice"
                breadcrumb=""
                width="8rem"
                hasStyles={true}
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
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
                  <div className="btn btn-light ms-bg">
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
                          <b className="text-deep">Invoice Number*</b>
                        </Label>
                        <Input
                          id="firstName"
                          name="fname"
                          type="text"
                          placeholder="1052"
                          style={{ borderColor: "#C1BBEB" }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="small" for="lname">
                          <b className="text-deep">Details*</b>
                        </Label>
                        <Input
                          id="lastName"
                          name="lname"
                          type="text"
                          placeholder="ORD-2458"
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
                  onClick={() => handleAddTable}
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
              <Table responsive>
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
                      <div className="btn  border">
                        <img src={dustbin} alt="" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="row mt-5">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <div className="bg-white rounded mx-3 py-4 text-end">
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
                            className="border-0 bg order-form-last"
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
                            className="border-0 bg order-form-last"
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
