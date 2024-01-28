import React from "react";
// import leftchev from "../assets/icons/svg/leftchev.svg";
// import rightchev from "../assets/icons/svg/rightchev.svg";
// import updownchev from "../assets/icons/svg/updownchev.svg";
// import { Table } from "reactstrap";
// import chev from "../assets/icons/svg/chevfilldown.svg";
import edit from "../../../assets/icons/svg/edit.svg";
import bin from "../../../assets/icons/svg/bin.svg";
// import orders from "../static/orders";
import add from "../../../assets/icons/svg/adddeep.svg";
import SearchBar from "../../SearchBar";
import { Link } from "react-router-dom";
import { useState,useCallback } from "react";
import { useEffect } from "react";
// import axios from "../config/api/axios";
import { useGetWholesalersMutation ,useDeleteWholesalerMutation } from "../../../app/features/wholesaler/wholesalerApiSlice";
import { facility_id } from "../../../app/features/authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { wholesalerList } from "../../../app/features/wholesaler/wholesalerSlice";
import DataTable from "react-data-table-component";
import { Modal, ModalBody } from "reactstrap";
import { toast, Toaster } from "react-hot-toast";



const ManufacturerTable = () => {
  const [data, setData] = useState([]);
  const [wholesaler] = useGetWholesalersMutation();
  const [deleteWholesaler] = useDeleteWholesalerMutation();
  const facilityid = useSelector(facility_id);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [wholesaler_id ,setDelId] = useState("")
  const [pending,setPending] = useState(true)
  const[filterData,setFilterData] = useState("")



  const fetchData = useCallback(async () => {
    const results = await wholesaler(facilityid).unwrap();
    console.log(results)
    dispatch(wholesalerList({ ...results?.data }));
    setData(results?.data);
  },[dispatch, facilityid, wholesaler]);
 
  useEffect(() => {
    fetchData();
    setPending(false)
  }, [fetchData]);

  const handleDeleteModal = (id) => {
    setIsOpen(true);
    setDelId(id);
  };
  
  const handleDeleteWholeSaler = async (e) => {
    e.preventDefault();
    setIsOpen(false);
    const load =  toast.loading("Deleting...")
    try {
      const res = await deleteWholesaler({ wholesaler_id }).unwrap();
      console.log(res);

      toast.promise(Promise.resolve(res), {
        success: (res) => { 
          toast.remove(load)
          return `WholeSaler Deleted`},
        error: (err) => console.log(err),
      },
      setTimeout( () => fetchData() ,1000  )   ) 
      
    } catch (error) {
      toast.remove(load)
      console.log(error);
    }
  }
  const handleEditManufacturer = (row) => {
    try {
      sessionStorage.setItem("selectedManufacturer" , JSON.stringify(row))
    } catch (error) {
      console.error("Error selecting manufacturer:", error);
    }
  };


  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      wrap : true,
      minWidth : "300px"

    },
    {
      name: "Address",
      sortable:true,
      selector: (row) => row.address,
       wrap : true,
      minWidth : "200px"
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable:true,
      wrap : true,
      minWidth : "200px"
    },
    {
      name: "Email",
      selector: (row) =>  row.email,
      wrap : true,
      minWidth : "300px"
    },
    {
      name: "Country",
      selector: (row) => `${row.country} , ${row.city}`,
      wrap : true,
      minWidth : "200px"
    },

    {
      name: "Actions",
      cell: (row) => (
        <span className="d-flex">
          <Link
            to="/pharmacy/manufacturer/edit-manufacturer"
            style={{ cursor: "pointer" }}
            onClick={() =>handleEditManufacturer(row)}
          >
            <img src={edit} alt="" />
          </Link>
          <img
            src={bin}
            alt=""
            className="mx-2"
            style={{ cursor: "pointer" }}
            onClick={() =>handleDeleteModal(row?._id)}
          />
        </span>
      ),
    },
  ];
  const handleSearch = (e)=>{
    const {value} = e.target
    
    if(value === ""){
      setFilterData(data)
    } else{
      const lowerCaseSearchTerm = value.toLowerCase();
    
      const filteredItems = data.filter(item =>
        item.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
    setFilterData(filteredItems)
      
    }
      }

  return (
    <div className="">
      <div className=" ms-bg py-2 gy-md-0 gy-2 d-flex justify-content-between">
      <div className=" mx-2 text-white small d-flex">
					<span>
						<SearchBar onChange={handleSearch} radius="8px" />
					</span>
				</div>
        <Link
          to="/pharmacy/manufacturer/add-manufacturer"
          className="btn d-sm-flex  d-none  bg-white rounded-pill text-purple text-center mx-3"
        >
          <img src={add} alt="" width={20} />
          <span className="mx-2 text-nowrap">Add Wholesaler</span>
        </Link>
      </div>
      <div className="table-responsive">
        <DataTable
              columns={columns}
              data={filterData}
              pagination
              customStyles={customStyles}
              striped
              progressPending={pending}
              // onSelectedRowsChange={handleChange}
              // selectableRows
            />
      </div>
      <Modal isOpen={isOpen} centered={true}>
            <ModalBody>
              <p className="text-center text-deep">
               Are you sure you want to delete this wholesaler?
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
                  onClick={handleDeleteWholeSaler}
                  style={{ width: "7rem" }}
                >
                  Delete
                </button>
              </div>
            </ModalBody>
          </Modal>
          <Toaster/>
    
    </div>
  );
};

export default ManufacturerTable;

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