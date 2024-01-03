import React, { useEffect, useState,useCallback } from "react";
import { Modal, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import edit from "../assets/icons/svg/edit.svg";
import bin from "../assets/icons/svg/bin.svg";

import { facility_id } from "../app/features/authSlice/authSlice";
import {
	useDeleteProductMutation,
	useSearchProductInPharmarcyMutation,
} from "../app/features/products/productsApiSlice";
// import { allDrugs } from "../app/features/invoice/invoiceSlice";
import { useGetDrugsMutation } from "../app/features/invoice/invoiceApiSlice";
import {
	productsList,
	// getProducts,
} from "../app/features/products/productsSlice";
import { useNavigate } from "react-router-dom";
import { productCount } from "./../app/features/dashboard/dashboardSlice";

const ProductsTable = ({ search = "" }) => {
	// const products = useSelector(getProducts);
	const productTotal = useSelector(productCount);
	const [deleteProduct] = useDeleteProductMutation();
	const [searchDrug] = useSearchProductInPharmarcyMutation();
	const navigate = useNavigate();
	const [drugs] = useGetDrugsMutation();
	const facilityid = useSelector(facility_id);
	const dispatch = useDispatch();
	// const [drugsCount] = useGetDrugsCountMutation();
	const [isLoading, setIsLoading] = useState(false);

	const [data, setData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [sload, setSLoad] = useState(true);
	const [load, setLoad] = useState(false);

	const [total, setTotal] = useState(0);
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

	// const handleEntryChange = (e) => {
	//   setEnteries(e.target.value);
	// };

	// const handleFilter = (event) =>{
	//   const newData = filterData.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()))
	//   setData(newData)
	// }

	useEffect(() => {
		console.log("Fetching", skip, limit);
	}, [skip, limit]);

	const handleNext = () => {
		console.log(data);

		if (skip === cSkip) {
			const newSkip = skip + limit; //  then fetch
			fetchDrugs(newSkip, limit);
			setSkip(newSkip);
			setCSkip(newSkip);
		} else {
			const newSkip = cSkip + limit; // after slice the existing array
			const extractedElements = data.slice(newSkip, newSkip + limit + 1);
			setFilterData(extractedElements);
			console.log("Show array from", newSkip );
			console.log("to", newSkip + limit);
			setCSkip(newSkip);
		}
	};

	const handleNewLimit = (val) => {
		setLimit(val);
		setCSkip(0);
		setSkip(0);
    setData([])
    fetchDrugs(0, val)
		const extractedElements = data.slice(0, val);
		setFilterData(extractedElements);
	};

	const handlePrevious = () => {
		const newSkip = cSkip - limit;
		console.log("Show array from", newSkip);
		console.log("to", newSkip + limit);
		const extractedElements = data.slice(newSkip, newSkip + limit);
		setFilterData(extractedElements);
		setCSkip(newSkip);
	};

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

	const fetchDrugs = useCallback(async (skip, limit) => {
		try {
			setIsLoading(true);
			const results = await drugs({
				store_id: facilityid,
				skip,
				limit,
			}).unwrap();
			dispatch(productsList([...results?.data]));
			setData((prevData) => [...prevData, ...results.data]);
			setFilterData(results.data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error("Error fetching drugs:", error);
			if (error.status === "FETCH_ERROR")
				toast.error("Error fetching drugs, retry");
		}
	},[dispatch, drugs, facilityid]);
	

	useEffect(() => {
		fetchDrugs(skip, limit);
		setTotal(productTotal);
	}, [fetchDrugs, limit, productTotal, skip]);

	const searchDrugInPharmacy = async () => {
		try {
			setIsLoading(true);
			const res = await searchDrug({
				store_id: facilityid,
				search_text: searchText,
			}).unwrap();
			setFilterData(res.data);
			setIsLoading(false);
		} catch (error) {
			console.error("Error in searchDrugInPharmacy:", error);
			setIsLoading(false);
			if (error.status === "FETCH_ERROR")
				toast.error("Error searching drugs, check your data connectivity and retry");
		}
		
	};

	// useEffect(() => {
	//  searchDrugInPharmacy();
	// },[]);

	// const pharmDrugs = useSelector(allDrugs);
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const results = await pharmDrugs;
	// 			// console.log(results);
	// 			setData(results);
	// 		} catch (error) {}
	// 	};
	// 	fetchData();
	// }, [pharmDrugs]);

	const handleEdit = (items) => {
		console.log(items);
		sessionStorage.setItem("productSelected", JSON.stringify(items));
		navigate("/pharmacy/products/edit-product");
	};

	const [isOpen, setIsOpen] = useState(false);
	const [drug_id, setDrug_id] = useState("");

	const handleDelete = (id) => {
		setIsOpen(true);
		setDrug_id(id);
	};

	const handleDeleteDrug = async () => {
		setIsOpen(false);
		try {
			const res = await deleteProduct({ drug_id }).unwrap();
			toast.promise(
				Promise.resolve(res),
				{
					loading: (res) => "Deleting...",
					success: (res) => `Drug Deleted Succesfully`,
					error: (err) => "An error occured , please try again",
				},
				setTimeout(() => fetchDrugs(), 5000)
			);
		} catch (error) {
			console.log(error);
		}
	};

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
						onClick={searchDrugInPharmacy}
						disabled={sload}>
						Search
					</button>
				</div>

				{/* <button
					className="btn w-10 rounded-2 bg-light text-primary mx-4"
					onClick={handleNextPage}
					disabled={load}>
					LoadMore
				</button> */}
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
                value = {limit}
								onChange={(e) => handleNewLimit(parseInt(e.target.value, 10))}>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="20">20</option>
								<option value="30">30</option>
							</select>
						</div>
						<p className="small text-center my-2 mx-4">
							{`${cSkip + 1} - ${cSkip + limit} of ${data.length}`}
						</p>
						<button
							className="rounded-circle px-3 py-1 border-0 mx-2"
							onClick={handlePrevious}
							disabled={cSkip === 0}>
							&lt;
						</button>
						<button
							className="rounded-circle px-3 py-1 border-0 mx-2"
							onClick={handleNext}
							disabled={total - cSkip <= limit}>
							&gt;
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
								onClick={handleDeleteDrug}
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

export default ProductsTable;

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
