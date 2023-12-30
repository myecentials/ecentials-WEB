import React from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
import NavIcons from "../../../components/NavIcons";
import SideBar from "../../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../../components/CustomeNav";
import { Input } from "reactstrap";
import { Link } from "react-router-dom";
import PurchaseReportTable from "../../../components/RevenueDashboardComponents/PurchaseReportTable";
import Header from "../../../components/Header";
import PharmacyName from "../../../components/PharmacyName";

const SalesReport = () => {
  return (
    <>
      <Helmet>
        <title>Sales Report</title>
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
                  breadcrumb="/orders"
                  width="11.5rem"
                />
                <BreadCrumb
                  name="Sales Report"
                  breadcrumb="/orders"
                  hasStyles={true}
                  width="10rem"
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="row mx-2 mt-4 gy-md-0 gy-3">
            <div className="col-md">
              <div className="d-flex">
                <button
                  className="btn text-deep text-nowrap"
                  style={{ backgroundColor: " #F7FAFE" }}
                >
                  Start Date
                </button>
                <Input className="order-number  border-0 rounded-0" type="date">
                  <option value="1">select order status</option>
                </Input>
              </div>
            </div>
            <div className="col-md">
              <div className="d-flex">
                <button
                  className="btn text-deep text-nowrap"
                  style={{ backgroundColor: " #F7FAFE" }}
                >
                  End Date
                </button>
                <Input className="order-number  border-0 rounded-0" type="date">
                  <option value="1">select order status</option>
                </Input>
              </div>
            </div>
            <div className="col-md">
              <button className="btn ms-bg text-white border-0 rounded-0">
                Find
              </button>
            </div>
          </div>
          <div className="mt-3 mx-3">
            <div className="row">
              <div className="col-sm">
                <div className="d-flex">
                  <button
                    className="btn text-deep text-nowrap"
                    style={{ backgroundColor: " #F7FAFE" }}
                  >
                    TOTAL
                  </button>
                  <Input
                    typeof="text"
                    className="order-number border-0 rounded-0"
                    type="text"
                  />
                </div>
              </div>
              <div className="col-sm"></div>
              <div className="col-sm"></div>
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
          <div className="mx-3">
            <PurchaseReportTable />
          </div>
          {/* End of Table */}
        </div>
      </div>
    </>
  );
};

export default SalesReport;
