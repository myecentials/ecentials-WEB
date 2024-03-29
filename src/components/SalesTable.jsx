import React from "react";
import leftchev from "../assets/icons/svg/leftchev.svg";
import rightchev from "../assets/icons/svg/rightchev.svg";
import updownchev from "../assets/icons/svg/updownchev.svg";
import { Table } from "reactstrap";
// import chev from "../assets/icons/svg/chevfilldown.svg";
import blueeye from "../assets/icons/svg/blueeye.svg";
// import edit from "../assets/icons/svg/edit.svg";
import phonecall from "../assets/icons/svg/phonecall.svg";
// import dustbin from "../assets/icons/svg/dustbin.svg";
// import orders from "../static/orders";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../config/api/axios";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { userInfo } from "../app/features/authSlice/authSlice";

const SalesTable = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userinfo = useSelector(userInfo);
  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        "/pharmacy/invoice",
        {
          store_id: sessionStorage.getItem("facility_id"),
        },
        {
          headers: {
            "auth-token":
              userinfo.results.token || sessionStorage.getItem("userToken"),
          },
        }
      )
      .then((res) => {
        //  ;
        setIsLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [userinfo.results.token]);

  const handlePhoneClick = (e) => {
    sessionStorage.setItem("phoneId", e);
  };
  const handleEyeClick = (e) => {
    sessionStorage.setItem("eyeId", e);
  };

  const [enteries, setEnteries] = useState(10);
  const handleEntryChange = (e) => {
    setEnteries(e.target.value);
  };

  return (
    <div className="mx-3 card bg-white border-0" ref={props.ref}>
      <div className=" ms-bg py-2 gy-md-0 gy-2">
        <div className=" my-0 text-white small d-flex">
          <span className="mx-2 text-nowrap">
            Showing{" "}
            <select name="enteries" id="" onChange={handleEntryChange}>
              {data.slice(0, Math.ceil(data.length / 10)).map(( index) => (
                <option value={index * 10 + 10}>{index * 10 + 10}</option>
              ))}
            </select>{" "}
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
              {data
                .slice(0, enteries)
                .map(
                  (
                    {
                      invoice_number,
                      order_code,
                      createdAt,
                      grand_total,
                      customer_name,
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
                          <Link to="/invoices/invoice-details">
                            <img
                              src={blueeye}
                              alt=""
                              className="mx-3"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEyeClick(index)}
                            />
                          </Link>
                          <Link to="pharmacy/invoices/invoice-list/invoice-list-id">
                            <img
                              src={phonecall}
                              alt=""
                              className="mx-3"
                              style={{ cursor: "pointer" }}
                              onClick={() => handlePhoneClick(index)}
                            />
                          </Link>
                          {/* <Link to="/orders/order-details">
                        <img
                          src={edit}
                          alt=""
                          width={20}
                          className="mx-3"
                          style={{ cursor: "pointer" }}
                        />
                      </Link> */}
                          {/* <img
                          src={dustbin}
                          alt=""
                          className="mx-3"
                          style={{ cursor: "pointer" }}
                        /> */}
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
          Showing <span className="text-lightdeep">1-{data.length}</span> from{" "}
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

export default SalesTable;
