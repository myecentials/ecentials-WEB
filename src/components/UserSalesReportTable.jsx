import React from "react";
import { Table } from "reactstrap";
import orders from "../static/orders";

const UserSalesReportTable = () => {
  return (
    <Table borderless responsive bgcolor="white">
      <thead style={{ backgroundColor: "#F3F6F9" }}>
        <tr>
          <th className="text-nowrap">INVOICE ID</th>
          <th className="text-nowrap">DATE</th>
          <th className="text-nowrap">TOTAL AMOUNT (GHC)</th>
          <th className="text-nowrap">CUSTOMER NAME</th>
          <th className="text-nowrap">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(({ orderId, total, name }) => (
          <tr>
            <td className="text-nowrap">#INV-{orderId}</td>
            <td>2020/12/22</td>
            <td className="text-center">{total}</td>
            <td className="text-nowrap">{name.findName()}</td>
            <td>
              <div className="btn text-deep btn-bg">
                <span className="text-nowrap">View Invoice</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserSalesReportTable;
