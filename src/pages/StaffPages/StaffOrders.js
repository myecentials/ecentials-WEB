import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Input } from "reactstrap";
import OrderTable from "../../components/OrderTable";
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
import StaffOrderTable from "../../components/StaffComponents/StaffOrdersTables";
import StaffNavBar from "../../components/StaffComponents/StaffNavBar";

const StaffOrdersTable = () => {
  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <StaffNavBar />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <StaffSideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadCrumb
                name="Orders"
                breadcrumb="/staff-orders"
                hasStyles={true}
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>
          <div className="row mx-2 mt-4 gy-md-0 gy-3">
            <div className="col-md">
              <Input className="order-number border-0 rounded-0" type="select">
                <option value="1">select order number</option>
              </Input>
            </div>
            <div className="col-md">
              <div className="d-flex">
                <button
                  className="btn text-deep"
                  style={{ backgroundColor: " #F7FAFE" }}
                >
                  Date
                </button>
                <Input className="order-number  border-0 rounded-0" type="date">
                  <option value="1">select order status</option>
                </Input>
              </div>
            </div>
            <div className="col-md">
              <div className="d-flex">
                <Input
                  className="order-number border-0 rounded-0"
                  type="select"
                >
                  <option value="1">select order status</option>
                </Input>
                <button className="btn ms-bg text-white">Find</button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <StaffOrderTable />
          </div>
          {/* End of Table */}
        </div>
      </div>
    </>
  );
};

export default StaffOrdersTable;
