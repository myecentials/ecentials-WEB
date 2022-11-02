import React from "react";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Input } from "reactstrap";
import BreadCrumb from "../../components/BreadCrumb";
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
import StaffNavBar from "../../components/StaffComponents/StaffNavBar";
import Header from "../../components/Header";
import DateHeader from "../../components/StaffComponents/DateHeader";

const StaffAddReturn = () => {
  return (
    <>
      <Helmet>
        <title>Add Return</title>
      </Helmet>
      <Header />
      <StaffNavBar />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <DateHeader title="Return" />
          <div className="d-flex justify-content-md-between align-items-center">
            <div className="d-flex mx-4">
              <BreadCrumb
                name="Add Return"
                breadcrumb=""
                hasStyles={true}
                width="8rem"
              />
            </div>
          </div>

          <div className="mt-4 mx-md-3 mx-2">
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
                <div className="row mx-2">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <h6 className="mx-3 text-nowrap">Ship from: </h6>
                      <Input type="select">
                        <option value="">Customer</option>
                      </Input>
                    </div>
                  </div>
                  <div className="col-sm-6"></div>
                </div>
              </div>
              <div className="mx-4 mt-3 text-deep">
                <div
                  className="d-flex justify-content-sm-center align-items-sm-center "
                  style={{ minHeight: "5rem" }}
                >
                  <div className="d-sm-flex align-items-sm-center">
                    <label htmlFor="" className="text-nowrap">
                      Invoice ID
                    </label>
                    <input
                      className="form-control add_return__form mx-sm-3 my-sm-0 my-3"
                      type="text"
                      placeholder="274-256-357"
                    />
                    <input
                      type="submit"
                      value="Add"
                      className="btn ms-bg rounded-pill text-white px-4 btn-sm "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffAddReturn;
