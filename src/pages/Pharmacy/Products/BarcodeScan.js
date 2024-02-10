import BarcodeReader from "react-barcode-reader";
import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Form, FormGroup, Input, Label } from "reactstrap";
// import Select from "react-select";
// import axiosCall from "axios";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

import BreadCrumb from "../../../components/BreadCrumb";
// import SideBar from "../../../components/SideBar";
// import CustomeNav from "../../../components/CustomeNav";
import BreadOutlined from "../../../components/BreadOutlined";
import DateHeader from "../../../components/DateHeader";
// import Header from "../../../components/Header";
import PharmacyName from "../../../components/PharmacyName";
// import axios from "../../../config/api/axios";
// import drug from "../../../static/drugs.json";
// import dustbin from "../../../assets/icons/svg/dustbin.svg";
import { useFetchDefaultProductWithBarcodeMutation } from "../../../app/features/products/productsApiSlice";
import { toast, Toaster } from "react-hot-toast";
import {
	facility_id,
	setToken,
} from "../../../app/features/authSlice/authSlice";
import { useSelector } from "react-redux";
import axios from "../../../config/api/axios";

const BarcodeScan = () => {
	const facilityid = useSelector(facility_id);
	const token = useSelector(setToken);
	const [drugExists, setDrugExists] = useState(false);
	const [getDrugWithUpc] = useFetchDefaultProductWithBarcodeMutation();
	const [productsSelected, setProductsSelected] = useState({
		active_ingredients: "",
		administration_instructions: "",
		description: "",
		discount: 0,
		dosage: "",
		expiry_date: "",
		image: "",
		level: "",
		manufacturer: "",
		medicine_group: "",
		name: "",
		ndc: "",
		nhis: "",
		otc: "",
		purpose_of_drug: "",
		price: "",
		selling_price: "",
		total_stock: "",
		unii: "",
		upc: "",
	});
	const {
		name,
		medicine_group,
		total_stock,
		discount,
		nhis,
		expiry_date,
		manufacturer,
		selling_price,
		price,
		description,
		image,
		level,
		dosage,
		ndc,
		purpose,
		upc,
		unii,
		administration_instructions,
		active_ingredient,
	} = productsSelected;

	/**
	 * Handles the scanned data by updating the selected products state with the UPC.
	 * @param {string} data - The scanned UPC data.
	 */
	const handleScan = (data) => {
		setProductsSelected((prev) => ({ ...prev, upc: data }));
	};

	/** 
	 *  This is just for testing purposes !!! , comment out in production 
	 * useEffect hook to simulate a scan after 5 seconds of component mount.
	 * Sets the UPC in the selected products state to a default value.
	 */
	// useEffect(() => {
	// 	// Set UPC to a default value after 5 seconds
	// 	setTimeout(
	// 		() => setProductsSelected((prev) => ({ ...prev, upc: "6ZNC6MLRWNGE" })),
	// 		5000
	// 	);
	// }, []);

	/**
	 * Fetches drug data using the provided UPC and updates the state with the retrieved data.
	 */
	const fetchData = useCallback(async () => {
		// Display loading toast while searching for the drug
		const remove = toast.loading("Searching drug ...");

		// Reset selected products state to default values
		setProductsSelected((prev) => ({
			...prev,
			active_ingredients: "",
			administration_instructions: "",
			description: "",
			discount: 0,
			dosage: "",
			expiry_date: "",
			image: "",
			level: "",
			manufacturer: "",
			medicine_group: "",
			name: "",
			ndc: "",
			nhis: "",
			otc: "",
			purpose_of_drug: "",
			price: "",
			selling_price: "",
			total_stock: "",
			unii: "",
		}));

		try {
			// Fetch drug data using the provided UPC
			const newData = await getDrugWithUpc(upc).unwrap();
			console.log(newData);

			// Check if the drug is retrieved successfully
			if (newData?.message === "drug retrieved successfully") {
				// Check if drug data is available
				if (newData?.data.length === 0) {
					toast.error("Drug not in inventory");
					setDrugExists(false);
				} else {
					// Update selected products state with retrieved data
					toast.success("Drug retrieved successfully");
					setDrugExists(true);
					setProductsSelected((prev) => ({
						...prev,
						active_ingredients: newData?.data[0]?.active_ingredients || "",
						administration_instructions:
							newData?.data[0]?.administration_instructions || "",
						description: newData?.data[0]?.description || "",
						discount: newData?.data[0]?.discount || 0,
						dosage: newData?.data[0]?.dosage || "",
						expiry_date:
							new Date(newData?.data[0]?.expiry_date)
								.toISOString()
								.split("T")[0] || "",
						image: newData?.data[0]?.image || "",
						level: newData?.data[0]?.level || "",
						manufacturer: newData?.data[0]?.manufacturer || "",
						medicine_group: newData?.data[0]?.medicine_group || "",
						name: newData?.data[0]?.name || "",
						ndc: newData?.data[0]?.ndc || "",
						nhis: newData?.data[0]?.nhis || "",
						otc: newData?.data[0]?.otc || "",
						purpose_of_drug: newData?.data[0]?.purpose_of_drug || "",
						price: newData?.data[0]?.price || "",
						selling_price: newData?.data[0]?.selling_price || "",
						unii: newData?.data[0]?.unii || "",
						upc: newData?.data[0]?.upc || "",
					}));
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			// Dismiss the loading toast
			toast.dismiss(remove);
		}
	}, [getDrugWithUpc, upc]);

	const handleError = (err) => {
		console.error(err);
	};

	const handleChange = (e) => {
		console.log(e.target.checked);
		const { name, type, value } = e.target;

		if (type === "checkbox") {
			e.target.checked
				? setProductsSelected((prev) => ({
						...prev,
						nhis: "NHIS",
				  }))
				: setProductsSelected((prev) => ({
						...prev,
						nhis: "N/A",
				  }));
		} else {
			setProductsSelected((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	useEffect(() => {
		if (productsSelected.upc === "") {
		} else {
			fetchData();
		}
	}, [fetchData, productsSelected.upc]);

	const formData = new FormData();

	/**
	 * Verifies if required fields are filled.
	 * Displays an error message using toast if any required field is empty.
	 * @returns {boolean} Returns true if all required fields are filled, otherwise false.
	 */
	const verifyRequiredFields = () => {
		// Check if the total_stock field is empty
		if (total_stock === "") {
			toast.error("Please fill the total stock field");
			return false;
		}

		// Check if the discount field is empty
		if (discount === "") {
			toast.error("Please fill the discount field");
			return false;
		}

		// Check if the expiry_date field is empty
		if (expiry_date === "") {
			toast.error("Please fill the expiry date field");
			return false;
		}

		// Check if the selling_price field is empty
		if (selling_price === "") {
			toast.error("Please fill the selling price field");
			return false;
		}

		// Check if the price field is empty
		if (price === "") {
			toast.error("Please fill the price field");
			return false;
		}

		// All required fields are filled
		return true;
	};

	/**
	 * Adds a new drug to the pharmacy database.
	 * @param {Event} e - The event object representing the form submission.
	 * @returns {Promise<void>} A promise that resolves when the drug addition process is complete.
	 */
	const addNewDrug = async (e) => {
		// Display loading toast while adding the drug
		const load = toast.loading("Adding drug ...");

		// Verify if all required fields are filled
		const proceed = verifyRequiredFields();
		if (!proceed) {
			toast.remove(load);
			return;
		}

		e.preventDefault();

		// Append form data for the new drug
		formData.append("store_id", facilityid);
		formData.append("name", name);
		formData.append("medicine_group", medicine_group);
		formData.append("total_stock", total_stock);
		formData.append("discount", discount);
		formData.append("nhis", nhis);
		formData.append("expiry_date", expiry_date);
		formData.append("manufacturer", manufacturer);
		formData.append("selling_price", selling_price);
		formData.append("price", price);
		formData.append("description", description);
		formData.append("picture", image);
		formData.append("level", level);
		formData.append("dosage", dosage);
		formData.append("product_ndc", ndc);
		formData.append("purpose", purpose);
		formData.append("upc", upc);
		formData.append("unii", unii);
		formData.append("adminstration_instructions", administration_instructions);
		formData.append("active_ingredient", active_ingredient);

		try {
			// Send a POST request to add the new drug
			const res = await axios.post("/pharmacy/drugs/add-new-drug", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"auth-token": token,
				},
			});

			// Display success or error toast based on the response
			toast.promise(Promise.resolve(res), {
				success: (res) => res.data.message,
				error: (res) => res.data.error.message,
			});

			console.log(res);

			// Check if the addition was successful
			if (res.data.message === "success") {
				// Additional logic can be added here if needed
			}

			toast.remove(load);
		} catch (error) {
			toast.remove(load);
			console.log(error);

			// Display specific error message if drug from manufacturer already exists
			if (
				error.response.data.error.message ===
				"could not add new drug. Error: drug from manufacturer already exists"
			) {
				toast.error("Drug from manufacturer already exists");
			}
		} finally {
			// Additional logic can be added here if needed
		}
	};

	return (
		<>
			<Helmet>
				<title>Add Products</title>
			</Helmet>
			<div className="col-md-9 middle">
				<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
					<div>
						<h6 className="mt-2 text-deep">BARCODE SCAN</h6>
						<Toaster />
						<DateHeader />
						<div className="d-flex">
							<BreadOutlined name="Products" breadcrumb="/pharmacy/products" />
							<BreadCrumb
								name="Scan Code"
								breadcrumb="/pharmacy/products/barcode-scan"
								width="9rem"
								hasStyles={true}
							/>
						</div>
					</div>
					<PharmacyName />
				</div>
				<Toaster />

				<BarcodeReader onError={handleError} onScan={handleScan} />

				<div className=" bg-white mx-md-5 text-deep mb-4 mt-4">
					<div className="ms-bg text-white p-4 d-flex justify-content-between align-items-center">
						<h3>Add Drug</h3>
					</div>
					<Form className="p-4">
						<FormGroup>
							<Label className="my-1 mx-2" htmlFor="barcode">
								<b>Barcode:</b>
							</Label>
							<Input
								id="upc"
								name="upc"
								type="input"
								value={productsSelected.upc}
								style={{ borderColor: "#C1BBEB", height: "30px" }}
								readOnly={true}
							/>
						</FormGroup>
						<FormGroup>
							<Label className="small" htmlFor="name">
								<b>Name:</b>
							</Label>
							<Input
								id="name"
								name="name"
								type="text"
								placeholder=""
								style={{ borderColor: "#C1BBEB" }}
								readOnly={true}
								value={productsSelected.name}
							/>
						</FormGroup>

						<FormGroup>
							<Label className="small" htmlFor="medicine_group">
								<b>Medicine Group :</b>
							</Label>
							<Input
								id="medicine_group"
								name="medicine_group"
								type="text"
								placeholder=""
								style={{ borderColor: "#C1BBEB" }}
								readOnly={true}
								value={productsSelected.medicine_group}
							/>
						</FormGroup>
						<FormGroup>
							<Label className="small" htmlFor="purpose">
								<b>Purpose</b>
							</Label>
							<Input
								id="purpose"
								name="purpose"
								type="text"
								placeholder=""
								style={{ borderColor: "#C1BBEB" }}
								readOnly={true}
								value={productsSelected.purpose_of_drug}
							/>
						</FormGroup>
						<FormGroup>
							<Label className="small" htmlFor="manufacturer">
								<b>Manufacturer</b>
							</Label>
							<Input
								id="manufacturer"
								name="manufacturer"
								type="text"
								placeholder=""
								style={{ borderColor: "#C1BBEB" }}
								readOnly={true}
								value={productsSelected.manufacturer}
							/>
						</FormGroup>

						<FormGroup>
							<Label className="small" htmlFor="number">
								<b> Image:</b>
							</Label>
							<div className="drug-photo">
								{productsSelected.image ? (
									<img
										src={productsSelected.image}
										alt=""
										className="img-fluid h-100 w-100"
										style={{
											aspectRatio: "3 / 2",
											objectFit: "contain",
											mixBlendMode: "darken",
											pointerEvents: "none",
										}}
										readOnly={true}
									/>
								) : (
									<p className="small file_name">Drug Image</p>
								)}
								{/* <input
									type="file"
									className="drug_file"
									accept="image/*"
									name="picture"
                  readOnly={true}
									// value={drugDetails.picture}
								/> */}
							</div>
						</FormGroup>
						<FormGroup>
							<Label className="small" htmlFor="nhis">
								<b>Accept NHIS* </b>
							</Label>
							<Input
								id="nhis"
								name="nhis"
								type="checkbox"
								placeholder=""
								checked={productsSelected.nhis === "NHIS"}
								style={{ borderColor: "#C1BBEB", marginLeft: "20px" }}
								// readOnly={true}
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label className="small" htmlFor="total_stock">
								<b>Total Stock *</b>
							</Label>
							<Input
								id="total_stock"
								name="total_stock"
								type="number"
								placeholder=""
								style={{ borderColor: "#C1BBEB" }}
								// readOnly={true}
								min={1}
								value={productsSelected.total_stock}
								onChange={handleChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label className="small" htmlFor="discount">
								<b>Discount*</b>
							</Label>
							<Input
								id="discount"
								name="discount"
								type="number"
								placeholder=""
								style={{ borderColor: "#C1BBEB" }}
								// readOnly={true}
								min={0}
								value={productsSelected.discount}
								onChange={handleChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label className="small" htmlFor="expiry_date">
								<b>Expiry Date *</b>
							</Label>
							<Input
								id="expiry_date"
								name="expiry_date"
								type="date"
								placeholder=""
								style={{ borderColor: "#C1BBEB" }}
								// readOnly={true}
								value={productsSelected.expiry_date}
								onChange={handleChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label className="small" htmlFor="selling_price">
								<b>Selling Price*</b>
							</Label>
							<Input
								id="selling_price"
								name="selling_price"
								type="number"
								placeholder=""
								style={{ borderColor: "#C1BBEB" }}
								// readOnly={true}
								value={productsSelected.selling_price}
								onChange={handleChange}
							/>
						</FormGroup>

						<FormGroup>
							<Label className="small" htmlFor="price">
								<b>Price*</b>
							</Label>
							<Input
								id="price"
								name="price"
								type="number"
								placeholder=""
								style={{ borderColor: "#C1BBEB" }}
								// readOnly={true}
								min={0}
								onChange={handleChange}
								value={productsSelected.price}
							/>
						</FormGroup>

						{/* <FormGroup>
								<Label className="small" htmlFor="description">
									<b>Medicine Description</b>
								</Label>
								<Input
									maxLength={2000}
									max={200}
									height={500}
									id="description"
									name="description"
									type="textarea"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

						{/* <FormGroup>
								<Label className="small" htmlFor="level">
									<b>Level</b>
								</Label>
								<Input
									id="level"
									name="level"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

						{/* <FormGroup>
								<Label className="small" htmlFor="dosage">
									<b>Dosage</b>
								</Label>
								<Input
									id="dosage"
									name="dosage"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

						{/* <FormGroup>
								<Label className="small" htmlFor="product_ndc">
									<b>Product NDC</b>
								</Label>
								<Input
									id="product_ndc"
									name="product_ndc"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

						{/* <FormGroup>
								<Label className="small" htmlFor="upc">
									<b>UPC</b>
								</Label>
								<Input
									id="upc"
									name="upc"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

						{/* <FormGroup>
								<Label className="small" htmlFor="unii">
									<b>UNII</b>
								</Label>
								<Input
									id="unii"
									name="unii"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

						{/* <FormGroup>
								<Label className="small" htmlFor="adminstration_instructions">
									<b>Administration Instructions</b>
								</Label>
								<Input
									id="adminstration_instructions"
									name="adminstration_instructions"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

						{/* <FormGroup>
								<Label className="small" htmlFor="active_ingredient">
									<b>Active Ingredient</b>
								</Label>
								<Input
									id="active_ingredient"
									name="active_ingredient"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}
					</Form>

					<button
						className="btn btn-primary px-3 mx-3"
						onClick={addNewDrug}
						disabled={!drugExists}
						style={{ color: "#FFFFFF" }}>
						Add Drug
					</button>
				</div>
			</div>
		</>
	);
};

export default BarcodeScan;
