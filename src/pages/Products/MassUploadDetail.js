import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Form, FormGroup, Input, Label } from "reactstrap";
import Select from "react-select";
import axiosCall from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import BreadCrumb from "../../components/BreadCrumb";
import SideBar from "../../components/SideBar";
import CustomeNav from "../../components/CustomeNav";
import BreadOutlined from "../../components/BreadOutlined";
import DateHeader from "../../components/DateHeader";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";
import axios from "../../config/api/axios";
import drug from "../../static/drugs.json";
import { toast, Toaster } from "react-hot-toast";
import { facility_id, setToken } from "../../app/features/authSlice/authSlice";

const drugStrength = [];
for (let drugStr of drug) {
	const { strength } = drugStr;
	if (!drugStrength.includes(strength)) {
		drugStrength.push(strength);
	}
}

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

const QuantityAmountInputScreen = () => {
	const [data, setData] = useState([]);
	const [csvData, setCsvData] = useState(null);
	const token = useSelector(setToken);
	const facilityId = useSelector(facility_id);
	const formData = new FormData();
	const [details, setDetails] = useState({
		file: null,
		facilityId,
	});

	const handle = () => {
		if (data.length === 0) {
			console.error("No data available for download.");
			return;
		}

		const headers = Object.keys(data[0]).toString();
		const main = data.map((item) => Object.values(item).toString());
		const csv = [headers, ...main].join("\n");
		setCsvData(csv);
		// startCSVDownload();
	};

	// const startCSVUpload = () => {
	// 	if (!csvData) {
	// 		console.error("No CSV data available for download.");
	// 		return;
	// 	}

	// 	const blob = new Blob([csvData], { type: "application/csv" });
	// 	const url = URL.createObjectURL(blob);
	// 	const a = document.createElement("a");
	// 	a.download = "data.csv";
	// 	a.href = url;
	// 	a.style.display = "none";
	// 	document.body.appendChild(a);
	// 	a.click();
	// 	a.remove();
	// 	URL.revokeObjectURL(url);
	// };

	const handleInputChange = (index, propertyName, value) => {
		setData((prevData) => {
			const newData = [...prevData];
			if (propertyName === "picture") {
				const file = value[0];
				newData[index][propertyName] = file;
			} else if (value && value.type === "checkbox") {
				newData[index][propertyName] = value.checked
					? value.name.toUpperCase()
					: "N/A";
			} else {
				newData[index][propertyName] = value;
			}
			return newData;
		});
	};


	useEffect(() => {
	handle()
	console.log(data);
	}, [data]);



	useEffect(() => {
		const storedData =
			JSON.parse(sessionStorage.getItem("massDrugDetails")) || [];
		setData(storedData);
	}, []);

	// const handleChange = (e) => {
	// 	const name = e.target.name;
	// 	const value =
	// 		e.target.type === "file"
	// 			? e.target.files[0]
	// 			: e.target.type === "checkbox"
	// 			? details.privileges.push(e.target.name)
	// 			: e.target.value;
	// 	setDetails({
	// 		...details,
	// 		[name]: value,
	// 	});
	// };

	const uploadFile = async () => {
		if (!csvData) {
			console.error("No CSV data available for upload.");
			return;
		}
		// formData.append("file", details.file);
		formData.append("store_id", facilityId);
		formData.append("file", new Blob([csvData], { type: "application/csv" }), "productData.csv");


		try {
			const res = axios.post(
				"/pharmacy/drugs/upload-drugs-from-file",
				formData,
				{
					headers: {
						"auth-token": token,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			toast.promise((res), {
				loading: "Uploading",
				success: (res) => res.data.message,
				error: "An error occurred",
			});
		} catch (error) {
			console.error(error);
		}

	};

	return (
		<>
			<Helmet>
				<title>Add Products</title>
			</Helmet>
			<Header />
			<CustomeNav />
			<div className="d-md-flex">
				<div className="col-md-3 d-none d-md-block bg-white left">
					<SideBar />
				</div>
				<div className="col-md-9 middle">
					<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
						<div>
							<h6 className="mt-2 text-deep">PRODUCTS</h6>
							<Toaster />
							<DateHeader />
							<div className="d-flex">
								<BreadOutlined name="Products" breadcrumb="/products" />
								<BreadCrumb
									name="Upload File"
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
						Please add fields for all drugs before exporting
					</div>
					<div>
						{data?.map((drug, index) => (
							<div key={index} className="m-2 shadow py-4 px-3 ">
								<b className="text-success">{`Drug: ${drug.name}`}</b>
								<Form className="row g-3">
									{/* First Column */}
									<div className="col-md-6 col-lg-3">
										<FormGroup>
											<Label className="small" htmlFor="fname">
												<b>Level Of Prescription*</b>
											</Label>
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
													handleInputChange(index, "level", e.value)
												}
											/>
										</FormGroup>
										<FormGroup>
											<Label className="small" htmlFor="expiry_date">
												<b>Expiry Date*</b>
											</Label>
											<Input
												id="expiry_date"
												name="expiry_date"
												type="date"
												value={drug.expiry_date}
												style={{ borderColor: "#C1BBEB" }}
												onChange={(e) =>
													handleInputChange(
														index,
														"expiry_date",
														e.target.value
													)
												}
											/>
										</FormGroup>
									</div>

									{/* Second Column */}
									<div className="col-md-6 col-lg-3">
										<FormGroup>
											<Label className="small" htmlFor="price">
												<b>Purchase Price per Piece (GHS) *</b>
											</Label>
											<Input
												id="price"
												name="price"
												type="text"
												value={drug?.price}
												placeholder="200"
												style={{ borderColor: "#C1BBEB" }}
												onChange={(e) =>
													handleInputChange(index, "price", e.target.value)
												}
											/>
										</FormGroup>
										<FormGroup>
											<Label className="small" htmlFor="fname">
												<b>Dosage*</b>
											</Label>
											<Select
												isSearchable={true}
												options={drugStrength.sort().map((item) => ({
													value: item,
													label: item,
												}))}
												styles={{
													control: (baseStyles, state) => ({
														...baseStyles,
														borderColor: "#C1BBEB",
													}),
												}}
												onChange={(e) =>
													handleInputChange(index, "dosage", e.value)
												}
											/>
										</FormGroup>
									</div>

									{/* Third Column */}
									<div className="col-md-6 col-lg-3">
										<FormGroup>
											<Label className="small" htmlFor="selling_price">
												<b>Selling Price per Piece (GHS) *</b>
											</Label>
											<Input
												id="selling_price"
												name="selling_price"
												type="text"
												placeholder="250"
												value={drug.selling_price}
												style={{ borderColor: "#C1BBEB" }}
												onChange={(e) =>
													handleInputChange(
														index,
														"selling_price",
														e.target.value
													)
												}
											/>
										</FormGroup>
										<FormGroup>
											<Label className="small" htmlFor="total_stock">
												<b>Quantity *</b>
											</Label>
											<Input
												id="total_stock"
												name="total_stock"
												type="number"
												value={drug.total_stock}
												style={{ borderColor: "#C1BBEB" }}
												min={1}
												onChange={(e) =>
													handleInputChange(
														index,
														"total_stock",
														e.target.value
													)
												}
											/>
										</FormGroup>
									</div>

									{/* Fourth Column */}
									<div className="col-md-6 col-lg-3">
										<FormGroup>
											<Input
												id="number"
												name="nhis"
												type="checkbox"
												value={drug.nhis}
												style={{ borderColor: "#C1BBEB" }}
												onChange={(e) =>
													handleInputChange(index, "nhis", e.target)
												}
											/>
											<Label className="small mx-2" htmlFor="number">
												<b>Accept NHIS*</b>
											</Label>
										</FormGroup>

										<FormGroup>
											<Label className="small" htmlFor="number">
												<b>Photo*</b>
											</Label>
											<div className="drug-photo">
												{drug.picture ? (
													<img
														src={URL.createObjectURL(drug.picture)}
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
													<p className="small file_name">
														Drag and drop or click here to select an image
													</p>
												)}
												<input
													type="file"
													className="drug_file"
													accept="image/*"
													name="picture"
													onChange={(e) =>
														handleInputChange(index, "picture", e.target.files)
													}
												/>
											</div>
										</FormGroup>
									</div>
								</Form>
							</div>
						))}
						{/* <button className="btn btn-primary px-3 mx-3 my-5" onClick={handle}>
							Export CSV
						</button> */}

						<div className="d-flex my-4">
							{/* <Input
								style={{ borderColor: "#C1BBEB" }}
								type="file"
								className="form-control w-50"
								onChange={handleChange}
								accept=".csv"
								name="file"
							/> */}
							<button
								className="btn btn-success px-3 mx-3 "
								onClick={uploadFile}>
								Upload 
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const MassUploadDetail = () => {
	return (
		<div>
			<QuantityAmountInputScreen />
		</div>
	);
};

export default MassUploadDetail;
