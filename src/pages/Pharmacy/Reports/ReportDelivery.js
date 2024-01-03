import React from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
import NavIcons from "../../../components/NavIcons";
import SideBar from "../../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../../components/CustomeNav";
// import { Input } from "reactstrap";
// import BreadOutlined from "../../../components/BreadOutlined";
// import UserSalesReportTable from "../../../components/UserSalesReportTable";
import ReportDeliveryTable from "../../../components/RevenueDashboardComponents/ReportDeliveryTable";
import Header from "../../../components/Header";
import PharmacyName from "../../../components/PharmacyName";

const ReportDelivery = () => {
  return (
    <>
      <Helmet>
        <title>Delivery Reports</title>
      </Helmet>
      <Header />
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">Settings</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadCrumb
                  name="Report Dashboard"
                  breadcrumb="/reports/report-dashboard"
                  width="11.5rem"
                />
                <BreadCrumb name="Delivery" breadcrumb="" hasStyles={true} />
              </div>
            </div>
            <PharmacyName />
          </div>
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex">
              <BreadCrumb
                name="Report Dashboard"
                breadcrumb="/reports/report-dashboard"
                width="11.5rem"
              />
              <BreadCrumb name="Delivery" breadcrumb="" hasStyles={true} />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
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
            <ReportDeliveryTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportDelivery;
