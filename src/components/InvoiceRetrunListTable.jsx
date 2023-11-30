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
import { facility_id ,setToken } from "../app/features/authSlice/authSlice";
import { allReturns } from "../app/features/returns/returnsSlice";
import DataTable from "react-data-table-component";

const InvoiceReturnListTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [returns] = useFetchAllReturnsMutation();
  const token = useSelector(setToken)
  const facilityId = useSelector(facility_id) 
   const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await returns(facilityId).unwrap();
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
        store_id: facilityId, 
      },
      {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        //  ;
        setIsLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

const column = [
  {
    name : "Invoive No" ,
    selector: (row) => row.invoice_number,
      minWidth: "200px"
  },
 
  {
    name : "Invoive ID" ,
    selector: (row) => row.order_code,
      minWidth: "200px"
  },
    {
    name : "Customer name",
    selector: (row) => row.customer_name,
    minWidth: "200px"

  },

  {
    name: "Date",
      minWidth: "200px",
      cell : (row)=>  <span className="py-3">{`${new Date(row.createdAt).getDate()}/${
        new Date(row.createdAt).getMonth() + 1
      }/${new Date(row.createdAt).getFullYear()}`}</span>
  },
  {
    name : "Total Amount" ,
    selector: (row) => row.grand_total,
    minWidth: "200px"
    
  },
  {
    name : "Action" ,
    cell : (row) =>  <span className="d-flex">
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
  },
  
]


  return (
    <div className="mx-3 card bg-white border-0">
      <div className=" ms-bg py-2 gy-md-0 gy-2">
        <div className=" my-0 text-white small d-flex">
          <span className="px-2">
            <SearchBar radius="8px" />
          </span>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="table-responsive">
   <DataTable
              columns={column}
              data={data}
              pagination
              customStyles={customStyles}
              striped
              // progressPending={pending}
              // onSelectedRowsChange={handleChange}
              // selectableRows
            />
        </div>
      )}
     
    </div>
  );
};

export default InvoiceReturnListTable;



const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#4D44B5",
      color: "white",
      fontSize: "18px",
      fontWeight: 800,
    },
  },
  cells: {
    style: {
      fontSize: "16px",
      fontWeight: 500,
    },
  },
};