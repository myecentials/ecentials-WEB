import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Input } from "reactstrap";
import ManufacturerReturnTable from "../../components/ManufacturerReturnTable";
import InvoiceReturnListTable from "../../components/InvoiceRetrunListTable";
import BreadOutlined from "../../components/BreadOutlined";
import SearchBar from "../../components/SearchBar";
import UserSalesReportTable from "../../components/UserSalesReportTable";
import CustomerMapLocation from "../../components/RevenueDashboardComponents/CustomerMapLocation";

const CustomerMapLocationDetails = () => {
  return (
    <>
      <Helmet>
        <title>Customer Map Location Details</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadCrumb
                name="Report Dashboard"
                breadcrumb=""
                hasStyles={true}
                width="11.5rem"
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>

          <div className="row mx-3 mt-5">
            <div className="col-9">
              <CustomerMapLocation />
            </div>
            <div className="col-3"></div>
          </div>

          <div className="mt-4 mx-3">
            <div className="card border-0">
              <div className="d-md-flex justify-content-between align-items-center m-3">
                <div className="d-flex">
                  <div>
                    <h6 className="text-deep">Sales Report</h6>
                    <p className="gray-text small">
                      More than 400+ new reviews
                    </p>
                  </div>
                </div>
                <div className="d-flex">
                  <button className="btn-refresh">Refresh</button>
                  <button className="btn-export">Export as PDF</button>
                </div>
              </div>
            </div>
          </div>
          {/* End of Table */}

          <div className="mx-3">
            <UserSalesReportTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerMapLocationDetails;
