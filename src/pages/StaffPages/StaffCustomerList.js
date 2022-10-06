import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import BreadOutlined from "../../components/BreadOutlined";
import CustomerListTable from "../../components/CustomerListTable";
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
import StaffCustomerListTable from "../../components/StaffComponents/StaffCustomerListTable";

const StaffCustomerList = () => {
  return (
    <>
      <Helmet>
        <title>Customers List</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadOutlined
                name="Customer"
                breadcrumb="/staff-customers/add-customers"
                width="8rem"
              />
              <BreadCrumb
                name="Customer List"
                breadcrumb=""
                width="9rem"
                hasStyles={true}
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <StaffCustomerListTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffCustomerList;
