import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Form, FormGroup, Input, Label } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
import StaffNavBar from "../../components/StaffComponents/StaffNavBar";
import Header from "../../components/Header";
import DateHeader from "../../components/StaffComponents/DateHeader";

const StaffAddProducts = () => {
  return (
    <>
      <Helmet>
        <title>Add Products</title>
      </Helmet>
      <Header />
      <StaffNavBar />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <DateHeader title="Add Product" />
          <div className="d-flex justify-content-md-between align-items-center">
            <div className="d-flex mx-4">
              <BreadOutlined name="Products" breadcrumb="/staff-products" />
              <BreadCrumb
                name="Add Products"
                breadcrumb=""
                width="9rem"
                hasStyles={true}
              />
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
                <h6 className="mx-3">Products Details</h6>
              </div>
              <div className="mx-md-4 mt-3 text-deep">
                <div className="mx-3">
                  <Form>
                    <FormGroup>
                      <Label className="small" for="fname">
                        <b>Category*</b>
                      </Label>
                      <Input
                        id="category"
                        name="category"
                        type="select"
                        style={{ borderColor: "#C1BBEB" }}
                      >
                        <option value="tablet">Tablet</option>
                        <option value="oral">Oral</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="fname">
                        <b>Medicine Group*</b>
                      </Label>
                      <Input
                        id="category"
                        name="category"
                        type="select"
                        style={{ borderColor: "#C1BBEB" }}
                      >
                        <option value="tablet">Tablet</option>
                        <option value="oral">Oral</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Medicine Name*</b>
                      </Label>
                      <Input
                        id="number"
                        name="number"
                        type="text"
                        placeholder="Tablet"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Purchase Price per Piece (GHS) *</b>
                      </Label>
                      <Input
                        id="number"
                        name="number"
                        type="text"
                        placeholder="200"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Selling Price per Piece (GHS) *</b>
                      </Label>
                      <Input
                        id="number"
                        name="number"
                        type="text"
                        placeholder="250"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label className="small" for="fname">
                        <b>Dosage*</b>
                      </Label>
                      <Input
                        id="category"
                        name="category"
                        type="select"
                        style={{ borderColor: "#C1BBEB" }}
                      >
                        <option value="tablet">250mg</option>
                        <option value="tablet">500mg</option>
                        <option value="oral">1000mg</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Supplier/Company Name*</b>
                      </Label>
                      <Input
                        id="number"
                        name="number"
                        type="text"
                        placeholder="Tobinco Pharmaceutical Company"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Medicine Description*</b>
                      </Label>
                      <Input
                        maxLength={2000}
                        max={200}
                        height={500}
                        id="number"
                        name="number"
                        type="textarea"
                        placeholder=""
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Expiry Date*</b>
                      </Label>
                      <Input
                        id="number"
                        name="number"
                        type="date"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="small" for="number">
                        <b>Photo*</b>
                      </Label>
                      <div className="drug-photo"></div>
                    </FormGroup>
                  </Form>
                </div>
                <div className="d-flex justify-content-end align-items-end mt-5">
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

export default StaffAddProducts;
