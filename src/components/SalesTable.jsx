import React from "react";
import leftchev from "../assets/icons/svg/leftchev.svg";
import rightchev from "../assets/icons/svg/rightchev.svg";
import updownchev from "../assets/icons/svg/updownchev.svg";
import { Table } from "reactstrap";
import chev from "../assets/icons/svg/chevfilldown.svg";
import blueeye from "../assets/icons/svg/blueeye.svg";
import edit from "../assets/icons/svg/edit.svg";
import phonecall from "../assets/icons/svg/phonecall.svg";
import dustbin from "../assets/icons/svg/dustbin.svg";
import orders from "../static/orders";

const SalesTable = () => {
  return (
    <div className="mx-3 card bg-white border-0">
      <div className=" ms-bg py-2 gy-md-0 gy-2">
        <div className=" my-0 text-white small ">
          <span className="mx-2 text-nowrap">
            Showing{" "}
            <span className="btn btn-light">
              10 <img src={chev} alt="" width={10} />
            </span>{" "}
            entries
          </span>
        </div>
      </div>
      <div className="table-responsive">
        <Table borderless bgcolor="white" striped>
          <thead className="text-deep">
            <tr className="small">
              <th className="text-nowrap">SI</th>
              <th className="text-nowrap">Invoice No.</th>
              <th className="text-nowrap">
                <img src={updownchev} alt="" className="mx-1" />
                Invoice ID
              </th>
              <th className="text-nowrap ">
                <img src={updownchev} alt="" className="mx-1" />
                Customer name
              </th>

              <th className="text-nowrap">Date</th>
              <th className="text-nowrap">Total Amount</th>
              <th className="text-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(({ orderId, orderNo, invoiceID, total, name }) => (
              <tr>
                <td className="py-3">{orderNo}</td>
                <td className="py-3">{orderId}</td>
                <td className="py-3">{invoiceID}</td>
                <td className="py-3">{name.findName()}</td>
                <td className="py-3">04/05/2023</td>
                <td className="py-3 text-center">{total}</td>
                <td className="py-3">
                  <span className="d-flex">
                    <img
                      src={blueeye}
                      alt=""
                      className="mx-3"
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src={phonecall}
                      alt=""
                      className="mx-3"
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src={edit}
                      alt=""
                      width={20}
                      className="mx-3"
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src={dustbin}
                      alt=""
                      className="mx-3"
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
  );
};

export default SalesTable;
