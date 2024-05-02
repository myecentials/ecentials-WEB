/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { Modal, ModalBody } from "reactstrap";
import DataTable from "react-data-table-component";
import { Input } from "reactstrap";

import { facility_id } from "../../../app/features/authSlice/authSlice";
import { useDeleteProductMutation } from "../../../app/features/products/productsApiSlice";
import { useGetDrugsMutation } from "../../../app/features/invoice/invoiceApiSlice";
import { productsList } from "../../../app/features/products/productsSlice";
import { productCount } from "../../../app/features/dashboard/dashboardSlice";
import { setProducts } from "../../../app/features/dashboard/dashboardSlice";
import { useGetProductsMutation } from "../../../app/features/dashboard/dashboardApiSlice";
import { useFetchProductsApprovalsMutation } from "../../../app/features/products/productsApiSlice";
import Loading from "./../../Global/Loading";


const ProductsTable = ({ search = "" }) => {
	// const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

	const [fetchProductsApprovals] = useFetchProductsApprovalsMutation();
	// const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [limit] = useState(10);
	const [drug_id] = useState("");
	const [productsValue] = useGetProductsMutation();
	const productTotal = useSelector(productCount);
	const [deleteProduct] = useDeleteProductMutation();
	const [drugs] = useGetDrugsMutation();
	const facilityid = useSelector(facility_id);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [, setTotal] = useState(0);

	const [searchText, setSearchText] = useState("");
	const [filter, setFilter] = useState({
		date: "",
		status: "",
	});

	useEffect(() => {
		console.table(data);
	}, [data]);

	const updateTotal = async () => {
		const products = await productsValue(facilityid).unwrap();
		dispatch(setProducts(products?.data));
		setTotal(products?.data);
	};
	useEffect(() => {
		fetchApprovals(0, limit);
	}, []);

	/**
	 * The function `fetchDrugs` asynchronously fetches drug data based on provided skip and limit
	 * parameters, updating state variables and handling errors accordingly.
	 */
	const fetchApprovals = useCallback(
		async (skip, limit) => {
			try {
				setIsLoading(true);
				const results = await fetchProductsApprovals({
					store_id: facilityid,
				}).unwrap();
				dispatch(productsList([...results?.data]));
				console.log(results.data);

				setData((prevData) => [...prevData, ...results.data]);
				setFilterData(results.data);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				console.error("Error fetching drugs:", error);
				if (error.status === "FETCH_ERROR")
					toast.error("Error fetching drugs, retry");
			}
		},
		[dispatch, drugs, facilityid]
	);

	useEffect(() => {
		setTotal(productTotal);
	}, []);

	/**
	 * The function `handleDeleteDrug` is an asynchronous function that deletes a drug by its ID and
	 * displays appropriate toast messages based on the deletion status.
	 */
	const handleDeleteDrug = async (drug_id) => {
		// setIsOpen(false);
		const load = toast.loading("Deleting Drug...");

		try {
			const res = await deleteProduct({ drug_id }).unwrap();
			if (res.message === "drug deleted successfully") {
				toast.remove(load);
				toast.success("Drug Deleted Successfully");

				return true;
				//  fetchDrugs()
			}
		} catch (error) {
			toast.remove(load);
			toast.error("Drug Deletion Unsuccessful");
			console.log(error);
			return false;
		}
	};

	const columns = [
		{
			name: "Name",
			sortable: true,
			selector: (row) => row?.name,
			minWidth: "200px",
		},

		{
			name: "Picture",
			// hide: "sm",

			cell: (row) => (
				<img
					src={row?.image}
					alt={`${row?.name}`}
					className="img-fluid d-block rounded "
					style={{
						width: "5rem",
						height: "3rem",
						aspectRatio: "3 / 2",
						objectFit: "contain",
						mixBlendMode: "darken",
						pointerEvents: "none",
					}}
				/>
			),
		},
		{
			name: "Status",
			minWidth: "200px",
			cell: (row) => (
				<span
					className="rounded-pill border-0 px-3 py-1 small"
					style={{
						backgroundColor: `${
							row.approval_status === "Cancelled"
								? "#FBE7E8"
								: row.approval_status === "Pending"
								? "#C1BBEB"
								: row.approval_status === "Approved"
								? "#EBF9F1"
								: ""
						}`,
						color: `${
							row.approval_status === "Cancelled"
								? "#A30D11"
								: row.approval_status === "New"
								? "#4D44B5"
								: row.approval_status === "Approved"
								? "#1F9254"
								: ""
						}`,
					}}>
					{row.approval_status}
				</span>
			),
		},
		{
			name: "Dosage",
			selector: (row) => row?.dosage,
			minWidth: "200px",
			// hide: "md",
		},
		{
			name: "Selling Price",
			sortable: true,
			selector: (row) => row?.selling_price,
			minWidth: "200px",
			// hide: "md",
		},
		{
			name: "Total Item",
			sortable: true,
			selector: (row) => row?.total_stock,
			minWidth: "200px",
			// hide: "md",
		},
		{
			name: "Expiry Date",
			// hide: "md",

			sortable: true,
			cell: (row) => (
				<span>
					{`${new Date(row?.expiry_date).getDate()}/${
						new Date(row?.expiry_date).getMonth() + 1
					}/${new Date(row?.expiry_date).getFullYear()}`}
				</span>
			),
			minWidth: "200px",
		},
	];

	//  This is a search for the order_code
	useEffect(() => {
		if (searchText === "") {
			setFilterData(data);
		} else {
			const filteredItems = data.filter(
				(item) =>
					item.name &&
					item.name.toLowerCase().includes(searchText.toLowerCase())
			);
			console.log(filteredItems);
			setFilterData(filteredItems);
		}
	}, [data, searchText]);

	useEffect(() => {
		const filteredItems = data.filter((item) => {
			// Create Date objects for comparison, ignoring time components
			const itemDate = new Date(item.createdAt);
			const filterDate = new Date(filter.date);

			// Compare year, month, and day separately to ensure full-day matching
			const isDateMatch = itemDate === filterDate;

			if (filter.status !== "" && filter.date !== "") {
				// Check both status and full-day date match
				return item.approval_status === filter.status && isDateMatch;
			} else if (filter.status !== "") {
				// Check status match only
				return item.approval_status === filter.status;
			} else if (filter.date !== "") {
				// Check full-day date match only
				return isDateMatch;
			} else {
				// No filter applied
				return true;
			}
		});

		setFilterData(filteredItems);
	}, [data, filter.date, filter.status]);

	useEffect(() => {
		console.log(filter);
	}, [filter]);

	return (
		<>
			<div className="row mx-2 my-4 gy-md-0 gy-3">
				<div className="col-md">
					<Input
						className="order-number border-0 rounded-0"
						type="text"
						placeholder="Filter by Name"
						onChange={(e) => setSearchText(e.target.value)}
					/>
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
							<option value="Pending" style={{ color: "#4D44B5" }}>
								Pending
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

			<DataTable
				columns={columns}
				data={filterData}
				pagination
				customStyles={customStyles}
				striped
				progressComponent={<Loading />}
				progressPending={isLoading}
			/>

			<Modal isOpen={isOpen} centered={true}>
				<ModalBody>
					<p className="text-center text-deep">
						Do you want to delete this drug?
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
							onClick={() => {
								setIsOpen(false);
								const res = handleDeleteDrug(drug_id);
								setTimeout(() => {
									if (res) {
										fetchApprovals(0, limit);
										updateTotal();
									}
								}, 3000);
							}}
							style={{ width: "7rem" }}>
							Delete
						</button>
					</div>
				</ModalBody>
			</Modal>
			<Toaster />
		</>
	);
};

export default ProductsTable;
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
