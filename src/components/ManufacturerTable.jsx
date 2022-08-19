import React from "react";
import leftchev from "../assets/icons/svg/leftchev.svg";
import rightchev from "../assets/icons/svg/rightchev.svg";
import updownchev from "../assets/icons/svg/updownchev.svg";
import { Table } from "reactstrap";
import chev from "../assets/icons/svg/chevfilldown.svg";
import edit from "../assets/icons/svg/edit.svg";
import bin from "../assets/icons/svg/bin.svg";
import orders from "../static/orders";
import add from "../assets/icons/svg/adddeep.svg";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

const ManufacturerTable = () => {
  return (
    <div className="">
      <div className=" ms-bg py-2 gy-md-0 gy-2 d-flex justify-content-between">
        <div className=" my-0 text-white small d-flex">
          <span className="mx-2 text-nowrap">
            Showing{" "}
            <span className="btn btn-light">
              10 <img src={chev} alt="" width={10} />
            </span>{" "}
            entries
          </span>
          <span>
            <SearchBar radius="8px" />
          </span>
        </div>
        <Link
          to="/manufacturer/add-manufacturer"
          className="btn d-sm-flex  d-none  bg-white rounded-pill text-purple text-center mx-3"
        >
          <img src={add} alt="" width={20} />
          <span className="mx-2 text-nowrap">Add Manufacturer</span>
        </Link>
      </div>
      <div className="table-responsive">
        <Table borderless bgcolor="white" striped>
          <thead className="text-deep">
            <tr className="small">
              <th className="text-nowrap">SI</th>
              <th className="text-nowrap">Manufacturer Name</th>
              <th className="text-nowrap">
                <img src={updownchev} alt="" className="mx-1" />
                Address
              </th>
              <th className="text-nowrap ">
                <img src={updownchev} alt="" className="mx-1" />
                Mobile No.
              </th>

              <th className="text-nowrap">Email</th>
              <th className="text-nowrap">City, Country</th>
              <th className="text-nowrap">Balance</th>
              <th className="text-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(
              ({ address, phone, orderNo, total, name, email, country }) => (
                <tr>
                  <td className="py-3 px-3 text-nowrap">{orderNo}</td>
                  <td className="py-3 px-3 text-nowrap">{name.findName()}</td>
                  <td className="py-3 px-3 text-nowrap">{address}</td>
                  <td className="py-3 px-3 text-nowrap">{phone}</td>
                  <td className="py-3 px-3 text-nowrap">{email}</td>
                  <td className="py-3 px-3  text-nowrap">{country}</td>
                  <td className="py-3 px-3  text-nowrap">{total}</td>
                  <td className="py-3 px-3 text-nowrap">
                    <span className="d-flex">
                      <img
                        src={edit}
                        alt=""
                        width={20}
                        className="mx-2"
                        style={{ cursor: "pointer" }}
                      />
                      <img
                        src={bin}
                        alt=""
                        className="mx-2"
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </td>
                </tr>
              )
            )}
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

export default ManufacturerTable;
