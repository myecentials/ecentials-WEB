import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import { Input, Table } from "reactstrap";
import orders from "../../static/orders";
import BreadOutlined from "../../components/BreadOutlined";
import StaffSideBar from "../../components/StaffComponents/StaffSidebar";
import StaffNavBar from "../../components/StaffComponents/StaffNavBar";

const StaffCustomerLedger = () => {
  return (
    <>
      <Helmet>
        <title>Customer Ledger</title>
      </Helmet>
      <StaffNavBar />
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
                name="Customer Ledger"
                breadcrumb="/customers/customers-ledger"
                hasStyles={true}
                width="11rem"
              />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
          </div>
          <div className="row mx-2 mt-4 gy-md-0 gy-3">
            <div className="col-md">
              <Input type="select">
                <option value="">Select Customer Name</option>
              </Input>
            </div>
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
              <button className="btn ms-bg text-white px-4 customer_ledger__find_btn rounded-0">
                Find
              </button>
            </div>
          </div>
          <div className="mt-3 mx-3">
            <div className="row">
              <div className="col-sm-6">
                <div className="d-flex">
                  <button className="btn ms-bg text-white text-nowrap rounded-0">
                    Pre Balance
                  </button>
                  <Input
                    type="text"
                    className="rounded-0 border-0"
                    placeholder="50.00"
                  ></Input>
                </div>
              </div>
              <div className="col-sm-6"></div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-6">
                <div className="d-flex">
                  <button className="btn ms-bg text-white text-nowrap rounded-0">
                    Current Balance
                  </button>
                  <Input
                    type="text"
                    className="rounded-0 border-0"
                    placeholder="50.00"
                  ></Input>
                </div>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>

          <div className="mt-4 mx-3">
            <div className="ms-bg text-white py-2">
              <h6 className="mx-3">
                {" "}
                Customer Ledger - Account Payable (2022 - 06 - 27 to 2022 - 08 -
                30)
              </h6>
            </div>
            <Table responsive borderless striped className="bg-white">
              <thead>
                <tr>
                  <th className="text-purple">SL</th>
                  <th className="text-purple">Date</th>
                  <th className="text-purple">Description</th>
                  <th className="text-purple">Debit</th>
                  <th className="text-purple">Credit</th>
                  <th className="text-purple">Balance</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(({ orderNo }) => (
                  <tr>
                    <td className="text-nowrap">{orderNo}</td>
                    <td className="text-nowrap">2022-06-28</td>
                    <td className="text-nowrap">Ibuprofen, Tiamide, Spritz</td>
                    <td className="text-nowrap">30.00</td>
                    <td className="text-nowrap">0.00</td>
                    <td className="text-nowrap">0.00</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {/* End of Table */}
        </div>
      </div>
    </>
  );
};

export default StaffCustomerLedger;
