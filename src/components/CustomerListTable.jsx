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
import { useEffect } from "react";
import axios from "../config/api/axios";
import { local } from "d3";
import { useState } from "react";
import {
  useGetCustomersMutation,
  useDeleteCustomerMutation,
} from "../app/features/customers/customerApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { facility_id, setToken } from "../app/features/authSlice/authSlice";
import { customerList } from "../app/features/customers/customerSlice";
import DataTable from "react-data-table-component";
import { Modal, ModalBody } from "reactstrap";
import { toast, Toaster } from "react-hot-toast";

const CustomerListTable = () => {
  const [customers] = useGetCustomersMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();
  const facilityid = useSelector(facility_id);
  const token = useSelector(setToken);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [customer_id, setDelId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const results = await customers(facilityid).unwrap();
      dispatch(customerList({ ...results?.data }));
      setData(results?.data);
    };
    fetchData();
  }, []);

  const [enteries, setEnteries] = useState(10);

  const handleEntryChange = (e) => {
    setEnteries(e.target.value);
  };

  const handleDeleteModal = (id) => {
    setIsOpen(true);
    setDelId(id);
  };

  const handleDeleteCustomer = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteCustomer({ customer_id }).unwrap();
      console.log(res);
      setIsOpen(false);

      toast.promise(Promise.resolve(res), {
        loading: "Deleting...",
        success: (res) => `Customer Deleted`,
        error: (err) => console.log(err),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditCustomer = async () => {
    try {
      console.log("Great You found the delete route");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      wrap: true,
      minWidth: "300px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
      wrap: true,
      minWidth: "200px",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      wrap: true,
      minWidth: "200px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
      minWidth: "300px",
    },
    {
      name: "Country",
      selector: (row) => `${row.country} , ${row.city}`,
      wrap: true,
      minWidth: "200px",
    },

    {
      name: "Actions",
      cell: (row) => (
        <span className="d-flex">
          <Link to="/products/edit-product" style={{ cursor: "pointer" }}>
            <img src={edit} alt="" />
          </Link>
          <img
            src={bin}
            alt=""
            className="mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteModal(row?._id)}
          />
        </span>
      ),
    },
  ];

  return (
    <div className="">
      <div className=" ms-bg py-2 gy-md-0 gy-2 d-flex justify-content-between">
        <div className=" my-0 text-white small d-flex">
          {/* <span className="mx-2 text-nowrap">
            Showing{" "}
            <select name="enteries" id="" onChange={handleEntryChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={1000}>1000</option>
            </select>{" "}
            entries
          </span> */}
          <span>
            <SearchBar radius="8px" />
          </span>
        </div>
        <Link
          to="/customers/add-customers"
          className="btn  bg-white d-sm-flex d-none rounded-pill text-purple text-center mx-3"
        >
          <img src={add} alt="" />
          <span className="mx-2">Add Customer</span>
        </Link>
      </div>
      <div className="table-responsive">
        {/* <Table borderless bgcolor="white" striped>
          <thead className="text-deep">
            <tr className="small">
              <th className="text-nowrap">SI</th>
              <th className="text-nowrap">Customer Name</th>
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
                  {/* <td className="py-3 px-3  text-nowrap"></td> 
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
        </Table> */}
        <DataTable
          columns={columns}
          data={data}
          pagination
          customStyles={customStyles}
          striped
          // progressPending={pending}
          // onSelectedRowsChange={handleChange}
          // selectableRows
        />
      </div>
      <Modal isOpen={isOpen} centered={true}>
        <ModalBody>
          <p className="text-center text-deep">
            Are you sure you want to delete this customer?
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
              onClick={handleDeleteCustomer}
              style={{ width: "7rem" }}
            >
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      <Toaster />
      {/* <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
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
      </div> */}
    </div>
  );
};

export default CustomerListTable;

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "blue",
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
