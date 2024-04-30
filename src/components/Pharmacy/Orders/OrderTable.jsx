import React from "react";
// import leftchev from "../assets/icons/svg/leftchev.svg";
// import rightchev from "../assets/icons/svg/rightchev.svg";
// import updownchev from "../assets/icons/svg/updownchev.svg";
// import { Table } from "reactstrap";
// import chev from "../assets/icons/svg/chevfilldown.svg";
import { Link } from "react-router-dom";
// import orders from "../static/orders";
import axios from "../../../config/api/axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../Loader";
// import useAuth from "../hooks/useAuth";
import { useFetchAllOrdersMutation } from "../../../app/features/orders/ordersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	facility_id,
	setToken,
} from "../../../app/features/authSlice/authSlice";
import { allOrders } from "../../../app/features/orders/ordersSlice";
// import { Pagination } from "@mui/material";
import DataTable from "react-data-table-component";
// import { navigate } from "@storybook/addon-links/*";
import { toast, Toaster } from "react-hot-toast";
import { Input } from "reactstrap";

const OrderTable = () => {
	// const { auth } = useAuth();
	const [data, setData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [orders] = useFetchAllOrdersMutation();
	const facilityid = useSelector(facility_id);
	const dispatch = useDispatch();
	const token = useSelector(setToken);
	const facilityId = useSelector(facility_id);
	const [searchText, setSearchText] = useState("");
	const [filter, setFilter] = useState({
		date: "",
		status: "",
	});

	//  This is a search for the order_code
	useEffect(() => {
		if (searchText === "") {
			setFilterData(data);
		} else {
			const filteredItems = data.filter(
				(item) =>
					item.order_code &&
					item.order_code.toLowerCase().includes(searchText.toLowerCase())
			);
			console.log(filteredItems);
			setFilterData(filteredItems);
		}
	}, [data, searchText]);

	useEffect(() => {
		if (filter.status !== "" && filter.date !== "") {
			const filteredItems = data.filter(
				(item) =>
					item.order_status === filter.status &&
					item.createdAt.startsWith(filter.date)
			);
			setFilterData(filteredItems);
		} else if (filter.status !== "") {
			const filteredItems = data.filter(
				(item) => item.order_status === filter.status
			);
			setFilterData(filteredItems);
		} else if (filter.date !== "") {
			const filteredItems = data.filter((item) =>
				item.createdAt.startsWith(filter.date)
			);
			setFilterData(filteredItems);
		} else {
			setFilterData(data);
		}
	}, [data, filter.date, filter.status]);

	useEffect(() => {
		console.log(filter);
	}, [filter]);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const results = await orders(facilityid).unwrap();
				dispatch(allOrders({ ...results.data }));
				setData(results.data);
			} catch (error) {
				if (error.status === "FETCH_ERROR")
					toast.error("Error fetching orders, retry");
			}
		};
		fetchOrders();
	}, [dispatch, facilityid, orders]);

	useEffect(() => {
		setIsLoading(true);
		axios
			.post(
				"/pharmacy/orders/fetch-all-orders",
				{
					store_id: facilityId,
				},
				{
					headers: {
						"auth-token": token,
					},
				}
			)
			.then((res) => {
				console.log(res);
				setIsLoading(false);
				setData(res.data.data);
			})
			.catch((err) => {
				setIsLoading(false);
				console.log(err);
			});
	}, [facilityId, token]);

	const handleDetail = (item) => {
		sessionStorage.setItem("orderIdSelected", JSON.stringify(item));
	};

	const columns = [
		{
			name: "Order ID.",
			cell: (row) => (
				<span>
					<Link
						to="/pharmacy/orders/order-details"
						style={{
							cursor: "pointer",
							color: "inherit", // Inherit the color from the parent
							textDecoration: "none",
						}}
						onClick={() => handleDetail(row)}>
						{row?.order_code}
					</Link>
				</span>
			),
			minWidth: "200px",
		},
		{
			name: "Payment Type",
			cell: (row) => (
				<span>
					<Link
						to="/pharmacy/orders/order-details"
						style={{
							cursor: "pointer",
							color: "inherit", // Inherit the color from the parent
							textDecoration: "none",
						}}
						onClick={() => handleDetail(row)}>
						{row?.payment_type}
					</Link>
				</span>
			),
			minWidth: "200px",
		},
		{
			name: "Payment Status",
			cell: (row) => (
				<span>
					<Link
						to="/pharmacy/orders/order-details"
						style={{
							cursor: "pointer",
							color: "inherit", // Inherit the color from the parent
							textDecoration: "none",
						}}
						onClick={() => handleDetail(row)}>
						{row?.payment_status}
					</Link>
				</span>
			),
			minWidth: "200px",
		},
		{
			name: "Grand Total(GHC)",
			cell: (row) => (
				<span>
					<Link
						to="/pharmacy/orders/order-details"
						style={{
							cursor: "pointer",
							color: "inherit", // Inherit the color from the parent
							textDecoration: "none",
						}}
						onClick={() => handleDetail(row)}>
						{row?.grand_total?.toFixed(2)}
					</Link>
				</span>
			),
			minWidth: "200px",
		},
		{
			name: "Order Status",
			minWidth: "200px",
			cell: (row) => (
				<Link
					to="/pharmacy/orders/order-details"
					style={{
						cursor: "pointer",
						color: "inherit", // Inherit the color from the parent
						textDecoration: "none",
					}}
					onClick={() => handleDetail(row)}>
					<span
						className="rounded-pill border-0 px-3 py-1 small"
						onClick={() => handleDetail(row)}
						style={{
							backgroundColor: `${
								row.order_status === "Cancelled"
									? "#FBE7E8"
									: row.order_status === "New"
									? "#C1BBEB"
									: row.order_status === "Approved"
									? "#EBF9F1"
									: ""
							}`,
							color: `${
								row.order_status === "Cancelled"
									? "#A30D11"
									: row.order_status === "New"
									? "#4D44B5"
									: row.order_status === "Approved"
									? "#1F9254"
									: ""
							}`,
						}}>
						{row.order_status}
					</span>
				</Link>
			),
		},
		{
			name: "Action",
			minWidth: "200px",
			cell: (row) => (
				<span className="py-3">
					{row.order_status === "Cancelled" ? (
						<Link
							disabled
							to="/pharmacy/orders/order-details"
							className="border-0 px-3 py-1 small rounded-pill"
							style={{
								backgroundColor: "rgba(147, 193, 249, 0.15)",
								color: "#007bff5a",
							}}
							onClick={() => handleDetail(row)}>
							Details
						</Link>
					) : (
						<Link
							to="/pharmacy/orders/order-details"
							className="border-0 px-3 py-1 small rounded-pill"
							style={{
								backgroundColor: "rgba(147, 193, 249, 0.29)",
								color: "#007AFF",
							}}
							onClick={() => handleDetail(row)}>
							Details
						</Link>
					)}
				</span>
			),
		},
		{
			name: "Date",
			minWidth: "200px",
			cell: (row) => (
				<span className="py-3">
					<Link
						to="/pharmacy/orders/order-details"
						style={{
							cursor: "pointer",
							color: "inherit", // Inherit the color from the parent
							textDecoration: "none",
						}}
						onClick={() => handleDetail(row)}>
						{`${new Date(row.createdAt).getDate()}/${
							new Date(row.createdAt).getMonth() + 1
						}/${new Date(row.createdAt).getFullYear()}`}
					</Link>
				</span>
			),
		},
	];

	return (
		<>
			<div className="row mx-2 my-4 gy-md-0 gy-3">
				<div className="col-md">
					<Input
						className="order-number border-0 rounded-0"
						type="text"
						placeholder="Filter by Order ID"
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</div>
				<div className="col-md">
					<div className="d-flex">
						<button
							className="btn text-deep"
							style={{ backgroundColor: " #F7FAFE" }}>
							Date
						</button>
						<Input
							className="order-number  border-0 rounded-0"
							type="date"
							onChange={(e) =>
								setFilter((prev) => ({ ...prev, date: e.target.value }))
							}
						/>
					</div>
				</div>
				<div className="col-md">
					<div className="d-flex">
						<Input
							className="order-number border-0 rounded-0"
							type="select"
							onChange={(e) =>
								setFilter((prev) => ({ ...prev, status: e.target.value }))
							}>
							<option value="" style={{ color: "gray" }}>
								{" "}
								Select Status{" "}
							</option>
							<option value="New" style={{ color: "#4D44B5" }}>
								New
							</option>
							<option value="Approved" style={{ color: "#1F9254" }}>
								Approved
							</option>
							<option value="Cancelled" style={{ color: "#A30D11" }}>
								Cancelled
							</option>
						</Input>

						{/* <Select
           className="order-number border-0 rounded-0"
           options={selectOptions}
       /> */}
						{/* <button className="ms-bg text-white px-3 rounded">Find</button> */}
					</div>
				</div>
			</div>
			<div className="mx-3 card bg-white border-0">
				<Toaster />

				<div className=" ms-bg py-2 gy-md-0 gy-2">
					<div className=" my-0 text-white small ">
						{/* <span className="mx-2 text-nowrap">
      Showing{" "}
      <select name="enteries" id="" onChange={handleEntryChange}>
        {data.slice(0, Math.ceil(data.length / 10)).map(({}, index) => (
          <option value={index * 10 + 10}>{index * 10 + 10}</option>
        ))}
      </select>{" "}
      entries
    </span> */}
					</div>
				</div>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<div className="table-responsive">
							<DataTable
								columns={columns}
								data={filterData}
								pagination
								customStyles={customStyles}
								striped
							/>
						</div>
					</>
				)}
				{/* <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
      <p className="small text-center">
        Showing <span className="text-lightdeep">1-{enteries}</span> from{" "}
        <span className="text-lightdeep">{data.length}</span> data
      </p>
      <Pagination count={Math.ceil(data.length / postPerPage)}   onChange={paginate}/>
    </div> */}
			</div>
		</>
	);
};

export default OrderTable;

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
