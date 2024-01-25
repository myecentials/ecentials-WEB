import React from "react";
// import DateHeader from "../../../components/DateHeader";
import menulist from "../../../assets/icons/svg/menulist.svg";
import mail from "../../../assets/icons/svg/whitemail.svg";
import { Helmet } from "react-helmet";
import { Form, FormGroup, Input, Label, Col } from "reactstrap";
import PharmacyName from "../../../components/PharmacyName";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
import BreadOutlined from "../../../components/BreadOutlined";


const MailInvoice = () => {
  return (
    <>
      <Helmet>
        <title> Pharmacy | Mail Invoice</title>
      </Helmet>

        <div className="col-md-9 middle">
          {/* <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <h4 className="text-deep">EMAIL INVOICE</h4>
            </div>
            {/* <div className="d-md-block d-none">
              <NavIcons />
            </div> */}
          {/* </div>  */}
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">EMAIL INVOICE</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadOutlined
                  name="Invoice List"
                  breadcrumb="/pharmacy/invoices/invoice-list"
                  width="8rem"
                />
                <BreadCrumb
                  name="Email Invoice"
                  breadcrumb=""
                  hasStyles={true}
                  width="8rem"
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-md-5 mx-2">
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
                <h6 className="mx-3">Details</h6>
                <h6 className="mx-3">
                  <div className="btn btn-light">
                    <img src={menulist} alt="" />
                    <b className="mx-2 small" style={{ color: "#4D44B5" }}>
                      Invoice List
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
                      Email Address*
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        disabled
                        id="category"
                        name="category"
                        value="example@gmail.com"
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
                      Message
                    </Label>
                    <Col sm={10} className="w-category">
                      <Input
                        id="category"
                        name="category"
                        placeholder="Hello Andrews this is your invoice receipt..."
                        type="textarea"
                        style={{ borderColor: "#C1BBEB" }}
                      />
                    </Col>
                  </FormGroup>
                  <div className="d-flex justify-content-end align-items-end mt-4">
                    <button className="btn ms-bg text-white rounded-pill">
                      <span className="mx-2"> Save</span>
                      <img src={mail} alt="" width={15} />
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default MailInvoice;
