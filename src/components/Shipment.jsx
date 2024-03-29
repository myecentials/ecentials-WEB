import { Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import chat from "../assets/icons/svg/chat.svg";
import leftchev from "../assets/icons/svg/leftchev.svg";
import rightchev from "../assets/icons/svg/rightchev.svg";
import morevert from "../assets/icons/svg/morevert.svg";
import shipmentDetails from "../static/shipment";
import axios from "../config/api/axios";
const Shipment = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post("/pharmacy/orders/fetch-all-orders", {
        store_id: sessionStorage.getItem("facility_id"),
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="shipment card border-0 mb-5"
      style={{ borderRadius: "10px" }}
    >
      <div
        className="d-flex p-2 justify-content-between align-items-center"
        style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
      >
        <h6 className="text-deep m-2">{props.name}</h6>
      </div>
      <div>
        <Table responsive borderless>
          <thead>
            <tr className="text-deep">
              <th></th>
              <th>Customers</th>
              <th>Order ID</th>
              <th className="text-nowrap">Days Left</th>
              <th className="text-nowrap">Order Value</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bold-light">
            {shipmentDetails.map(
              ({ image, name, id, daysleft, value }, index) => (
                <tr key={index}>
                  <th scope="row">
                    <img
                      src={image}
                      alt=""
                      className="rounded-circle circle bg-user"
                    />
                  </th>
                  <td>
                    <h6>{name.findName()}</h6>
                  </td>
                  <td>ID {id}</td>
                  <td className="rounded-circle circle bg-danger text-white">
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
              )
            )}
          </tbody>
        </Table>
        <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
          <p className="small text-center">
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
