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
import StaffNavBar from "../../components/StaffComponents/StaffNavBar";
import Header from "../../components/Header";
import DateHeader from "../../components/StaffComponents/DateHeader";

const StaffCustomerList = () => {
  return (
    <>
      <Helmet>
        <title>Customers List</title>
      </Helmet>
      <Header />
      <StaffNavBar />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <DateHeader title="Customer List" />
          <div className="d-flex justify-content-md-between align-items-center">
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
