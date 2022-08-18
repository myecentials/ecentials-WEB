import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import BreadOutlined from "../../components/BreadOutlined";
import ManufacturerTable from "../../components/ManufacturerTable";

const ManufacturerList = () => {
  return (
    <>
      <Helmet>
        <title>Manufacturer List</title>
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
                name="Manufacturer"
                breadcrumb="/manufacturer/add-manufacturer"
                width="9rem"
              />
              <BreadCrumb
                name="Manufacturer List"
                breadcrumb=""
                width="11rem"
                hasStyles={true}
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <ManufacturerTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManufacturerList;
