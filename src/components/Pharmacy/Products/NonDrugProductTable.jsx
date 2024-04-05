/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { Modal, ModalBody } from "reactstrap";

import { facility_id } from "../../../app/features/authSlice/authSlice";
// import {
// 	useDeleteProductMutation,
// 	useSearchProductInPharmarcyMutation,
// } from "../../../app/features/products/productsApiSlice";
// import { allDrugs } from "../app/features/invoice/invoiceSlice";
import { useGetDrugsMutation } from "../../../app/features/invoice/invoiceApiSlice";
import {
	productsList,
	// getProducts,
} from "../../../app/features/products/productsSlice";
import { productCount } from "../../../app/features/dashboard/dashboardSlice";
import SkipTable from "./../../Global/SkipTable";
import Loading from "./../../Global/Loading";
import { getProducts } from "../../../app/features/dashboard/dashboardSlice";
import edit from "../../../assets/icons/svg/edit.svg";
import bin from "../../../assets/icons/svg/bin.svg";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import { useGetProductsMutation } from "../../../app/features/dashboard/dashboardApiSlice";
import { useGetNonDrugsMutation ,useDeleteNonProductMutation,useSearchNonProductInPharmarcyMutation } from "../../../app/features/products/productsApiSlice";

const ProductsTable = ({ search = "" }) => {
	const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [limit, setLimit] = useState(10);
	const [drug_id, setDrug_id] = useState("");
	const [productsValue] = useGetProductsMutation();
	const productTotal = useSelector(productCount);
	const [deleteProduct] = useDeleteNonProductMutation();
	const [searchDrug] = useSearchNonProductInPharmarcyMutation();
	const [drugs] = useGetDrugsMutation();
	const facilityid = useSelector(facility_id);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		console.table(data);
	}, [data]);

	const updateTotal = async () => {
		const products = await productsValue(facilityid).unwrap();
		dispatch(getProducts(products?.data));
		setTotal(products?.data);
	};
	useEffect(() => {
		fetchDrugs(0, limit);
	}, []);

	/**
	 * The function `fetchDrugs` asynchronously fetches drug data based on provided skip and limit
	 * parameters, updating state variables and handling errors accordingly.
	 */
	const fetchDrugs = useCallback(
		async (skip, limit) => {
			try {
				setIsLoading(true);
				const results = await drugs({
					store_id: facilityid,
					skip,
					limit,
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
	 * The function `searchDrugInPharmacy` asynchronously searches for a drug in a pharmacy using the
	 * provided parameters and handles errors accordingly.
	 */
	const searchNonProductInPharmacy = async (searchText) => {
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
				toast.error(
					"Error searching drugs, check your data connectivity and retry"
				);
		}
	};

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

	/**
	 * The handleEdit function logs the items parameter, stores it in sessionStorage as a JSON string, and
	 * then navigates to the "/pharmacy/products/edit-product" route.
	 */
	const handleEdit = (items) => {
		console.log(items);
		sessionStorage.setItem("nonProductSelected", JSON.stringify(items));
		navigate("/pharmacy/products/edit-non-product");
	};

	/**
	 * The `handleDelete` function sets the `isOpen` state to true and stores the `id` in the `drug_id`
	 * state.
	 */
	const handleDelete = (id) => {
		setIsOpen(true);
		setDrug_id(id);
	};

	const columns = [
		{
			name: "Name",
			sortable: true,
			selector: (row) => row?.product_name,
			minWidth: "200px",
		},
		{
			name: "Image",
			hide: "sm",

			cell: (row) => (
				<img
					src={row?.image}
					alt={`${row?.product_name}`}
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
			name: "Description",
			selector: (row) => row?.description,
			minWidth: "200px",
			hide: "md",
		},
		{
			name: "Category",
			sortable: true,
			selector: (row) => row?.product_category,
			minWidth: "200px",
			hide: "md",
		},
		{
			name: "Manufacturer",
			sortable: true,
			selector: (row) => row?.manufacturer,
			minWidth: "200px",
			hide: "md",
		},
		{
			name: "Total Stock",
			sortable: true,
			selector: (row) => row?.total_stock,
			minWidth: "200px",
			hide: "md",
		},
		{
			name: "Selling Price",
			sortable: true,
			selector: (row) => row?.selling_price,
			minWidth: "200px",
			hide: "md",
		},
		{
			name: "Discount",
			sortable: true,
			selector: (row) => row?.discount,
			minWidth: "200px",
			hide: "md",
		},
		{
			name: "Expiry Date",
			hide: "md",

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
					<img src={edit} alt="edit" onClick={() => handleEdit(row)} />
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

	const ExpandedComponent = ({ data }) => (
		<div className="d-flex align-items-center">
			<div className="mx-2 ">
				{isMobile ? (
					<img
						src={data?.image}
						alt={data?.product_name}
						className="img-fluid rounded"
						style={{
							width: "7rem",
							height: "7rem",
							objectFit: "cover",
							mixBlendMode: "darken",
							pointerEvents: "none",
						}}
					/>
				) : (
					""
				)}
			</div>
			<div>
				<p className=" mb-0 text-deep">
					<strong>Manufacturer:</strong> {data?.manufau}
				</p>
				<p className="mb-0  text-deep">
					<strong>Selling Price:</strong> {data.selling_price}
				</p>
				<p className=" mb-0 text-deep">
					<strong>Total Stock:</strong> {data.total_stock}
				</p>
				<p className=" mb-0 text-deep">
					<strong>Expiry Date:</strong>{" "}
					{`${new Date(data?.expiry_date).getDate()}/${
						new Date(data?.expiry_date).getMonth() + 1
					}/${new Date(data?.expiry_date).getFullYear()}`}
				</p>
			</div>
		</div>
	);

	return (
		<> 
        <h2 className="text-deep d-flex justify-content-center">Non Pharmaceutical Items</h2>
			<SkipTable
				isLoading={isLoading}
				data={data}
				setData={setData}
				total={total}
				filterData={filterData}
				fetchItemApi={fetchDrugs}
				setFilterData={setFilterData}
				searchItemApi={searchNonProductInPharmacy}
				columns={columns}
				ExpandedComponent={ExpandedComponent}
				limit={limit}
				setLimit={setLimit}
                CustomLoader={<Loading/>}
			/>
            

			<Modal isOpen={isOpen} centered={true}>
				<ModalBody>
					<p className="text-center text-deep">
						Do you want to delete this product?
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
										fetchDrugs(0, limit);
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
