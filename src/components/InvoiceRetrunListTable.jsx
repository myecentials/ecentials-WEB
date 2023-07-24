import React from "react";
import leftchev from "../assets/icons/svg/leftchev.svg";
import rightchev from "../assets/icons/svg/rightchev.svg";
import updownchev from "../assets/icons/svg/updownchev.svg";
import { Table } from "reactstrap";
import chev from "../assets/icons/svg/chevfilldown.svg";
import blueeye from "../assets/icons/svg/blueeye.svg";
import bin from "../assets/icons/svg/bin.svg";
import orders from "../static/orders";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../config/api/axios";
import Loader from "./Loader";
import { useFetchAllReturnsMutation } from "../app/features/returns/returnsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { facility_id } from "../app/features/authSlice/authSlice";
import { allReturns } from "../app/features/returns/returnsSlice";

const InvoiceReturnListTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [returns] = useFetchAllReturnsMutation();
  const facilityid = useSelector(facility_id);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await returns(facilityid).unwrap();
        dispatch(allReturns({ ...results?.data }));
        setData(results?.data);
        console.log(results.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post("/pharmacy/returns", {
        store_id: sessionStorage.getItem("facility_id"),
      })
      .then((res) => {
        // console.log(res);
        setIsLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="mx-3 card bg-white border-0">
      <div className=" ms-bg py-2 gy-md-0 gy-2">
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
      </div>
      {isLoading ? (
        <Loader />
      ) : (
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
              {data.map(
                (
                  {
                    invoice_number,
                    order_code,
                    customer_name,
                    grand_total,
                    createdAt,
                  },
                  index
                ) => (
                  <tr>
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{invoice_number}</td>
                    <td className="py-3">{order_code}</td>
                    <td className="py-3">{customer_name}</td>
                    <td className="py-3">{`${new Date(createdAt).getDate()}/${
                      new Date(createdAt).getMonth() + 1
                    }/${new Date(createdAt).getFullYear()}`}</td>
                    <td className="py-3 text-center">{grand_total}</td>
                    <td className="py-3">
                      <span className="d-flex">
                        <img
                          src={blueeye}
                          alt=""
                          className="mx-3"
                          style={{ cursor: "pointer" }}
                        />

                        <img
                          src={bin}
                          alt=""
                          className="mx-3"
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
      )}
      <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
        <p className="small text-center">
          Showing <span className="text-lightdeep">1-</span> from{" "}
          <span className="text-lightdeep"></span> data
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

export default InvoiceReturnListTable;
