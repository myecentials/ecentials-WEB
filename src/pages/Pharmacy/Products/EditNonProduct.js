import React, { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import { Helmet } from "react-helmet";
import {
	Form,
	// FormFeedback,
	FormGroup,
	Input,
	Label,
	// Toast,
	// ToastBody,
	// ToastHeader,
} from "reactstrap";
import BreadOutlined from "../../../components/BreadOutlined";
// import Header from "../../../components/Header";
import { useEffect } from "react";
import axios from "../../../config/api/axios";
import { useNavigate } from "react-router-dom";
import PharmacyName from "../../../components/PharmacyName";
// import { select } from "d3";
import toast, { Toaster } from "react-hot-toast";
// import useAuth from "../../../hooks/useAuth";
// import Select from "react-select";
import DateHeader from "../../../components/DateHeader";
import {
	// facility_id,
	setToken,
} from "../../../app/features/authSlice/authSlice";
import { useSelector } from "react-redux";

const EditNonProduct = () => {
	const token = useSelector(setToken);
	// const facilityId = useSelector(facility_id);

	const [drugDetails, setDrugDetails] = useState([]);
	// const [categoryId] = useState([]);
	// const [, setData] = useState([]);
	// const [, setMyData] = useState([]);
	const [error] = useState(false);
	const [isLoading] = useState(false);
	const [errorMsg] = useState("");

	useEffect(() => {
		const productInfo = sessionStorage.getItem("nonProductSelected");
		const newProduct = JSON.parse(productInfo);
		setDrugDetails(newProduct);
	}, []);

	// Check if expiry_date is a valid date
	const isValidDate =
		drugDetails.expiry_date &&
		!isNaN(new Date(drugDetails.expiry_date).getTime());

	// If it's a valid date, format it; otherwise, use an empty string
	const formattedExpiryDate = isValidDate
		? new Date(drugDetails.expiry_date).toISOString().split("T")[0]
		: "";

	const handleChange = (e) => {
		console.log(e.target.value);
		console.log(e.target.name);
		const name = e.target.name;
		const value =
			e.target.type === "checkbox"
				? e.target.checked
					? "NHIS"
					: "N/A"
				: e.target.type === "file"
				? e.target.files[0]
				: e.target.value;

		setDrugDetails((prev) => ({ ...prev, [name]: value }));
	};

	const navigate = useNavigate();

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
		_id,
	} = drugDetails;
	const formData = new FormData();

	const handleClick = async () => {
		formData.append("product_id", _id);
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
		const load = toast.loading("Updating Product...");
		try {
			const myPromise = await axios.post(
				"/pharmacy/non-drugs/update-drug-information",
				formData,
				{
					headers: {
						"auth-token": token,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			if (myPromise?.data?.message === "success") {
				toast.remove(load);
				toast.success("Product Updated Successfully");
				setTimeout(() => {
					navigate("/pharmacy/products");
				}, 1500);
			}
		} catch (err) {
			toast.remove(load);
			toast.error("An error occured");
			console.log(err);
		}

		for (const [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}
		console.log(drugDetails);
	};

	return (
		<>
			<Helmet>
				<title>Edit Non-Pharmaceutical Products | Ecentials</title>
			</Helmet>

			<Toaster />

			<div className="col-md-9 middle">
				<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
					<div>
						<h6 className="mt-2 text-deep">PRODUCTS</h6>
						<DateHeader />
						<div className="d-flex">
							<BreadOutlined name="Products" breadcrumb="/pharmacy/products" />
							<BreadCrumb
								name="Edit Products"
								breadcrumb=""
								width="9rem"
								hasStyles={true}
							/>
						</div>
					</div>
					<PharmacyName />
				</div>

				<div className="text-deep mx-3 mt-4"></div>
				<div className="mx-md-3 mx-2">
					<div
						className="card border-0 pb-3 rounded"
						style={{ borderRadius: "10px" }}>
						<div className="ms-bg text-white py-2">
							<h6 className="mx-3">PRODUCT DETAILS</h6>
						</div>
						<div className="mx-md-4 my-5 text-deep">
							<div className="mx-3">
								<Form>
									{error ? <p className="error">{errorMsg}</p> : ""}

									<FormGroup>
										<Label className="small" htmlFor="name">
											<b>Product Name</b>
										</Label>
										<Input
											id="name"
											name="name"
											type="text"
											onChange={handleChange}
											defaultValue={drugDetails?.product_name}
											placeholder="Tablet"
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
											onChange={handleChange}
											defaultValue={drugDetails?.description}
											placeholder="Tablet"
											style={{ borderColor: "#C1BBEB" }}
										
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
											onChange={handleChange}
											defaultValue={drugDetails.product_category}
											placeholder=""
											style={{ borderColor: "#C1BBEB" }}
										
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
											onChange={handleChange}
											defaultValue={drugDetails.manufacturer}
											placeholder="Tablet"
											style={{ borderColor: "#C1BBEB" }}
											
										/>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="ingredients">
											<b> Ingredients</b>
										</Label>
										<Input
											id="ingredients"
											name="ingredients"
											type="text"
											onChange={handleChange}
											defaultValue={drugDetails?.ingredients}
											style={{ borderColor: "#C1BBEB" }}
										
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
											onChange={handleChange}
											defaultValue={drugDetails?.safety_information}
											style={{ borderColor: "#C1BBEB" }}
											
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
											onChange={handleChange}
											defaultValue={drugDetails?.batch_number}
											style={{ borderColor: "#C1BBEB" }}
											
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
											onChange={handleChange}
											defaultValue={drugDetails?.usage_instructions}
											style={{ borderColor: "#C1BBEB" }}
											
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
											onChange={handleChange}
											defaultValue={drugDetails?.storage_requirements}
											style={{ borderColor: "#C1BBEB" }}
											
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
											onChange={handleChange}
											defaultValue={drugDetails?.regulatory_compliance}
											style={{ borderColor: "#C1BBEB" }}
											
										/>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="description">
											<b> Description*</b>
										</Label>
										<Input
											maxLength={2000}
											max={200}
											height={500}
											id="description"
											name="description"
											type="textarea"
											defaultValue={drugDetails?.description}
											placeholder=""
											onChange={handleChange}
											style={{ borderColor: "#C1BBEB" }}
											
										/>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="number">
											<b>Photo*</b>
										</Label>
										<div className="drug-photo">
											{drugDetails?.image ? (
												<img
													src={drugDetails.image}
													alt=""
													className="img-fluid h-100 w-100"
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
												// value={drugDetails?.image}
												onChange={handleChange}
											/>
										</div>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="expiry_date">
											<b>Expiry Date</b>
										</Label>
										<Input
											id="expiry_date"
											name="expiry_date"
											type="date"
											// defaultValue={drugDetails.expiry_date}
											defaultValue={formattedExpiryDate}
											onChange={handleChange}
											style={{ borderColor: "#C1BBEB" }}
										/>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="price">
											<b>Purchase Price </b>
										</Label>
										<Input
											id="price"
											name="price"
											type="number"
											onChange={handleChange}
											defaultValue={drugDetails?.price}
											placeholder="200"
											style={{ borderColor: "#C1BBEB" }}
										/>
									</FormGroup>
									<FormGroup>
										<Label className="small" htmlFor="price">
											<b>Discount </b>
										</Label>
										<Input
											id="price"
											name="price"
											type="number"
											onChange={handleChange}
											defaultValue={drugDetails?.discount}
											placeholder="200"
											style={{ borderColor: "#C1BBEB" }}
										/>
									</FormGroup>
									<FormGroup>
										<Label className="small" htmlFor="selling_price">
											<b>Selling Price *</b>
										</Label>
										<Input
											id="selling_price"
											name="selling_price"
											type="number"
											placeholder="250"
											onChange={handleChange}
											defaultValue={drugDetails?.selling_price}
											style={{ borderColor: "#C1BBEB" }}
										/>
									</FormGroup>
									<FormGroup>
										<Label className="small" htmlFor="total_stock">
											<b>Quantity </b>
										</Label>
										<Input
											id="total_stock"
											name="total_stock"
											type="number"
											onChange={handleChange}
											defaultValue={drugDetails?.total_stock}
											style={{ borderColor: "#C1BBEB" }}
											min={1}
										/>
									</FormGroup>
								</Form>
							</div>
						</div>
						<div className="d-flex justify-content-end align-items-end mt-5">
							<button
								type="submit"
								className="ms-bg text-white rounded-pill px-4 mb-5 save py-2"
								onClick={handleClick}>
								{isLoading ? (
									<span className="spinner-border" role="status">
										<span className="sr-only">Loading...</span>
									</span>
								) : (
									"Submit"
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditNonProduct;
