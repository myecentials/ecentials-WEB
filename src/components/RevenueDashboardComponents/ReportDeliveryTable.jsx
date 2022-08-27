import React from "react";
import { Table } from "reactstrap";
import orders from "../../static/orders";

const ReportDeliveryTable = () => {
  return (
    <Table borderless responsive bgcolor="white">
      <thead style={{ backgroundColor: "#F3F6F9" }}>
        <tr>
          <th className="text-nowrap">DRIVER</th>
          <th className="text-nowrap">INVOICE ID</th>
          <th className="text-nowrap">DATE</th>
          <th className="text-nowrap">STATUS</th>
          <th className="text-nowrap">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(({ orderId, total, name, image, driverId }) => (
          <tr>
            <td className="text-nowrap">
              <div className="d-flex">
                <span
                  className="rounded bg-light d-flex justify-content-center align-items-center"
                  style={{
                    height: "3rem",
                    width: "3rem",
                  }}
                >
                  <img
                    src={image}
                    alt=""
                    style={{
                      height: "2.5rem",
                      width: "2.5rem",
                      borderRadius: "10px",
                    }}
                  />
                </span>
                <span className="mx-2 small text-nowrap d-flex flex-column">
                  <span>{name.findName()}</span>
                  <span className="gray-text">{driverId}</span>
                </span>
              </div>
            </td>
            <td>#INV-{orderId}</td>
            <td className="text-center">2020/12/22</td>
            <td className="text-nowrap">
              <div className="rounded-pill tomato d-flex justify-content-center align-items-center py-1 text-white">
                In Progress
              </div>
            </td>
            <td>
              <div className="btn text-deep btn-bg">
                <span className="text-nowrap">View</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReportDeliveryTable;
