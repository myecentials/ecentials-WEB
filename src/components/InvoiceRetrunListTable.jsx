import React from "react";
// import leftchev from "../assets/icons/svg/leftchev.svg";
// import rightchev from "../assets/icons/svg/rightchev.svg";
// import updownchev from "../assets/icons/svg/updownchev.svg";
// import { Table } from "reactstrap";
// import chev from "../assets/icons/svg/chevfilldown.svg";
import blueeye from "../assets/icons/svg/blueeye.svg";
import bin from "../assets/icons/svg/bin.svg";
// import orders from "../static/orders";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useEffect,useCallback } from "react";
import axios from "../config/api/axios";
import Loader from "./Loader";
import { useFetchAllReturnsMutation , useDeleteReturnMutation} from "../app/features/returns/returnsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { facility_id ,setToken } from "../app/features/authSlice/authSlice";
import { allReturns } from "../app/features/returns/returnsSlice";
import DataTable from "react-data-table-component";
import { Modal, ModalBody } from "reactstrap";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";




const InvoiceReturnListTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [returns] = useFetchAllReturnsMutation();
  const token = useSelector(setToken)
  const facilityId = useSelector(facility_id) 
   const dispatch = useDispatch();
   const [deleteReturn] = useDeleteReturnMutation()
   const [invoice_id, setInvoice_id] = useState("");
   const [isOpen, setIsOpen] = useState(false);

   const handleDeleteDrug = async () => {
    setIsOpen(false);
    try {
      const res = await deleteReturn({ invoice_id }).unwrap();
toast.promise(
      Promise.resolve(res),
      {
        loading: (res) => "Deleting...",
        success: (res) => res.message,
        error: (err) => "An error occured , please try again",
      },   
  setTimeout( () => fetchData() ,5000  ) 
    ) 
     
    } catch (error) {
      console.log(error);
    }
    
  
  };

  const fetchData = useCallback(async () => {
    try {
      const results = await returns(facilityId).unwrap();
      dispatch(allReturns({ ...results?.data }));
      setData(results?.data);
      console.log(results.data);
    } catch (error) {
      console.log(error);
    }
  },[dispatch, facilityId, returns]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
 



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
  }, [facilityId, token]);

const column = [
  {
    name : "Invoive No" ,
    selector: (row) => row.invoice_number,
      minWidth: "200px"
  },
 
  // {
  //   name : "Invoive ID" ,
  //   selector: (row) => row.order_code,
  //     minWidth: "200px"
  // },

    {
    name : "Customer name",
    selector: (row) => row.customer_name === "" ? row.customer_name ?? "N/A" : "N/A",
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
    selector: (row) => row.grand_total === "" ? row.grand_total ?? "N/A" : "N/A",
    minWidth: "200px"
    
  },
  {
    name : "Action" ,
    cell : ({
      invoice_number ,
      order_code,
      createdAt,
      grand_total,
      customer_name,
      products_summary,
      _id,
    },index) =>  <span className="d-flex">
   <Link to="/pharmacy/invoices/invoice-details">
                              <img
                                src={blueeye}
                                alt=""
                                className="mx-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEyeClick(
                                  {
                                    invoice_number ,
                                    order_code,
                                    createdAt,
                                    grand_total,
                                    customer_name,
                                    products_summary,
                                    _id,
                                  },
                                  index
                                )} />
                            </Link>

    <img
      src={bin}
      onClick={() => handleDelete(_id)}  
      alt=""
      className="mx-3"
      style={{ cursor: "pointer" }}
    />
  </span>
  },
  
]
const handleEyeClick = (item, e) => {
  sessionStorage.setItem("eyeId", JSON.stringify(item));
};

const handleDelete = (id) => {
  setIsOpen(true);
  setInvoice_id(id);
};


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
       <Modal isOpen={isOpen} centered={true}>
            <ModalBody>
              <p className="text-center text-deep">
                Do you want to delete this return?
              </p>
              <div className="d-flex pb-3 justify-content-center align-items-center mx-auto">
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => setIsOpen(false)}
                  style={{ width: "7rem" }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success text-white mx-2"
                  onClick={handleDeleteDrug}
                  style={{ width: "7rem" }}
                >
                  Delete
                </button>
              </div>
            </ModalBody>
          </Modal>
          <Toaster />
     
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