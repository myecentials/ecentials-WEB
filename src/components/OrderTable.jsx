import React from "react";
import leftchev from "../assets/icons/svg/leftchev.svg";
import rightchev from "../assets/icons/svg/rightchev.svg";
import updownchev from "../assets/icons/svg/updownchev.svg";
import { Table } from "reactstrap";
import chev from "../assets/icons/svg/chevfilldown.svg";
import { Link } from "react-router-dom";
import orders from "../static/orders";
import axios from "../config/api/axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "./Loader";
import useAuth from "../hooks/useAuth";
import { useFetchAllOrdersMutation } from "../app/features/orders/ordersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { facility_id } from "../app/features/authSlice/authSlice";
import { allOrders } from "../app/features/orders/ordersSlice";

const OrderTable = ({ search }) => {
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orders] = useFetchAllOrdersMutation();
  const facilityid = useSelector(facility_id);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      const results = await orders(facilityid).unwrap();
      dispatch(allOrders({ ...results.data }));
      setData(results.data);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        "/pharmacy/orders/fetch-all-orders",
        {
          store_id: sessionStorage.getItem("facility_id"),
        },
        {
          headers: {
            "auth-token": auth.token || sessionStorage.getItem("userToken"),
          },
        }
      )
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

  const handleClick = (e) => {
    sessionStorage.setItem("orderId", e);
  };

  const [enteries, setEnteries] = useState(10);
  const handleEntryChange = (e) => {
    setEnteries(e.target.value);
  };

  return (
    <div className="mx-3 card bg-white border-0">
      <div className=" ms-bg py-2 gy-md-0 gy-2">
        <div className=" my-0 text-white small ">
          <span className="mx-2 text-nowrap">
            Showing{" "}
            <select name="enteries" id="" onChange={handleEntryChange}>
              {data.slice(0, Math.ceil(data.length / 10)).map(({}, index) => (
                <option value={index * 10 + 10}>{index * 10 + 10}</option>
              ))}
            </select>{" "}
            entries
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
                <th className="text-nowrap">#</th>
                <th className="text-nowrap">Order ID.</th>
                <th className="text-nowrap">
                  <img src={updownchev} alt="" className="mx-1" />
                  Payment Type
                </th>
                <th className="text-nowrap ">
                  <img src={updownchev} alt="" className="mx-1" />
                  Payment Status
                </th>

                <th className="text-nowrap">Grand Total(GHC)</th>
                <th className="text-nowrap">Order Status</th>
                <th className="text-nowrap">Action</th>
                <th className="text-nowrap">Date</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter(({ order_code }) =>
                  order_code === "" ? order_code : order_code.includes(search)
                )
                .slice(0, enteries)
                .map(
                  (
                    {
                      order_code,
                      payment_type,
                      payment_status,
                      order_status,
                      grand_total,
                      createdAt,
                      _id,
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <td className="py-3 text-center">{index + 1}</td>
                      <td className="py-3 text-nowrap">{order_code}</td>
                      <td className="py-3 text-center">
                        {payment_type || "N/A"}
                      </td>
                      <td className="py-3 text-center">{payment_status}</td>
                      <td className="py-3 text-center">
                        {grand_total.toFixed(2)}
                      </td>
                      <td className="py-3">
                        <span
                          className="rounded-pill border-0 px-3 py-1 small"
                          style={{
                            backgroundColor: `${
                              order_status == "Cancelled"
                                ? "#FBE7E8"
                                : order_status == "New"
                                ? "#C1BBEB"
                                : order_status == "Approved"
                                ? "#EBF9F1"
                                : ""
                            }`,
                            color: `${
                              order_status == "Cancelled"
                                ? "#A30D11"
                                : order_status == "New"
                                ? "#4D44B5"
                                : order_status == "Approved"
                                ? "#1F9254"
                                : ""
                            }`,
                          }}
                        >
                          {order_status}
                        </span>
                      </td>
                      <td className="py-3">
                        {order_status == "Cancelled" ? (
                          <button
                            disabled
                            to="/orders/order-details"
                            className="border-0 px-3 py-1 small rounded-pill"
                            style={{
                              backgroundColor: "rgba(147, 193, 249, 0.15)",
                              color: "#007bff5a",
                            }}
                            onClick={() => handleClick(data[index])}
                          >
                            Details
                          </button>
                        ) : (
                          <Link
                            to="/orders/order-details"
                            className="border-0 px-3 py-1 small rounded-pill"
                            style={{
                              backgroundColor: "rgba(147, 193, 249, 0.29)",
                              color: "#007AFF",
                            }}
                            onClick={() => handleClick(_id)}
                          >
                            Details
                          </Link>
                        )}
                      </td>
                      <td className="py-3">{`${new Date(createdAt).getDate()}/${
                        new Date(createdAt).getMonth() + 1
                      }/${new Date(createdAt).getFullYear()}`}</td>
                    </tr>
                  )
                )}
            </tbody>
          </Table>
        </div>
      )}
      <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
        <p className="small text-center">
          Showing <span className="text-lightdeep">1-{enteries}</span> from{" "}
          <span className="text-lightdeep">{data.length}</span> data
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

export default OrderTable;
