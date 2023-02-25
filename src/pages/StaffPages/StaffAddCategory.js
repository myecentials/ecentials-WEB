import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import menulist from "../../assets/icons/svg/menulist.svg";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Form, FormGroup, Input, Label, Col, Row } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
import StaffNavBar from "../../components/StaffComponents/StaffNavBar";

const StaffAddCategory = () => {
  return (
    <>
      <Helmet>
        <title>Add Categories</title>
      </Helmet>
      <StaffNavBar />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadOutlined name="Products" breadcrumb="/staff-products" />
              <BreadCrumb
                name="Add Category"
                breadcrumb=""
                width="9rem"
                hasStyles={true}
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>

          <div className="mt-4 mx-md-5 mx-2">
            <div
              className="card border-0 pb-3 my-5 rounded"
              style={{ borderRadius: "10px" }}
            >
              <div
                className="ms-bg text-white py-2"
                style={{
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                }}
              >
                <h6 className="d-flex align-items-end justify-content-end mx-3">
                  <div className="btn btn-light">
                    <img src={menulist} alt="" />
                    <b className="mx-2 small" style={{ color: "#4D44B5" }}>
                      Category List
                    </b>
                  </div>
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
                      Category Name*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="category"
                        placeholder="Category Name"
                        type="text"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                </Form>

                <FormGroup row>
                  <Col>
                    <Label>Status*</Label>
                  </Col>
                  <Col sm={10}>
                    <Row>
                      <Col>
                        <FormGroup check>
                          <Input name="active" type="radio" />{" "}
                          <Label check className="small">
                            Active
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col sm={9}>
                        <FormGroup check>
                          <Input name="active" type="radio" />{" "}
                          <Label check className="small">
                            Inactive
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </FormGroup>
                <div className="d-flex justify-content-end align-items-end mt-4">
                  <input
                    type="submit"
                    value="Save"
                    className="btn ms-bg text-white rounded-pill px-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffAddCategory;
