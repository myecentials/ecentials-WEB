import React from "react";
import DateHeader from "../../components/DateHeader";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import BreadOutlined from "../../components/BreadOutlined";
import ManufacturerTable from "../../components/ManufacturerTable";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";

const ManufacturerList = () => {
  return (
    <>
      <Helmet>
        <title>Manufacturer List</title>
      </Helmet>

        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">WHOLESALER</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadOutlined
                  name="Wholesaler"
                  breadcrumb="/manufacturer/add-manufacturer"
                  width="9rem"
                />
                <BreadCrumb
                  name="Wholesaler List"
                  breadcrumb=""
                  width="11rem"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <ManufacturerTable />
          </div>
        </div>
    </>
  );
};

export default ManufacturerList;
