import { Table, Button } from "reactstrap";
import React from "react";
import chat from "../assets/icons/svg/chat.svg";
import leftchev from "../assets/icons/svg/leftchev.svg";
import rightchev from "../assets/icons/svg/rightchev.svg";
import morevert from "../assets/icons/svg/morevert.svg";
import shipmentDetails from "../static/shipment";
const Shipment = () => {
  return (
    <div
      className="shipment card border-0 mb-5"
      style={{ borderRadius: "10px" }}
    >
      <div className="d-flex mt-4 mx-3 justify-content-between align-items-center">
        <h6 className="text-deep">Awaiting shipments</h6>

        <input
          type="number"
          min={0}
          placeholder="Days Left"
          className="form-control w-25 form-control-sm rounded-pill"
        />
      </div>
      <div>
        <Table responsive borderless>
          <thead>
            <tr className="text-deep">
              <th></th>
              <th>Customers</th>
              <th>Order ID</th>
              <th>Days Left</th>
              <th>Order Value</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bold-light">
            {shipmentDetails.map(({ image, name, id, daysleft, value }) => (
              <tr>
                <th scope="row">
                  <img
                    src={image}
                    alt=""
                    className="rounded-circle circle bg-warning"
                  />
                </th>
                <td>
                  <h6>{name.findName()}</h6>
                </td>
                <td>ID {id}</td>
                <td className="rounded-circle circle bg-warning text-white">
                  {daysleft}
                </td>
                <td>{value}</td>
                <td>
                  <img
                    src={chat}
                    alt=""
                    width={25}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>
                  <img
                    src={morevert}
                    alt=""
                    width={15}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between align-items-center mx-2 mb-5">
          <p className="small">
            Showing <span className="text-lightdeep">1-10</span> from{" "}
            <span className="text-lightdeep">100</span> data
          </p>
          <div className="d-flex justify-content-center align-items-center">
            <img src={leftchev} alt="" className="mx-3" />
            <div className="circle rounded-circle mail circle-bgdeep text-white">
              1
            </div>
            <div className="circle rounded-circle mail mx-2">2</div>
            <div className="circle rounded-circle mail">3</div>
            <img src={rightchev} alt="" className="mx-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
