import React, { useState, useRef, useEffect } from "react";
/* This code defines a React functional component named `ValidationErrorMsg`. It takes an array
`missingObjects` as a parameter. */
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
import { useSearchDefaultProductMutation } from "../../../app/features/products/productsApiSlice";
import { handleNonDrugChange } from "../../../Functions/Pharmacy/Products/AddProduct";
import { ValidateObject } from "../../../Functions/Global/Validations";
import ValidationErrorMsg from "../../../components/Global/ValidationErrorMsg";
import Select from "react-select";

/**
 * The code is a React component for adding products in a pharmacy management system. It
 * includes form fields for adding both drug and non-drug products.
 */
const AddProducts = () => {
	const [drugOfficial, setDrugOfficial] = useState(true);
	const controllerRef = useRef();
	const [searchDefaultDrug] = useSearchDefaultProductMutation();
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
		nhis: "N/A",
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
		administration_instructions: "",
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
	const levels = [
		// A,M,B1,B2, C,D,SD,PD
		{
			label: "A",
			value: "A",
		},
		{
			label: "M",
			value: "M",
		},
		{
			label: "B1",
			value: "B1",
		},
		{
			label: "B2",
			value: "B2",
		},
		{
			label: "C",
			value: "C",
		},
		{
			label: "D",
			value: "D",
		},
		{
			label: "SD",
			value: "SD",
		},
		{
			label: "PD",
			value: "PD",
		},
	];
	const medicineGroup = [
		{ label: "Capsule", value: "Capsule" },
		{ label: "Cream", value: "Cream" },
		{ label: "Deconate Injection", value: "Deconate Injection" },
		{ label: "Drops", value: "Drops" },
		{ label: "Ear Drops", value: "Ear Drops" },
		{ label: "Eardrops", value: "Eardrops" },
		{ label: "Elixir", value: "Elixir" },
		{ label: "Eye Drops", value: "Eye Drops" },
		{ label: "Eye Ointment", value: "Eye Ointment" },
		{ label: "Gel", value: "Gel" },
		{ label: "Granular Powder", value: "Granular Powder" },
		{ label: "HCI Injection", value: "HCI Injection" },
		{ label: "Inhaler", value: "Inhaler" },
		{ label: "Infusion", value: "Infusion" },
		{ label: "Injection", value: "Injection" },
		{ label: "Liquid", value: "Liquid" },
		{ label: "Lotion", value: "Lotion" },
		{
			label: "MDI (Metered Dose Inhaler)",
			value: "MDI (Metered Dose Inhaler)",
		},
		{ label: "Mixture", value: "Mixture" },
		{ label: "Nasal Drops", value: "Nasal Drops" },
		{ label: "Ointment", value: "Ointment" },
		{ label: "Oral Suspension", value: "Oral Suspension" },
		{ label: "Pessary", value: "Pessary" },
		{ label: "Phosphate Injection", value: "Phosphate Injection" },
		{ label: "Powder", value: "Powder" },
		{ label: "Rectal Tubes", value: "Rectal Tubes" },
		{ label: "Shampoo", value: "Shampoo" },
		{ label: "Solution", value: "Solution" },
		{ label: "Sodium Injection", value: "Sodium Injection" },
		{ label: "Suppository", value: "Suppository" },
		{ label: "Suspension", value: "Suspension" },
		{ label: "Syrup", value: "Syrup" },
		{ label: "Tablet", value: "Tablet" },
		{ label: "Tablets", value: "Tablets" },
	];

	const dosageOptions = [
		{ label: "mL (Milliliter)", value: "mL (Milliliter)" },
		{ label: "mg (Milligram)", value: "mg (Milligram)" },
		{ label: "g (Gram)", value: "g (Gram)" },
	];

	const latestRequestId = useRef(0);

	const resetValues = () => {
		setDrugDetails((prev) => ({
			name: "",
			medicine_group: "",
			total_stock: 1,
			discount: "",
			nhis: "",
			expiry_date: "",
			manufacturer: "",
			selling_price: 0,
			price: 0,
			description: "",
			image: "",
			level: "",
			dosage: "",
			ndc: "",
			purpose: "",
			upc: "",
			unii: "",
			administration_instructions: "",
			active_ingredient: "",
		}));

		setNonDrugDetails((prev) => ({
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
		}));

		console.log("Hello");
	};
	const [missingObjects, setMissingObjects] = useState([]);

	useEffect(() => {
		resetValues();
	}, [drugOfficial]);
	/**
	 * The `loadOptions` function asynchronously fetches drug data based on the input value, handling
	 * request cancellation and updating the UI accordingly.
	 * @param inputValue - The `inputValue` parameter in the `loadOptions` function represents the value
	 * entered by the user in the input field. This value is used to search for drugs that match the input
	 * text.
	 * @returns The `loadOptions` function returns an array of objects with `label` and `value` properties
	 * after fetching data from an API and processing it. If the request is aborted or encounters an
	 * error, it may return an empty array.
	 */
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

			const res = await searchDefaultDrug(
				{ search_text: inputValue },
				{ signal }
			).unwrap();
			console.log("Default drug list", res?.data);

			// Check if this is the latest request since input changes frequestly
			if (requestId === latestRequestId.current) {
				const dataArray = res.data;
				const newArray = dataArray?.map((obj) => ({
					...obj,
					label: (
						<div className={" d-flex"}>
							{obj.name} - {obj.dosage} - {obj.medicine_group}
							<p
								style={{
									lineHeight: 0,
									fontSize: "11px",
									borderRadius: "4px",
									backgroundColor: `${
										obj.level === "A1" || obj.level === "B2"
											? "#FFD000"
											: "#4CAF50"
									}`,
								}}
								className={"mx-2 text-white "}>
								{obj.level === "A1" || obj.level === "B2" ? (
									<div style={{ height: 10 }} className="p-2">
										OTC
									</div>
								) : (
									<div style={{ height: 10 }} className="p-2">
										Prescription
									</div>
								)}
							</p>
						</div>
					),
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

	/**
	 * The handleChange function updates the drugDetails state based on the input field value or checkbox
	 * status.
	 * @param e - The parameter `e` in the `handleChange` function is an event object that represents the
	 * event being handled, such as a change event on an input element. It is commonly used in React
	 * applications to access information about the event, such as the target element that triggered the
	 * event and its properties like name
	 */
	const handleChange = (e) => {
		e.preventDefault();
		const { name, type, checked, value, files } = e.target;
		let newValue;

		if (type === "checkbox") {
			newValue = checked ? name.toUpperCase() : "N/A"; // Assuming you want "NHIS" when checked
		} else if (type === "file") {
			newValue = files[0];
		} else {
			newValue = value;
		}

		setDrugDetails({ ...drugDetails, [name]: newValue });
	};

	/**
	 * The function `handleMedicineNameChange` updates the drug details based on the selected medicine
	 * option.
	 * @param selectedOption - The `handleMedicineNameChange` function takes in a `selectedOption`
	 * parameter, which is an object containing information about a medicine. The function then sets the
	 * `DrugDetails` state with various properties extracted from the `selectedOption` object.
	 */
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

	/**
	 * The function `handleNewDrugBool` toggles the boolean value of `newProductBool`.
	 */
	const handleNewDrugBool = () => {
		setNewProductBool((prev) => !prev);
		setMissingObjects((prev) => []);
		setDrugDetails({
			name: "",
			medicine_group: "",
			total_stock: 1,
			discount: "",
			nhis: "N/A",
			expiry_date: "",
			manufacturer: "",
			selling_price: "",
			price: "",
			description: "",
			image: "",
			level: "",
			dosage: "",
			purpose: "",
			upc: "",
			unii: "",
			administration_instructions: "",
			active_ingredient: "",
		});
	};

	/**
	 * The function `addNonDrug` is an asynchronous function that handles form data submission for
	 * non-drug products.
	 * @param e - The `e` parameter in the `addNonDrug` function is an event object that represents the
	 * event that was triggered. In this case, it is used to prevent the default behavior of a form
	 * submission using `e.preventDefault()`. This is commonly done in form submission functions to
	 * prevent the page from
	 */
	const addNonDrug = async (e) => {
		e.preventDefault();
		const {
			product_name,
			description,
			product_category,
			manufacturer,
			ingredients,
			usage_instructions,
			storage_requirements,
			expiry_date,
			batch_number,
			regulatory_compliance,
			safety_information,
			side_effects,
			image,
			total_stock,
			discount,
			selling_price,
			price,
		} = nonDrugDetails;
		setMissingObjects((prev) => []);
		if (ValidateObject(nonDrugDetails, setMissingObjects)) return;
		setIsLoading(true);
		console.log("non drug clicked");
		const formData = new FormData();
		formData.append("store_id", facilityid); //
		formData.append("product_name", product_name);
		formData.append("description", description);
		formData.append("product_category", product_category);
		formData.append("manufacturer", manufacturer);
		formData.append("ingredients", ingredients);
		formData.append("usage_instructions", usage_instructions);
		formData.append("storage_requirements", storage_requirements);
		formData.append("expiry_date", expiry_date);
		formData.append("batch_number", batch_number);
		formData.append("regulatory_compliance", regulatory_compliance);
		formData.append("safety_information", safety_information);
		formData.append("side_effects", side_effects);
		formData.append("image", image);
		formData.append("total_stock", total_stock);
		formData.append("discount", discount);
		formData.append("selling_price", selling_price);
		formData.append("price", price);
		console.log(nonDrugDetails);

		try {
			// const res  = await addNonProduct({...nonDrugDetails}).unwrap()

			const res = await axios.post(
				"/pharmacy/non-drugs/add-new-product",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						"auth-token": token,
					},
				}
			);

			toast.promise(Promise.resolve(res), {
				loading: "Loading",
				success: (res) => res.data.message,
				error: (res) => res.data.error.message,
			});
			console.log(res);
			if (
				res?.data?.message === "New non-pharmaceutical product has been added"
			) {
				setTimeout(() => navigate("/pharmacy/products"), 1000);
			}
		} catch (error) {
			console.log(error);
			if (error?.response?.status === 400) {
				toast.error("An error occured retry");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const STATUSES = {
		approved: "Approved",
		pending: "Pending",
	};

	/**
	 * The function `addNewDrug` is an asynchronous function that handles the submission of new drug
	 * details to a pharmacy database with error handling and success message display.
	 * @param e - The `e` parameter in the `addNewDrug` function is an event object that is passed to the
	 * function when it is called. In this case, it is used to prevent the default behavior of a form
	 * submission using `e.preventDefault()`. This is a common practice in handling form submissions in
	 */
	const addNewDrug = async (e, status) => {
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
		const formData = new FormData();
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
		if (status === STATUSES.approved) {
			formData.append("image", image);
		} else {
			formData.append("picture", image);
		}
		formData.append("description", description);
		formData.append("level", level);
		formData.append("dosage", dosage);
		formData.append("product_ndc", ndc);
		formData.append("purpose", purpose);
		formData.append("upc", upc);
		formData.append("unii", unii);
		formData.append("administration_instructions", administration_instructions);
		formData.append("active_ingredient", active_ingredient);
		formData.append("approval_status", status);

		console.log(drugDetails);
		setMissingObjects((prev) => []);
		if (ValidateObject(drugDetails, setMissingObjects)) return;
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
				success: (res) => {
					// Assuming `res.data.status` and `res.data.message` are the correct fields based on your API structure.
					if (res.data.status === "success") {
						return status === STATUSES.approved
							? "Drug Added Successfully"
							: "Drug requested for approval";
					}
					return ""; // Return an empty string or any other default message for unhandled cases.
				},
				error: (res) => res.data.error.message,
			});
			console.log(res);
			if (res.data.status === "success") {
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
			if (
				error.response.data.error.message ===
				"could not add new drug. Error: drug already exists"
			) {
				toast.error("Drug already exists");
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
												{newProductBool ? (
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
												) : (
													<Select
														isSearchable={true}
														options={medicineGroup.map(({ label, value }) => ({
															label: label,
															value: value,
														}))}
														styles={{
															control: (baseStyles, state) => ({
																...baseStyles,
																borderColor: "#C1BBEB",
															}),
														}}
														onChange={(e) =>
															setDrugDetails({
																...drugDetails,
																medicine_group: e.value,
															})
														}
													/>
												)}
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

												<div>
													{newProductBool ? (
														<div className="drug-photo">
															{drugDetails?.image !== "" ? (
																<img
																	src={drugDetails?.image}
																	alt="Drug"
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
															)}
														</div>
													) : (
														<div className="drug-photo">
															{drugDetails?.image instanceof File ? ( // Check if drugDetails.image is a File
																<img
																	src={URL.createObjectURL(drugDetails?.image)}
																	alt="Drug"
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
																</>
															)}
															<input
																type="file"
																className="drug_file"
																accept="image/*"
																name="image"
																onChange={handleChange}
															/>
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

												{newProductBool ? (
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
												) : (
													<Select
														isSearchable={true}
														options={levels.map(({ label, value }) => ({
															label: label,
															value: value,
														}))}
														styles={{
															control: (baseStyles, state) => ({
																...baseStyles,
																borderColor: "#C1BBEB",
															}),
														}}
														onChange={(e) =>
															setDrugDetails({ ...drugDetails, level: e.value })
														}
													/>
												)}
											</FormGroup>

											<FormGroup>
												<Label className="small" htmlFor="dosage">
													<b>Dosage</b>
												</Label>
												{newProductBool ? (
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
												) : (
													<Select
														isSearchable={true}
														options={dosageOptions.map(({ label, value }) => ({
															label: label,
															value: value,
														}))}
														styles={{
															control: (baseStyles, state) => ({
																...baseStyles,
																borderColor: "#C1BBEB",
															}),
														}}
														onChange={(e) =>
															setDrugDetails({
																...drugDetails,
																dosage: e.value,
															})
														}
													/>
												)}
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
													htmlFor="administration_instructions">
													<b>Administration Instructions</b>
												</Label>
												<Input
													id="administration_instructions"
													name="administration_instructions"
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
													style={{ borderColor: "#C1BBEB", marginLeft: "20px" }}
													onChange={handleChange}
													checked={drugDetails.nhis === "NHIS"} // Ensure this condition matches how newValue is set in handleChange
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
													value={drugDetails.discount}
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
													placeholder=""
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
													placeholder=""
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
									{newProductBool ? (
										<button
											disabled={isLoading}
											type="submit"
											className="ms-bg text-white rounded-pill px-4 my-5 save py-2"
											onClick={(e) => addNewDrug(e, STATUSES.approved)}>
											{isLoading ? (
											<div>
												<span
													className="spinner-border spinner-border-sm mx-2"
													role="status">
													<span className="sr-only">Loading...</span>
												</span>
												<span>Adding...</span>
											</div>
										) : (
											<span>Add</span>
										)}
										</button>
									) : (
										//  Approval needed
										<button
											disabled={isLoading}
											type="submit"
											className="ms-bg text-white rounded-pill px-4 my-5 save py-2"
											onClick={(e) => addNewDrug(e, STATUSES.pending)}>
											{isLoading ? (
											<div>
												<span
													className="spinner-border spinner-border-sm mx-2"
													role="status">
													<span className="sr-only">Loading...</span>
												</span>
												<span>Requesting...</span>
											</div>
										) : (
											<span>Request Approval</span>
										)}
										</button>
									)}
								</div>
								<ValidationErrorMsg missingObjects={missingObjects} />
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
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
													// onChange={(e)=> handleNonDrugChange(e , setNonDrugDetails, nonDrugDetails)}
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
													type="textarea"
													placeholder=""
													maxLength={2000}
													max={200}
													height={500}
													style={{ borderColor: "#C1BBEB" }}
													defaultValue={nonDrugDetails.description}
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
																onChange={(e) =>
																	handleNonDrugChange(
																		e,
																		setNonDrugDetails,
																		nonDrugDetails
																	)
																}
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
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													defaultValue={nonDrugDetails.batch_number}
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													placeholder=""
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													min={0}
													value={nonDrugDetails.discount}
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													min={0}
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
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
													placeholder=""
													min={0}
													style={{ borderColor: "#C1BBEB" }}
													// readOnly={true}
													onChange={(e) =>
														handleNonDrugChange(
															e,
															setNonDrugDetails,
															nonDrugDetails
														)
													}
													value={nonDrugDetails.price}
												/>
											</FormGroup>
										</Form>
									</div>
								</div>
								<div className="d-flex justify-content-end align-items-end mt-5">
									<button
										onClick={addNonDrug}
										disabled={isLoading}
										type="button"
										className="ms-bg text-white rounded-pill px-4 my-5 save py-2">
										{isLoading ? (
											<div>
												<span
													className="spinner-border spinner-border-sm mx-2"
													role="status">
													<span className="sr-only">Loading...</span>
												</span>
												<span>Adding...</span>
											</div>
										) : (
											<span>Add</span>
										)}
									</button>
								</div>
								<ValidationErrorMsg missingObjects={missingObjects} />
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AddProducts;
