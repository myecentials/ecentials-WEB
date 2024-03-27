import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Form, FormGroup, Input, Label } from "reactstrap";
// import Select from "react-select";
import AsyncSelect from "react-select/async";
// import axiosCall from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import BreadCrumb from "../../../components/BreadCrumb";
// import SideBar from "../../../components/SideBar";
// import CustomeNav from "../../../components/CustomeNav";
import BreadOutlined from "../../../components/BreadOutlined";
import DateHeader from "../../../components/DateHeader";
// import Header from "../../../components/Header";
import PharmacyName from "../../../components/PharmacyName";
import axios from "../../../config/api/axios";
// import drug from "../../../static/drugs.json";
import { toast, Toaster } from "react-hot-toast";
import {
	facility_id,
	setToken,
} from "../../../app/features/authSlice/authSlice";
import { useFetchDefaultProductMutation } from "../../../app/features/products/productsApiSlice";

const AddProducts = () => {
	const [drugOfficial, setDrugOfficial] = useState(true);
	const controllerRef = useRef();
	const [fetchDefaultDrug] = useFetchDefaultProductMutation();
	const navigate = useNavigate();
	const facilityid = useSelector(facility_id);
	const token = useSelector(setToken);
	// const [categoryId] = useState([]);
	// const [error] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// const [errorMsg] = useState("");
	const [, setDrugs] = useState([]);
	const [newProductBool, setNewProductBool] = useState(true);
	const [drugDetails, setDrugDetails] = useState({
		name: "",
		medicine_group: "",
		total_stock: 1,
		discount: "",
		nhis: "",
		expiry_date: "",
		manufacturer: "",
		selling_price: "",
		price: "",
		description: "",
		image: "",
		level: "",
		dosage: "",
		ndc: "",
		purpose: "",
		upc: "",
		unii: "",
		adminstration_instructions: "",
		active_ingredient: "",
	});
	const [nonDrugDetails, setNonDrugDetails] = useState({
		product_name: "",
		description: "",
		product_category: "",
		manufacturer: "",
		ingredients: "",
		usage_instructions: "",
		storage_requirements: "",
		expiry_date: "",
		batch_number: "",
		regulatory_compliance: "",
		safety_information: "",
		side_effects: "",
		image: "",
		total_stock: 1,
		discount: "",
		selling_price: "",
		price: "",
	});

	const latestRequestId = useRef(0);

	// const levels = [
	// 	// A,M,B1,B2, C,D,SD,PD
	// 	{
	// 		label: "A",
	// 		value: "A",
	// 	},
	// 	{
	// 		label: "M",
	// 		value: "M",
	// 	},
	// 	{
	// 		label: "B1",
	// 		value: "B1",
	// 	},
	// 	{
	// 		label: "B2",
	// 		value: "B2",
	// 	},
	// 	{
	// 		label: "C",
	// 		value: "C",
	// 	},
	// 	{
	// 		label: "D",
	// 		value: "D",
	// 	},
	// 	{
	// 		label: "SD",
	// 		value: "SD",
	// 	},
	// 	{
	// 		label: "PD",
	// 		value: "PD",
	// 	},
	// ];

	

	// useEffect(() => {
	// 	const getFdaDrugs = async () => {
	// 		try {
	// 			const response = await axiosCall.get(
	// 				"https://api.fda.gov/drug/label.json?search=_exists_:openfda&limit=10"
	// 			);
	// 			setFdaDrugs(response?.data?.results);
	// 			setIsLoading(false);
	// 			// console.log(response);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	getFdaDrugs();
	// }, []);

	const loadOptions = async (inputValue) => {
		// Increment the request ID to make it unique for each request
		const requestId = latestRequestId.current + 1;
		latestRequestId.current = requestId;

		// Create a new AbortController
		const controller = new AbortController();
		controllerRef.current = controller;
		const signal = controller.signal;

		try {
			setIsLoading(true);

			const res = await fetchDefaultDrug(
				{ search_text: inputValue },
				{ signal }
			).unwrap();

			// Check if this is the latest request since input changes frequestly
			if (requestId === latestRequestId.current) {
				const dataArray = res.data;
				const newArray = dataArray?.map((obj) => ({
					...obj,
					label: ` ${obj.name} - ${obj.dosage} - ${obj.medicine_group}`,
					value: obj.name,
				}));
				console.log(requestId);
				console.log(latestRequestId.current);
				console.log(inputValue);
				setDrugs(newArray);
				return newArray;
			} else {
				// If not the latest request, return an empty array
				return [];
			}
		} catch (err) {
			if (err.name === "AbortError") {
				// Request was canceled, ignore
				console.log(err);
			} else {
				console.log(err);
				toast.error("Error fetching drugs, please retry");
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		return () => {
			// Cleanup: Cancel the request when the component unmounts
			if (controllerRef.current) {
				controllerRef.current.abort();
			}
		};
	}, []);

	// const categories = [];
	// for (let drugCat of drug) {
	// 	const { dosage_form } = drugCat;
	// 	if (!categories.includes(dosage_form)) {
	// 		categories.push(dosage_form);
	// 	}
	// }

	// for (let catId of categoryId) {
	// 	const { name } = catId;
	// 	if (!categories.includes(name)) {
	// 		categories.push(name);
	// 	}
	// }

	// const drugStrength = [];
	// for (let drugStr of drug) {
	// 	const { strength } = drugStr;
	// 	if (!drugStrength.includes(strength)) {
	// 		drugStrength.push(strength);
	// 	}
	// }

	const handleChange = (e) => {
		e.preventDefault();
		const name = e.target.name;
		const value =
			e.target.type === "checkbox"
				? (e.target.value = e.target.checked
						? e.target.name.toUpperCase()
						: "N/A")
				: e.target.type === "file"
				? e.target.files[0]
				: e.target.value;
		setDrugDetails({ ...drugDetails, [name]: value });
		// setTimeout(() => console.log(drugDetails), 5000);
	};
	const handleNonDrugChange = (e) => {
		e.preventDefault();
		const name = e.target.name;
		const value =
			e.target.type === "checkbox"
				? (e.target.value = e.target.checked
						? e.target.name.toUpperCase()
						: "N/A")
				: e.target.type === "file"
				? e.target.files[0]
				: e.target.value;
		setNonDrugDetails({ ...nonDrugDetails, [name]: value });
	};

	const handleMedicineNameChange = (selectedOption) => {
		console.log(selectedOption);
		setDrugDetails({
			name: selectedOption?.name,
			medicine_group: selectedOption?.medicine_group,
			total_stock: 1,
			discount: "",
			nhis: "N/A",
			expiry_date: "",
			manufacturer: selectedOption?.manufacturer,
			selling_price: "",
			price: "",
			description: selectedOption?.description,
			image: selectedOption?.image,
			level: selectedOption?.level,
			dosage: selectedOption?.dosage,
			ndc: selectedOption?.ndc,
			purpose: selectedOption?.purpose_of_drug,
			upc: selectedOption?.upc,
			unii: selectedOption?.unii,
			administration_instructions: selectedOption?.administration_instructions,
			active_ingredient: selectedOption?.active_ingredients,
		});
	};

	const handleNewDrugBool = () => {
		setNewProductBool((prev) => !prev);
	};
	const formData = new FormData();

	const addNewDrug = async (e) => {
		e.preventDefault();
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
		} = drugDetails;
	
		

		formData.append("store_id", facilityid); //
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
		formData.append("image", image);
		formData.append("level", level);
		formData.append("dosage", dosage);
		formData.append("product_ndc", ndc);
		formData.append("purpose", purpose);
		formData.append("upc", upc);
		formData.append("unii", unii);
		formData.append("adminstration_instructions", administration_instructions);
		formData.append("active_ingredient", active_ingredient);
		console.log(drugDetails);

		setIsLoading(true);

		try {
			const res = await axios.post("/pharmacy/drugs/add-new-drug", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"auth-token": token,
				},
			});

			toast.promise(Promise.resolve(res), {
				loading: "Loading",
				success: (res) => res.data.message,
				error: (res) => res.data.error.message,
			});
			console.log(res);
			if (res.data.message === "success") {
				setTimeout(
					() => navigate("/pharmacy/products"),

					1000
				);
			}
		} catch (error) {
			console.log(error);
			if (
				error.response.data.error.message ===
				"could not add new drug. Error: drug from manufacturer already exists"
			) {
				toast.error("Drug from manufacturer already exists");
			}
		} finally {
			setIsLoading(false);
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
						<h6 className="mt-2 text-deep">PRODUCTS</h6>
						<Toaster />
						<DateHeader />
						<div className="d-flex">
							<BreadOutlined name="Products" breadcrumb="/pharmacy/products" />
							<BreadCrumb
								name="Add Products"
								breadcrumb=""
								width="9rem"
								hasStyles={true}
							/>
						</div>
					</div>
					<PharmacyName />
				</div>
				<Toaster />

				<div className="text-deep mx-3 mt-4">
					Please add category, group, dosage, company name before adding
					medicine.
				</div>
				<div className="mx-md-3 mx-2">
					<div
						className="card border-0 pb-3 rounded"
						style={{ borderRadius: "10px" }}>
						<div className="ms-bg text-white py-4 d-flex justify-content-between align-items-center">
							<h6 className="mx-3">PRODUCT DETAILS</h6>

							<div className="d-flex justify-content-end ">
								<Link
									to="/pharmacy/products/barcode-scan"
									className="  mx-2 d-flex align-content-center">
									<button
										type="button"
										className="btn btn-light btn-sm py-md-3 "
										style={{ color: "#4D44B5" }}>
										{" "}
										Barcode
									</button>
								</Link>
								{/* <Link
									to="/pharmacy/products/mass-upload"
									className=" px-3 mx-1 d-flex align-content-center"
									style={{ color: "#4D44B5" }}>
									<button
										type="button"
										className="btn btn-light btn-sm py-md-3"
										style={{ color: "#4D44B5" }}>
										{" "}
										Mass Upload
									</button>
								</Link> */}
							</div>
						</div>
						{/** This toggles between  non drug or drug*/}
						<div className="mx-4 p-4">
							<Label className="small text-deep mr-2" htmlFor="drugOfficial1">
								<b>Drug</b>
							</Label>
							<Input
								id="drugOfficial1"
								type="radio"
								checked={drugOfficial}
								onClick={() => setDrugOfficial((prev) => true)}
								style={{
									borderColor: "#C1BBEB",
									marginRight: "4px",
									marginLeft: "4px",
								}}
							/>

							<Label className="small text-deep " htmlFor="drugOfficial2">
								<b>Non-Drug </b>
							</Label>
							<Input
								id="drugOfficial2"
								type="radio"
								checked={!drugOfficial}
								onClick={() => setDrugOfficial((prev) => false)}
								style={{
									borderColor: "#C1BBEB",
									marginRight: "4px",
									marginLeft: "4px",
								}}
							/>
						</div>

						{drugOfficial ? (
							<>
								<div className="mx-md-4 mt-3 text-deep">
									<div className="mx-3 my-4">
										<Form className="p-4 ">
											<FormGroup switch>
												<Label className="small" htmlFor="newDrugbool">
													<b>New Drug </b>
												</Label>
												<Input
													id="newDrugBool"
													type="switch"
													defaultChecked={!newProductBool}
													onClick={handleNewDrugBool}
													style={{ borderColor: "#C1BBEB" }}
												/>
											</FormGroup>

											{/* <FormGroup>
													<Label className="small" htmlFor="nhis">
														<b>New Drug </b>
													</Label>
													<Input
														id="nhis"
														name="nhis"
														type="checkbox"
														placeholder=""
														style={{ borderColor: "#C1BBEB", marginLeft: "2px" }}
														// readOnly={true}
														onChange={handleNewDrugBool}
														// value={drugDetails.nhis}
													/>
												</FormGroup> */}
											<FormGroup>
												<Label className="small" htmlFor="mname">
													<b>Medicine Name*</b>
												</Label>
												{newProductBool ? (
													<AsyncSelect
														styles={{
															control: (baseStyles, state) => ({
																...baseStyles,
																borderColor: "#C1BBEB",
															}),
														}}
														cacheOptions
														//  defaultOptions
														loadOptions={loadOptions}
														onChange={handleMedicineNameChange}
													/>
												) : (
													<FormGroup>
														<Input
															id="mname"
															name="name"
															type="text"
															onChange={handleChange}
															value={drugDetails.name}
															placeholder="medicine name"
															style={{ borderColor: "#C1BBEB" }}
														/>
													</FormGroup>
												)}
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
													readOnly={newProductBool}
													defaultValue={drugDetails.medicine_group}
													onChange={handleChange}
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
													readOnly={newProductBool}
													defaultValue={drugDetails.purpose}
													onChange={handleChange}
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
													readOnly={newProductBool}
													defaultValue={drugDetails.manufacturer}
													onChange={handleChange}
												/>
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="number">
													<b> Image:</b>
												</Label>

												<div className="drug-photo">
													{newProductBool ? (
														drugDetails?.image !== "" ? (
															<img
																src={drugDetails?.image}
																alt=""
																className="img-fluid h-100 w-100"
																style={{
																	aspectRatio: "3 / 2",
																	objectFit: "contain",
																	mixBlendMode: "darken",
																	pointerEvents: "none",
																}}
																readOnly={newProductBool}
															/>
														) : (
															<p className="small file_name">Drug image</p>
														)
													) : (
														<div className="drug-photo">
															{drugDetails.image instanceof File ? ( // Check if drugDetails.image is a File
																<img
																	src={URL.createObjectURL(drugDetails.image)}
																	alt=""
																	className="img-fluid h-100 w-100"
																	style={{
																		aspectRatio: "3 / 2",
																		objectFit: "contain",
																		mixBlendMode: "darken",
																		pointerEvents: "none",
																	}}
																/>
															) : (
																<>
																	<p className="small file_name">
																		Drag and drop or click here to select image
																	</p>
																	<input
																		type="file"
																		className="drug_file"
																		accept="image/*"
																		name="image"
																		onChange={handleChange}
																	/>
																</>
															)}
														</div>
													)}
												</div>
											</FormGroup>

											<FormGroup>
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
													placeholder="description"
													style={{ borderColor: "#C1BBEB" }}
													readOnly={newProductBool}
													defaultValue={drugDetails.description}
													onChange={handleChange}
												/>
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="level">
													<b>Level</b>
												</Label>
												<Input
													id="level"
													name="level"
													type="text"
													placeholder="level"
													style={{ borderColor: "#C1BBEB" }}
													readOnly={newProductBool}
													defaultValue={drugDetails.level}
													onChange={handleChange}
												/>
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="dosage">
													<b>Dosage</b>
												</Label>
												<Input
													id="dosage"
													name="dosage"
													type="text"
													placeholder="dosage"
													style={{ borderColor: "#C1BBEB" }}
													readOnly={newProductBool}
													defaultValue={drugDetails.dosage}
													onChange={handleChange}
												/>
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="product_ndc">
													<b>Product NDC</b>
												</Label>
												<Input
													id="ndc"
													name="ndc"
													type="text"
													placeholder="product ndc"
													style={{ borderColor: "#C1BBEB" }}
													readOnly={newProductBool}
													defaultValue={drugDetails.ndc}
													onChange={handleChange}
												/>
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="upc">
													<b>UPC</b>
												</Label>
												<Input
													id="upc"
													name="upc"
													type="text"
													placeholder="upc"
													style={{ borderColor: "#C1BBEB" }}
													readOnly={newProductBool}
													defaultValue={drugDetails.upc}
													onChange={handleChange}
												/>
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="unii">
													<b>UNII</b>
												</Label>
												<Input
													id="unii"
													name="unii"
													type="text"
													placeholder="unii"
													style={{ borderColor: "#C1BBEB" }}
													readOnly={newProductBool}
													defaultValue={drugDetails.unii}
													onChange={handleChange}
												/>
											</FormGroup>

											<FormGroup>
												<Label
													className="small"
													htmlFor="adminstration_instructions">
													<b>Administration Instructions</b>
												</Label>
												<Input
													id="adminstration_instructions"
													name="adminstration_instructions"
													type="text"
													placeholder=""
													style={{ borderColor: "#C1BBEB" }}
													readOnly={newProductBool}
													defaultValue={drugDetails.administration_instructions}
													onChange={handleChange}
												/>
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="active_ingredient">
													<b>Active Ingredient</b>
												</Label>
												<Input
													id="active_ingredient"
													name="active_ingredient"
													type="text"
													placeholder=""
													style={{ borderColor: "#C1BBEB" }}
													readOnly={newProductBool}
													defaultValue={drugDetails.active_ingredient}
													onChange={handleChange}
												/>
											</FormGroup>

											{/**  User inputs needed here */}

											<FormGroup>
												<Label className="small" htmlFor="nhis">
													<b>Accept NHIS* </b>
												</Label>
												<Input
													id="nhis"
													name="nhis"
													type="checkbox"
													// placeholder=""
													style={{ borderColor: "#C1BBEB", marginLeft: "20px" }}
													// readOnly={true}
													onChange={handleChange}
													value={drugDetails.nhis}
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
													placeholder="1"
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													min={1}
													onChange={handleChange}
													value={drugDetails.total_stock}
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
													placeholder="0"
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													min={0}
													value={drugDetails.discount || "0"}
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
													placeholder="Date"
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													value={drugDetails.expiry_date}
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
													placeholder="0"
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													onChange={handleChange}
													value={drugDetails.selling_price}
												/>
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="price">
													<b>Purchase Price*</b>
												</Label>
												<Input
													id="price"
													name="price"
													type="number"
													placeholder="0"
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													min={0}
													onChange={handleChange}
													value={drugDetails.price}
												/>
											</FormGroup>
										</Form>
									</div>
								</div>
								<div className="d-flex justify-content-end align-items-end mt-5">
									<button
										disabled={isLoading}
										type="submit"
										className="ms-bg text-white rounded-pill px-4 my-5 save py-2"
										onClick={addNewDrug}>
										{isLoading ? (
											<span className="spinner-border" role="status">
												<span className="sr-only">Loading...</span>
											</span>
										) : (
											"Submit"
										)}
									</button>
								</div>
							</>
						) : (
							<>
								{/**  Non drug form */}
								<div className="mx-md-4  text-deep">
									<div className="mx-3 my-4">
										<Form className="p-4 ">
											<FormGroup>
												<Label className="small" htmlFor="productName">
													<b>Product Name</b>
												</Label>

												<Input
													id="productName"
													name="product_name"
													type="text"
													defaultValue={nonDrugDetails?.product_name}
													onChange={handleNonDrugChange}
													placeholder="Eg. Pepsodent"
													style={{ borderColor: "#C1BBEB" }}
												/>
											</FormGroup>
											<FormGroup>
												<Label className="small" htmlFor="description">
													<b>Description </b>
												</Label>
												<Input
													id="description"
													name="description"
													type="text"
													placeholder=""
													style={{ borderColor: "#C1BBEB" }}
													defaultValue={nonDrugDetails.description}
													onChange={handleNonDrugChange}
												/>
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="productCategory">
													<b>Product Category </b>
												</Label>
												<Input
													id="productCategory"
													name="product_category"
													type="text"
													placeholder=""
													style={{ borderColor: "#C1BBEB" }}
													defaultValue={nonDrugDetails.product_category}
													onChange={handleNonDrugChange}
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
													defaultValue={nonDrugDetails.manufacturer}
													onChange={handleNonDrugChange}
												/>
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="number">
													<b> Image:</b>
												</Label>

												<div className="drug-photo">
													{nonDrugDetails.image instanceof File ? ( // Check if drugDetails.image is a File
														<img
															src={URL.createObjectURL(nonDrugDetails.image)}
															alt="item"
															className="img-fluid h-100 w-100"
															style={{
																aspectRatio: "3 / 2",
																objectFit: "contain",
																mixBlendMode: "darken",
																pointerEvents: "none",
															}}
														/>
													) : (
														<>
															<p className="small file_name">
																Drag and drop or click here to select image
															</p>
															<input
																type="file"
																className="drug_file"
																accept="image/*"
																name="image"
																onChange={handleNonDrugChange}
															/>
														</>
													)}
												</div>
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="ingredients">
													<b> Ingredients</b>
												</Label>
												<Input
													id="ingredients"
													name="ingredients"
													type="text"
													placeholder=""
													style={{ borderColor: "#C1BBEB" }}
													defaultValue={nonDrugDetails.ingredients}
													onChange={handleNonDrugChange}
												/>
											</FormGroup>
											<FormGroup>
												<Label className="small" htmlFor="active_ingredient">
													<b>Safety Information</b>
												</Label>
												<Input
													id="active_ingredient"
													name="safety_information"
													type="text"
													placeholder=""
													style={{ borderColor: "#C1BBEB" }}
													defaultValue={nonDrugDetails.safety_information}
													onChange={handleNonDrugChange}
												/>
											</FormGroup>
											<FormGroup>
												<Label className="small" htmlFor="batchNumber">
													<b>Batch Number</b>
												</Label>
												<Input
													id="batchNumber"
													name="batch_number"
													type="text"
													placeholder=""
													style={{ borderColor: "#C1BBEB" }}
													defaultValue={nonDrugDetails.active_ingredient}
													onChange={handleNonDrugChange}
												/>
											</FormGroup>
											<FormGroup>
												<Label className="small" htmlFor="sideEffects">
													<b>Side Effects</b>
												</Label>
												<Input
													id="sideEffects"
													name="side_effects"
													type="text"
													placeholder=""
													style={{ borderColor: "#C1BBEB" }}
													defaultValue={nonDrugDetails.side_effects}
													onChange={handleNonDrugChange}
												/>
											</FormGroup>
											<FormGroup>
												<Label className="small" htmlFor="usageInstructions">
													<b>Usage Instructions</b>
												</Label>
												<Input
													id="usageInstructions"
													name="usage_instructions"
													type="text"
													placeholder=""
													style={{ borderColor: "#C1BBEB" }}
													defaultValue={nonDrugDetails.usage_instructions}
													onChange={handleNonDrugChange}
												/>
											</FormGroup>
											<FormGroup>
												<Label className="small" htmlFor="storageRequirements">
													<b>Storage Requirments</b>
												</Label>
												<Input
													id="storageRequirementsects"
													name="storage_requirements"
													type="text"
													placeholder=""
													style={{ borderColor: "#C1BBEB" }}
													defaultValue={nonDrugDetails.storage_requirements}
													onChange={handleNonDrugChange}
												/>
											</FormGroup>
											<FormGroup>
												<Label className="small" htmlFor="regulatoryCompliance">
													<b>Regulatory Compliance</b>
												</Label>
												<Input
													id="regulatoryCompliance"
													name="regulatory_compliance"
													type="text"
													placeholder=""
													style={{ borderColor: "#C1BBEB" }}
													defaultValue={nonDrugDetails.regulatory_compliance}
													onChange={handleNonDrugChange}
												/>
											</FormGroup>

											{/**  User inputs is a must here */}

											<FormGroup>
												<Label className="small" htmlFor="total_stock">
													<b>Total Stock *</b>
												</Label>
												<Input
													id="total_stock"
													name="total_stock"
													type="number"
													placeholder="1"
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													min={1}
													onChange={handleNonDrugChange}
													value={nonDrugDetails.total_stock}
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
													placeholder="0"
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													min={0}
													value={nonDrugDetails.discount || "0"}
													onChange={handleNonDrugChange}
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
													placeholder="Date"
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													value={nonDrugDetails.expiry_date}
													onChange={handleNonDrugChange}
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
													placeholder="0"
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													onChange={handleNonDrugChange}
													value={nonDrugDetails.selling_price}
												/>
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="price">
													<b>Purchase Price*</b>
												</Label>
												<Input
													id="price"
													name="price"
													type="number"
													placeholder="0"
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													min={0}
													onChange={handleNonDrugChange}
													value={nonDrugDetails.price}
												/>
											</FormGroup>
										</Form>
									</div>
								</div>
								<div className="d-flex justify-content-end align-items-end mt-5">
									<button
										onClick={() => {
											console.table(nonDrugDetails);
										}}
										disabled={isLoading}
										type="submit"
										className="ms-bg text-white rounded-pill px-4 my-5 save py-2">
										{isLoading ? (
											<span className="spinner-border" role="status">
												<span className="sr-only">Loading...</span>
											</span>
										) : (
											"Add"
										)}
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AddProducts;
