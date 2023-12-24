import React from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
import NavIcons from "../../../components/NavIcons";
import SideBar from "../../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../../components/CustomeNav";
import BreadOutlined from "../../../components/BreadOutlined";
import CustomerListTable from "../../../components/CustomerListTable";
import Header from "../../../components/Header";
import PharmacyName from "../../../components/PharmacyName";

const CustomerList = () => {
  return (
    <>
      <Helmet>
        <title>Customers List</title>
      </Helmet>

        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">CUSTOMERS</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadOutlined
                  name="Customer"
                  breadcrumb="/customers/add-customers"
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
            <PharmacyName />
          </div>

          <div className="mt-4 mx-md-3 mx-2">
            <CustomerListTable />
          </div>
        </div>
    </>
  );
};

export default CustomerList;
