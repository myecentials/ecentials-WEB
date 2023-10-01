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
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../config/api/axios";
import jsPDF from "jspdf";
import Loader from "./Loader";
import useAuth from "../hooks/useAuth";
import { facility_id, userInfo } from "../app/features/authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetInvoiceListMutation } from "../app/features/invoice/invoiceApiSlice";
import { invoiceList } from "../app/features/invoice/invoiceSlice";
import { Pagination } from "@mui/material";

const InvoiceListTable = ({ search = "" }) => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const userinfo = useSelector(userInfo);
  const [invoicelist] = useGetInvoiceListMutation();
  const facilityid = useSelector(facility_id);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(20)
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPost = data?.slice(indexOfFirstPost, indexOfLastPost)
  const [drugTotal, setDrugTotal] = useState(0)
  const paginate = (event, value) => {
    setCurrentPage(value)
  }


  useEffect(() => {
    const fetchData = async () => {
      const results = await invoicelist(facilityid).unwrap();
      dispatch(invoiceList({ ...results.data }));
      setData(results.data);
      console.log(results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        "/pharmacy/invoice",
        {
          store_id: sessionStorage.getItem("facility_id"),
        },
        {
          headers:
            userinfo.results.token || sessionStorage.getItem("userToken"),
        }
      )
      .then((res) => {
        setIsLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        // console.log(err);
      });
  }, []);

  const handlePhoneClick = (item, e) => {
    sessionStorage.setItem("phoneId", JSON.stringify(item));
  };
  const handleEyeClick = (item, e) => {
    sessionStorage.setItem("eyeId", JSON.stringify(item));
  };

  const [enteries, setEnteries] = useState(10);
  const handleEntryChange = (e) => {
    setEnteries(e.target.value);
  };

  const [searchText, setSearchText] = useState("");

  return (
    <div className="mx-3 card bg-white border-0">
      <div className=" ms-bg py-2 gy-md-0 gy-2">
        <div className=" my-0 text-white small d-flex">
          <span className="mx-2 text-nowrap">
            Showing{" "}
            <select name="enteries" id="" onChange={handleEntryChange}>
              {data.slice(0, Math.ceil(data.length / 10)).map(({}, index) => (
                <option value={index * 10 + 10}>{index * 10 + 10}</option>
              ))}
            </select>{" "}
            entries
          </span>
          <span>
            <SearchBar
              radius="8px"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </span>
        </div>
      </div>
      <div className="table-responsive">
        {isLoading ? (
          <Loader />
        ) : (
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
                ?.filter(({ invoice_number, order_code }) =>
                  invoice_number?.toLowerCase() === "" || order_code === ""
                    ? invoice_number?.toLowerCase()
                    : invoice_number
                        ?.toLowerCase()
                        .includes(searchText?.toLowerCase()) ||
                      order_code?.includes(searchText)
                )
                .slice(indexOfFirstPost, indexOfLastPost)
                .map(
                  (
                    {
                      invoice_number,
                      order_code,
                      createdAt,
                      grand_total,
                      customer_name,
                      products_summary,
                      _id,
                    },
                    index
                  ) => (
                    <tr>
                      <td className="py-3">{(indexOfFirstPost + 1) + index}</td>
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
                              onClick={() =>
                                handleEyeClick(
                                  {
                                    invoice_number,
                                    order_code,
                                    createdAt,
                                    grand_total,
                                    customer_name,
                                    products_summary,
                                    _id,
                                  },
                                  index
                                )
                              }
                            />
                          </Link>
                          <Link to="/invoice-list/invoice-list-id">
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
        )}
      </div>
      <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
        <p className="small text-center">
          Showing <span className="text-lightdeep">1-{enteries}</span> from{" "}
          <span className="text-lightdeep">{data.length}</span> data
        </p>
        <Pagination count={Math.ceil(data.length / postPerPage)}   onChange={paginate}/>
      </div>
    </div>
  );
};

export default InvoiceListTable;
