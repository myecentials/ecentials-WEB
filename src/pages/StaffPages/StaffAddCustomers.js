import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import menulist from "../../assets/icons/svg/menulist.svg";
import mail from "../../assets/icons/svg/mail.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Label, Col } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
import StaffNavBar from "../../components/StaffComponents/StaffNavBar";
import Header from "../../components/Header";
import DateHeader from "../../components/StaffComponents/DateHeader";

const StaffAddCustomers = () => {
  return (
    <>
      <Helmet>
        <title>Add Customers</title>
      </Helmet>
      <Header />
      <StaffNavBar />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <DateHeader title="Add Customers" />
          <div className="d-flex justify-content-md-between align-items-center">
            <div className="d-flex mx-4">
              <BreadOutlined
                name="Customers"
                breadcrumb="/staff-customers/add-customers"
                width="8rem"
              />
              <BreadCrumb
                name="Add Customers"
                breadcrumb=""
                width="10rem"
                hasStyles={true}
              />
            </div>
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <div
              className="card border-0 pb-3 my-5 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div
                className="ms-bg text-white pt-2 d-flex align-items-center justify-content-between"
                style={{
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                }}
              >
                <h6 className="mx-3 text-nowrap">Add Customer</h6>
                <h6 className="mx-3">
                  <Link
                    to="/staff-customers/customers-list"
                    className="btn btn-light d-flex"
                  >
                    <img src={menulist} alt="" />
                    <b
                      className="mx-2 small text-nowrap"
                      style={{ color: "#4D44B5" }}
                    >
                      Customer List
                    </b>
                  </Link>
                </h6>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <Form>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Customer Name*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="category"
                        placeholder="Andrews Opoku"
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Email Addresss*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="category"
                        placeholder="example@gmail.com"
                        type="email"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Phone*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="category"
                        placeholder="+233545098438"
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Address*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="category"
                        placeholder="PLT 16 BLK III"
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      City*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="category"
                        placeholder="Kumasi"
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Region*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="category"
                        placeholder="Kumasi"
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      htmlFor="exampleEmail"
                      sm={2}
                      className="text-nowrap"
                    >
                      Country*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="category"
                        placeholder="Ghana"
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>

                  <div className="d-flex justify-content-end align-items-end mt-4">
                    <img src={mail} alt="" />
                    <input
                      type="submit"
                      value="Save"
                      className="btn ms-bg text-white rounded-pill px-4"
                    />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffAddCustomers;
