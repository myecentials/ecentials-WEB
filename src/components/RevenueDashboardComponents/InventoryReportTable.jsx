import React from "react";
import { Table } from "reactstrap";
import orders from "../../static/orders";

const InventoryReportTable = () => {
  return (
    <Table borderless responsive bgcolor="white">
      <thead style={{ backgroundColor: "#F3F6F9" }}>
        <tr>
          <th className="text-nowrap">INVENTORY ID</th>
          <th className="text-nowrap">DATE</th>
          <th className="text-nowrap">MEDICINE NAME</th>
          <th className="text-nowrap">CATEGORY NAME</th>
          <th className="text-nowrap">QUANTITY</th>
          <th className="text-nowrap">DISCOUNT(%)</th>
          <th className="text-nowrap">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(({ orderId, total, name }) => (
          <tr>
            <td className="text-nowrap">#MD-{orderId}</td>
            <td>2020/12/22</td>
            <td className="text-center">{name.firstName()}</td>
            <td className="text-nowrap">{name.firstName()}</td>
            <td className="text-nowrap">50</td>
            <td className="text-nowrap">0</td>
            <td>
              <div className="btn text-deep btn-bg">
                <span className="text-nowrap">Delete</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InventoryReportTable;
