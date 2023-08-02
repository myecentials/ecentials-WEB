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
import { useState } from "react";
import { useEffect } from "react";
import axios from "../config/api/axios";
import { useGetWholesalersMutation } from "../app/features/wholesaler/wholesalerApiSlice";
import { facility_id } from "../app/features/authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { wholesalerList } from "../app/features/wholesaler/wholesalerSlice";

const ManufacturerTable = () => {
  const [data, setData] = useState([]);
  const [wholesaler] = useGetWholesalersMutation();
  const facilityid = useSelector(facility_id);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const results = await wholesaler(facilityid).unwrap();
      dispatch(wholesalerList({ ...results?.data }));
      setData(results?.data);
    };
    fetchData();
  }, []);

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
          <span className="mx-2 text-nowrap">Add Wholesaler</span>
        </Link>
      </div>
      <div className="table-responsive">
        <Table borderless bgcolor="white" striped>
          <thead className="text-deep">
            <tr className="small">
              <th className="text-nowrap">SI</th>
              <th className="text-nowrap">Wholesaler Name</th>
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
              <th className="text-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (
                { address, phone, name, email, country, city, region },
                index
              ) => (
                <tr key={index}>
                  <td className="py-3 px-3 text-nowrap">{index + 1}</td>
                  <td className="py-3 px-3 text-nowrap">{name}</td>
                  <td className="py-3 px-3 text-nowrap">
                    {address == null ? "N/A" : address}
                  </td>
                  <td className="py-3 px-3 text-nowrap">
                    {phone == null ? "N/A" : phone}
                  </td>
                  <td className="py-3 px-3 text-nowrap">
                    {email == null ? "N/A" : email}
                  </td>
                  <td className="py-3 px-3  text-nowrap">
                    {city == null || country == null
                      ? "N/A"
                      : `${city},${country}`}
                  </td>
                  {/* <td className="py-3 px-3  text-nowrap"></td> */}
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
