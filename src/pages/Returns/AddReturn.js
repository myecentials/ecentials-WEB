import React from "react";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Input } from "reactstrap";
import BreadCrumb from "../../components/BreadCrumb";

const AddReturn = () => {
  return (
    <>
      <Helmet>
        <title>Add Return</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4"></div>
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
                  className="d-flex justify-content-center align-items-center "
                  style={{ height: "5rem" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddReturn;
