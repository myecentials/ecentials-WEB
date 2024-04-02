/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import edit from "../../assets/icons/svg/edit.svg";
import bin from "../../assets/icons/svg/bin.svg";

import { useNavigate } from "react-router-dom";
import { FiArrowRightCircle } from "react-icons/fi";
import { FiArrowLeftCircle } from "react-icons/fi";

const SkipTable = ({
	fetchItemApi,
	deleteItemApi,
	data,
	filterData,
	setFilterData,
	total,
	searchItemApi,
	isLoading,
	refreshTotal,
}) => {
	const navigate = useNavigate();
	// const [drugs] = useGetDrugsMutation();

	// const [drugsCount] = useGetDrugsCountMutation();
	// const [, setIsLoading] = useState(false);
	const [, setData] = useState([]);
	// const [filterData, setFilterData] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [sload, setSLoad] = useState(true);
	const [load, setLoad] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	// const [total, setTotal] = useState(0);
	const [limit, setLimit] = useState(10);
	const [skip, setSkip] = useState(0);
	const [cSkip, setCSkip] = useState(0);

	const columns = [
		{
			name: "Name",
			sortable: true,
			selector: (row) => row?.name,
			minWidth: "200px",
		},
		{
			name: "Picture",
			cell: (row) => (
				<img
					src={row?.image}
					alt=""
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
			name: "Dosage",
			selector: (row) => row?.dosage,
			minWidth: "200px",
		},
		{
			name: "Selling Price",
			sortable: true,
			selector: (row) => row?.selling_price,
			minWidth: "200px",
		},
		{
			name: "Total Item",
			sortable: true,
			selector: (row) => row?.total_stock,
			minWidth: "200px",
		},
		{
			name: "Expiry Date",
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

		{
			name: "Actions",
			cell: (row) => (
				<span className="d-flex">
					{/* <Link
                            to="/products/edit-product"
                            onClick={() =>
                              handleProductIndex()  
                            }                              
                            >
                            </Link> */}
					<img src={edit} alt="" onClick={() => handleEdit(row)} />
					<img
						src={bin}
						alt=""
						className="mx-2"
						style={{ cursor: "pointer" }}
						onClick={() => handleDelete(row?._id)}
					/>
				</span>
			),
		},
	];

	useEffect(() => {
		console.log("Fetching", skip, limit);
	}, [skip, limit]);

	useEffect(() => {
		console.log(data);
	}, [data]);

	/**
	 * The `handleNext` function in a JavaScript React component fetches new data or extracts elements from
	 * an existing array based on the current skip and limit values.
	 */
	const handleNext = () => {
		if (skip === cSkip) {
			const newSkip = skip + limit; //  then fetch
			fetchItemApi(newSkip, limit);
			setSkip(newSkip);
			setCSkip(newSkip);
		} else {
			const newSkip = cSkip + limit; // after slice the existing array
			const extractedElements = data.slice(newSkip, newSkip + limit + 1);
			setFilterData(extractedElements);
			console.log("Show array from", newSkip);
			console.log("to", newSkip + limit);
			setCSkip(newSkip);
		}
	};

	/**
	 * The `handleNewLimit` function sets a new limit for data display, resets skip values, clears
	 * existing data, fetches new data, extracts elements based on the new limit, and updates the filtered
	 * data state.
	 */
	const handleNewLimit = (val) => {
		setLimit(val);
		setCSkip(0);
		setSkip(0);
		setData([]);
		fetchItemApi(0, val);
		const extractedElements = data.slice(0, val);
		setFilterData(extractedElements);
	};

	/**
	 * The `handlePrevious` function in JavaScript React updates the displayed array by moving back to the
	 * previous set of elements based on the specified limit.
	 */
	const handlePrevious = () => {
		const newSkip = cSkip - limit;
		console.log("Show array from", newSkip);
		console.log("to", newSkip + limit);
		const extractedElements = data.slice(newSkip, newSkip + limit);
		setFilterData(extractedElements);
		setCSkip(newSkip);
	};

	/**
	 * The `handleFilter` function checks if the input value is empty and updates state variables
	 * accordingly, or sets the search text and triggers a search function if the input is not empty.
	 */
	const handleFilter = (event) => {
		if (event.target.value === "") {
			console.log("Empty oo, do something");
			setSLoad(true);
			setLoad(false);
			setCSkip(0);
			// setSkip(0);
			// fetchDrugs();
			const extractedElements = data.slice(0, limit);
			setFilterData(extractedElements);
		} else {
			setSLoad(false);
			setLoad(true);
			setSearchText(event.target.value);
			// searchDrugInPharmacy()
		}
	};

	/**
	 * The handleEdit function logs the items parameter, stores it in sessionStorage as a JSON string, and
	 * then navigates to the "/pharmacy/products/edit-product" route.
	 */
	const handleEdit = (items) => {
		console.log(items);
		sessionStorage.setItem("productSelected", JSON.stringify(items));
		navigate("/pharmacy/products/edit-product");
	};

	const [drug_id, setDrug_id] = useState("");

	/**
	 * The `handleDelete` function sets the `isOpen` state to true and stores the `id` in the `drug_id`
	 * state.
	 */
	const handleDelete = (id) => {
		setIsOpen(true);
		setDrug_id(id);
	};

	useEffect(() => {
		fetchItemApi(skip, limit);
	}, []);

	return (
		<div className="mx-3 card  border-0">
			<div className="d-flex justify-content-between ms-bg py-2 gy-md-0 gy-2 ">
				<div className="d-flex ">
					<input
						type="search"
						className="form-control border-0 rounded-pill  w-50 mx-4"
						placeholder="Search..."
						name="search"
						onChange={handleFilter}
					/>

					<button
						className="btn w-10 rounded-2 bg-light text-secondary"
						onClick={() => searchItemApi(searchText)}
						disabled={sload}>
						Search
					</button>
				</div>
			</div>
			{/* {isLoading ? (
        <Loader />
      ) : ( */}

			<div className="table-responsive">
				<DataTable
					columns={columns}
					data={filterData}
					customStyles={customStyles}
					striped
					pagination={load}
					progressPending={isLoading}
				/>
			</div>
			{/* )} */}
			<div className="d-md-flex justify-content-end  align-items-center mx-4 mb-5 mt-4">
				{data?.length === 0 || load ? (
					""
				) : (
					<>
						<div>
							<label htmlFor="selectOptions">Select Options:</label>
							<select
								id="selectOptions"
								value={limit}
								onChange={(e) => handleNewLimit(parseInt(e.target.value, 10))}>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="20">20</option>
								<option value="30">30</option>
							</select>
						</div>
						<p className="small text-center my-2 mx-4">
							{`${cSkip + 1} - ${cSkip + limit} of ${total}`}
						</p>
						<button
							className=" border-0 mx-2"
							onClick={handlePrevious}
							disabled={cSkip === 0}>
							<FiArrowLeftCircle
								size={30}
								className={` bg-white ${cSkip === 0 ? "" : "text-deep"} `}
							/>
						</button>
						<button
							className="  border-0 mx-2"
							onClick={handleNext}
							disabled={total - cSkip <= limit}>
							<FiArrowRightCircle
								size={30}
								className={`bg-white ${
									total - cSkip <= limit ? "" : "text-deep"
								}`}
							/>{" "}
						</button>
					</>
				)}

				{/* <Pagination count={Math.ceil(drugTotal / postPerPage)}   onChange={paginate}/> */}
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
									const res = deleteItemApi(drug_id);
									setTimeout(() => {
										if (res) {
											fetchItemApi(0, limit);
											refreshTotal();
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
			</div>
		</div>
	);
};

export default SkipTable;

/**
 *  This is the styling for the Datatable
 */
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
