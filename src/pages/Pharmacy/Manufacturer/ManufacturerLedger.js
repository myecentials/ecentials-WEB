import React from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
// import SideBar from "../../../components/SideBar";
import { Helmet } from "react-helmet";
// import CustomeNav from "../../../components/CustomeNav";
import { Input, Table } from "reactstrap";
import orders from "../../../static/orders";
import BreadOutlined from "../../../components/BreadOutlined";
// import Header from "../../../components/Header";
import PharmacyName from "../../../components/PharmacyName";

const ManufacturerLedger = () => {
  return (
    <>
      <Helmet>
        <title>Wholesaler Ledger</title>
      </Helmet>

        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">WHOLESALER</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadOutlined
                  name="Wholesaler"
                  breadcrumb="/pharmacy/manufacturer/add-manufacturer"
                  width="9rem"
                />
                <BreadCrumb
                  name="Wholesaler Ledger"
                  breadcrumb=""
                  hasStyles={true}
                  width="13.5rem"
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="row mx-2 mt-4 gy-md-0 gy-3">
            <div className="col-md">
              <Input type="select">
                <option value="">Select Manufacturer Name</option>
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
                Wholesaler Ledger - Account Payable (2022 - 06 - 27 to 2022 - 08
                - 30)
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
    </>
  );
};

export default ManufacturerLedger;
