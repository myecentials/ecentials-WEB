import React from "react";
import RevenueCardHeader from "./RevenueCardHeader";
import { Table } from "reactstrap";
import RevenueCardBottom from "./RevenueCardBottom";

const RevenueDeliveryCard = () => {
  return (
    <div className="card bg-white border-0 report_container__height">
      <RevenueCardHeader header="Delivery" />
      <div className="report_revenue__card_overflow">
        <Table responsive className="small" style={{ fontSize: "13px" }}>
          <thead className="text-purple small">
            <tr>
              <td className="text-nowrap">Date</td>
              <td className="text-nowrap">Invoice ID</td>
              <td className="text-nowrap">Status</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="">2020/12/22 09:59</td>
              <td className="text-nowrap">INV-8907</td>
              <td className="text-nowrap">Open</td>
            </tr>
            <tr>
              <td className="">2020/12/22 09:59</td>
              <td className="text-nowrap">INV-8907</td>
              <td className="text-nowrap">Open</td>
            </tr>
            <tr>
              <td className="">2020/12/22 09:59</td>
              <td className="text-nowrap">INV-8907</td>
              <td className="text-nowrap">Open</td>
            </tr>
            <tr>
              <td className="">2020/12/22 09:59</td>
              <td className="text-nowrap">INV-8907</td>
              <td className="text-nowrap">Open</td>
            </tr>
            <tr>
              <td className="">2020/12/22 09:59</td>
              <td className="text-nowrap">INV-8907</td>
              <td className="text-nowrap">Open</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <RevenueCardBottom content="SEE ALL TICKETS" />
    </div>
  );
};

export default RevenueDeliveryCard;
