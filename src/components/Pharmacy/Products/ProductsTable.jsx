/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { facility_id } from "../../../app/features/authSlice/authSlice";
import {
	useDeleteProductMutation,
	useSearchProductInPharmarcyMutation,
} from "../../../app/features/products/productsApiSlice";
// import { allDrugs } from "../app/features/invoice/invoiceSlice";
import { useGetDrugsMutation } from "../../../app/features/invoice/invoiceApiSlice";
import {
	productsList,
	// getProducts,
} from "../../../app/features/products/productsSlice";
import { productCount } from "../../../app/features/dashboard/dashboardSlice";
import SkipTable from "./../../Global/SkipTable";
import { getProducts } from "../../../app/features/dashboard/dashboardSlice";

import { useGetProductsMutation } from "../../../app/features/dashboard/dashboardApiSlice";

const ProductsTable = ({ search = "" }) => {
	// const products = useSelector(getProducts);
	const [productsValue] = useGetProductsMutation();

	const productTotal = useSelector(productCount);
	const [deleteProduct] = useDeleteProductMutation();
	const [searchDrug] = useSearchProductInPharmarcyMutation();
	const [drugs] = useGetDrugsMutation();
	const facilityid = useSelector(facility_id);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [filterData, setFilterData] = useState([]);
	const [total, setTotal] = useState(0);

	// const columns = [
	// 	{
	// 		name: "Name",
	// 		sortable: true,
	// 		selector: (row) => row?.name,
	// 		minWidth: "200px",
	// 	},
	// 	{
	// 		name: "Picture",
	// 		cell: (row) => (
	// 			<img
	// 				src={row?.image}
	// 				alt=""
	// 				className="img-fluid d-block rounded "
	// 				style={{
	// 					width: "5rem",
	// 					height: "3rem",
	// 					aspectRatio: "3 / 2",
	// 					objectFit: "contain",
	// 					mixBlendMode: "darken",
	// 					pointerEvents: "none",
	// 				}}
	// 			/>
	// 		),
	// 	},
	// 	{
	// 		name: "Dosage",
	// 		selector: (row) => row?.dosage,
	// 		minWidth: "200px",

	// 	},
	// 	{
	// 		name: "Selling Price",
	// 		sortable: true,
	// 		selector: (row) => row?.selling_price,
	// 		minWidth: "200px",
	// 	},
	// 	{
	// 		name: "Total Item",
	// 		sortable: true,
	// 		selector: (row) => row?.total_stock,
	// 		minWidth: "200px",
	// 	},
	// 	{
	// 		name: "Expiry Date",
	// 		sortable: true,
	// 		cell: (row) => (
	// 			<span>
	// 				{`${new Date(row?.expiry_date).getDate()}/${
	// 					new Date(row?.expiry_date).getMonth() + 1
	// 				}/${new Date(row?.expiry_date).getFullYear()}`}
	// 			</span>
	// 		),
	// 		minWidth: "200px",
	// 	},

	// 	{
	// 		name: "Actions",
	// 		cell: (row) => (
	// 			<span className="d-flex">
	// 				{/* <Link
	//                         to="/products/edit-product"
	//                         onClick={() =>
	//                           handleProductIndex()
	//                         }
	//                         >
	//                         </Link> */}
	// 				<img src={edit} alt="" onClick={() => handleEdit(row)} />
	// 				<img
	// 					src={bin}
	// 					alt=""
	// 					className="mx-2"
	// 					style={{ cursor: "pointer" }}
	// 					onClick={() => handleDelete(row?._id)}
	// 				/>
	// 			</span>
	// 		),
	// 	},
	// ];

	// useEffect(() => {
	// 	console.log("Fetching", skip, limit);
	// }, [skip, limit]);

	useEffect(() => {
		console.table(data);
	}, [data]);

	const updateTotal = async () => {
		const products = await productsValue(facilityid).unwrap();
		dispatch(getProducts(products?.data));
		setTotal(products?.data);
	};

	// useEffect(()=>{
	// 	updateTotal()
	// },[])

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
	const searchDrugInPharmacy = async (searchText) => {
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

				return true
				//  fetchDrugs()
			}
		} catch (error) {
			toast.remove(load);
			toast.error("Drug Deletion Unsuccessful");
			console.log(error);
			return false
		}
	};

	return (
		<>
			<SkipTable
				isLoading={isLoading}
				data={data}
				total={total}
				filterData={filterData}
				fetchItemApi={fetchDrugs}
				deleteItemApi={handleDeleteDrug}
				setFilterData={setFilterData}
				searchItemApi={searchDrugInPharmacy}
				refreshTotal={updateTotal}
			/>
		</>
	);
};

export default ProductsTable;
