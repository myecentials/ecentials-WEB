import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Input } from "reactstrap";
import BreadOutlined from "../../components/BreadOutlined";
import UserSalesReportTable from "../../components/UserSalesReportTable";

const PurchaseReportCategory = () => {
  return (
    <>
      <Helmet>
        <title>User Sales Report</title>
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
                breadcrumb="/reports/report-dashboard"
                width="11.5rem"
              />
              <BreadCrumb name="Purchase Report" breadcrumb="" width="11rem" />
              <BreadCrumb name="Category" breadcrumb="" hasStyles={true} />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
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
                <button className="btn rounded-0 ms-bg text-white mx-2 px-4">
                  Find
                </button>
              </div>
            </div>
            <div className="col-md"></div>
          </div>
          <div className="mt-sm-3 mx-3">
            <div className="row gy-sm-0 gy-3">
              <div className="col-sm">
                <div className="d-flex">
                  <button
                    className="btn text-deep text-nowrap"
                    style={{ backgroundColor: " #F7FAFE" }}
                  >
                    Filter
                  </button>
                  <Input
                    className="order-number border-0 rounded-0"
                    type="select"
                  >
                    <option value="">Select User</option>
                  </Input>
                </div>
              </div>
              <div className="col-sm">
                <div className="d-flex">
                  <button
                    className="btn text-deep text-nowrap"
                    style={{ backgroundColor: " #F7FAFE" }}
                  >
                    TOTAL
                  </button>
                  <Input
                    className="order-number border-0 rounded-0"
                    type="text"
                  />
                </div>
              </div>

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
          {/* End of Table */}

          <div className="mx-3">
            <UserSalesReportTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseReportCategory;
