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
import { useEffect } from "react";
// import axios from "../config/api/axios";
// import { local } from "d3";
import { useState ,useCallback } from "react";
import {
	useGetCustomersMutation,
	useDeleteCustomerMutation,
} from "../../../app/features/customers/customerApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { facility_id } from "../../../app/features/authSlice/authSlice";
import {
	// selectCustomer,
	customerList,
	getSelectedCustomer,
} from "../../../app/features/customers/customerSlice";
import DataTable from "react-data-table-component";
import { Modal, ModalBody } from "reactstrap";
import { toast, Toaster } from "react-hot-toast";

const CustomerListTable = () => {
	const [customers] = useGetCustomersMutation();
	const [deleteCustomer] = useDeleteCustomerMutation();
	const facilityid = useSelector(facility_id);
	// const token = useSelector(setToken);
	const editCustomer = useSelector(getSelectedCustomer);
	const [data, setData] = useState([]);
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const [customer_id, setDelId] = useState("");
	const [pending,setPending] = useState(true)
	const[filterData,setFilterData] = useState("")

	const fetchData = useCallback( async () => {
		const results = await customers(facilityid).unwrap();
		dispatch(customerList({ ...results?.data }));
		setData(results?.data);
	},[customers, dispatch, facilityid]);

	useEffect(() => {

		fetchData();
		setPending(false)
	}, [fetchData]);

	// const [enteries, setEnteries] = useState(10);

	// const handleEntryChange = (e) => {
	// 	setEnteries(e.target.value);
	// };

	const handleDeleteModal = (id) => {
		setIsOpen(true);
		setDelId(id);
	};

	// const handleDeleteCustomer = async (e) => {
	// 	e.preventDefault();
	// 	setIsOpen(false);
	// 	try {
	// 		const res = await deleteCustomer({ customer_id }).unwrap();
	// 		console.log(res);

	// 		toast.promise(Promise.resolve(res), {
	// 			loading: "Deleting...",
	// 			success: (res) => `Customer Deleted`,
	// 			error: (err) => console.log(err),
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	const handleDeleteCustomer = async (e) => {
		e.preventDefault();
		setIsOpen(false);
	  
		const remove = toast.loading("Deleting...");
		try {
		  const res = await deleteCustomer({ customer_id }).unwrap();
		  console.log(res);
	  toast.remove(remove)
		  toast.success("Customer Deleted");
		  fetchData()
		} catch (error) {
			toast.remove(remove)

		  console.log(error);
		  toast.error("An error occurred");
		}
	  };
	  

	const handleEditCustomer = (row) => {
		try {
			// dispatch(selectCustomer({...row}));   session used rather to prevent data loss in non api requests
			sessionStorage.setItem("selectedCustomer", JSON.stringify(row));
		} catch (error) {
			console.error("Error selecting customer:", error);
		}
	};

	useEffect(() => {
		console.log("Selected Customer:", editCustomer);
	}, [editCustomer]);

	const columns = [
		{
			name: "Name",
			selector: (row) => row.name,
			wrap: true,
			minWidth: "300px",
		},
		{
			name: "Address",
			sortable:true,
			selector: (row) => row.address,
			wrap: true,
			minWidth: "200px",
		},
		{
			name: "Phone",
			sortable:true,
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
					<Link to="/pharmacy/customers/edit-customer" style={{ cursor: "pointer" }}>
						<img
							src={edit}
							alt="Edit png"
							onClick={() => handleEditCustomer(row)}
						/>
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
					to="/pharmacy/customers/add-customers"
					className="btn  bg-white d-sm-flex d-none rounded-pill text-purple text-center mx-3">
					<img src={add} alt="" />
					<span className="mx-2">Add Customer</span>
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
						Are you sure you want to delete this customer?
					</p>
					<div className="d-flex pb-3 justify-content-center align-items-center mx-auto">
						<button
							className="btn btn-danger mx-2"
							onClick={() => setIsOpen(false)}
							style={{ width: "7rem" }}>
							Cancel
						</button>
						<button
							className="btn btn-success text-white mx-2"
							onClick={handleDeleteCustomer}
							style={{ width: "7rem" }}>
							Delete
						</button>
					</div>
				</ModalBody>
			</Modal>
			<Toaster />
		</div>
	);
};

export default CustomerListTable;

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
