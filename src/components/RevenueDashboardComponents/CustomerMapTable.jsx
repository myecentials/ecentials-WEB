import React from "react";
import { Table } from "reactstrap";
import orders from "../../static/orders";

const CustomerMapTable = () => {
  return (
    <Table borderless responsive bgcolor="white" className="small">
      <thead style={{ backgroundColor: "#F3F6F9" }}>
        <tr>
          <th className="text-nowrap">ID</th>
          <th className="text-nowrap">REGION</th>
          <th className="text-nowrap">CITY</th>
          <th className="text-nowrap">SALES LEVEL</th>
          <th className="text-nowrap">LAST EDITED</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(({ orderId, regions, cities, salesLevel, salesColor }) => (
          <tr>
            <td className="text-nowrap">{orderId}</td>
            <td>{regions}</td>
            <td className="text-nowrap">{cities}</td>
            <td className="text-nowrap">
              <div className="d-flex align-items-center">
                <span
                  className="rounded-pill"
                  style={{
                    width: "1.5rem",
                    height: "5px",
                    marginRight: "5px",
                    backgroundColor: `${salesColor}`,
                  }}
                ></span>
                <span>{salesLevel}</span>
              </div>
            </td>
            <td>01.20.2022</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomerMapTable;
