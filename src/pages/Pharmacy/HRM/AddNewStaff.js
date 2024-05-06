import React, { useEffect } from "react";
import DateHeader from "../../../components/DateHeader";
import { Helmet } from "react-helmet";
// import CustomeNav from "../../../components/CustomeNav";
// import SideBar from "../../../components/SideBar";
import BreadOutlined from "../../../components/BreadOutlined";
import BreadCrumb from "../../../components/BreadCrumb";
import { Form, Input, Label, FormGroup, Col, Row, Spinner } from "reactstrap";
// import Header from "../../../components/Header";
import { useState } from "react";
// import useAuth from "../../../hooks/useAuth";
import axios from "../../../config/api/axios";
import { useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";
import PharmacyName from "../../../components/PharmacyName";
import { toast, Toaster } from "react-hot-toast";
import schools from "../../../static/schools.json";
import Select from "react-select";
// import HospitalSidebar from "../../../components/HospitalComponents/HospitalSidebar";
import { useSelector } from "react-redux";
import {
	facility_id,
	setToken,
} from "../../../app/features/authSlice/authSlice";
import { PRIVILEDGESWLABELS } from "../../../static/priviledges";

const AddNewStaff = () => {
	const random = faker.internet.password();
	const facilityid = useSelector(facility_id);
	const token = useSelector(setToken);

	//
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	// const [fileName1, setFileName1] = useState(null);
	// const [fileName2, setFileName2] = useState(null);
	const navigate = useNavigate();
	const [details, setDetails] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone_number: "",
		address: "",
		degree: "",
		place_of_birth: "",
		date_of_birth: "",
		ghana_card_number: "",
		pay_grade: "",
		mode_of_payment: "",
		department: "",
		start_date: "",
		// end_date: "",
		city: "",
		username: "",
		// employee_id: "",
		password: "",
		supervisor: "",
		university: "",
		facility_type: "pharmacy",
		facility_id: facilityid,
		photo: null,
		cv: null,
		staff_type: "pharmacy staff",
		certificate: null,
		privileges: ["dashboard"],
	});
	const handleChange = (e) => {
		const { name, type, checked, files } = e.target;

		if (type === "file") {
			// Handle file inputs
			setDetails({ ...details, [name]: files[0] });
		} else if (type === "checkbox") {
			// Handle checkbox, toggle addition or removal based on checked state
			let updatedPrivileges;
			if (checked) {
				// Add the privilege if the checkbox is checked and not already in the array
				updatedPrivileges = [...details.privileges, name];
			} else {
				// Remove the privilege if the checkbox is unchecked
				updatedPrivileges = details.privileges.filter(
					(privilege) => privilege !== name
				);
			}
			setDetails({ ...details, privileges: updatedPrivileges });
		} else {
			// Handle all other input types
			setDetails({ ...details, [name]: e.target.value });
		}
	};

	useEffect(() => {
		console.log(details);
	}, [details]);

	const mode_of_payment = [
		{
			label: "Momo",
			value: "momo",
		},
		{
			label: "Bank",
			value: "bank",
		},
	];
	const supervisor = [
		{
			label: "Andrews Opoku",
			value: "6345e345ccb58ac54e7a5843",
		},
		{
			label: "Jesse Anim",
			value: "6345e345ccb58ac54e7a5845",
		},
	];
	const department = [
		{
			label: " POS",
			value: "pos",
		},
		{
			label: "Health",
			value: "health",
		},
		{
			label: "Nurse",
			value: "nurse",
		},
	];
	const pay_grade = [
		{
			label: "GH₵ 2000-3000",
			value: "grade1",
		},
		{
			label: "GH₵ 4000-6000",
			value: "grade2",
		},
	];

	// const validateDetails = (details) => {
	//   setError(false)
	//   setErrorMsg(``)
	//   for (const [key, value] of Object.entries(details)) {
	//     if (value === null || value === "") {
	//       setError(true)
	//       setErrorMsg(`${key} cannot be empty`)
	//       throw new Error(`${key} cannot be empty`);
	//     }
	//   }
	// };

	const beautifyFieldName = (fieldName) => {
		// Convert snake_case to Title Case
		return fieldName
			.replace(/_/g, " ")
			.replace(
				/\w\S*/g,
				(word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
			);
	};

	const validateDetails = (details) => {
		setError(false);
		setErrorMsg(``);
		for (const [key, value] of Object.entries(details)) {
			if (value === null || value === "" || value === "undefined") {
				const beautifiedFieldName = beautifyFieldName(key);
				setError(true);
				setErrorMsg(
					`${beautifiedFieldName} cannot be empty, please fill that field`
				);

				// throw new Error(`${beautifiedFieldName} cannot be empty, please fill that field`);
				return false; // Validation failed, return false
			}
		}
		// // Check if cv is not provided or not of type 'file'
		// if (!details.cv || details.cv.type !== 'File') {

		//   setError(true);
		//   setErrorMsg('CV is required as a file, please upload the file');
		//   return false; // Validation failed, return false
		// }

		// // Check if certificate is not provided or not of type 'file'
		// if (!details.certificate || details.certificate.type !== 'File') {
		//   setError(true);
		//   setErrorMsg('Certificate is required as a file, please upload the file');
		//   return false; // Validation failed, return false
		// }

		return true; // Validation passed
	};

	// const handleCheck = (e) => {
	//   details.privileges.push(e.target.name);
	// };
	const formData = new FormData();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const load = toast.loading("Adding...");

		try {
			setIsLoading(true);
			// Validate details before proceeding
			const isValid = validateDetails(details);

			if (!isValid) {
				// Validation failed, do not proceed with form submission
				setIsLoading(false);
				return;
			}
			formData.append("first_name", details.first_name); //
			formData.append("last_name", details.last_name); //
			formData.append("email", details.email); //
			formData.append("phone_number", details.phone_number); //
			formData.append("address", details.address); //
			formData.append("photo", details.photo); //
			formData.append("place_of_birth", details.place_of_birth); //
			formData.append("date_of_birth", details.date_of_birth); //
			formData.append("ghana_card_number", details.ghana_card_number); //
			formData.append("pay_grade", details.pay_grade); //
			formData.append("mode_of_payment", details.mode_of_payment); //
			formData.append("department", details.department); //
			formData.append("start_date", details.start_date); //
			formData.append("end_date", details.end_date); //
			formData.append("supervisor", details.supervisor);
			formData.append("city", details.city); //
			formData.append("username", details.username); //
			formData.append("password", details.password); //
			formData.append("degree", details.degree); //
			formData.append("university", details.university); //
			formData.append("facility_type", details.facility_type); //
			formData.append("facility_id", details.facility_id); //
			formData.append("cv", details.cv); //
			formData.append("certificate", details.certificate); //
			formData.append("staff_type", details.staff_type); //
			for (let i = 0; i < details.privileges.length; i++) {
				formData.append("privileges[]", details.privileges[i]);
			}

			// for (const entry of formData.entries()) {
			//   const [key, value] = entry;
			//   console.log(` ${key}: ${value}`);
			// }
			// const load = toast.loading("Adding staff...")

			const myPromise = await axios.post(
				"/pharmacy/staff/add-new-staff",
				formData,
				{
					headers: {
						"auth-token": token,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			// if(myPromise.message === 'success'){
			//   toast.dismiss(load)
			//   setIsLoading(false);
			//   toast.success("Staff Added ")
			//   setTimeout(() => {
			//     navigate('/pharmacy/hrm/staff')
			//   }, 1500);
			// }
			toast.promise(Promise.resolve(myPromise), {
				// loading: "Loading...",
				success: (res) => res.data.message,
				error: (err) => console.log(err),
			});

			setIsLoading(false);
			toast.remove(load);
			console.log(myPromise);
			setTimeout(() => {
				if (myPromise.data.message === "success")
					navigate("/pharmacy/hrm/staff");
			}, 1500);
		} catch (error) {
			toast.remove(load);

			toast.error(error);
			console.error("Error submitting form:", error);
			setIsLoading(false); // Set loading state to false
			// setError(true); // Set error state to true
			// setErrorMsg("An error occurred. Please try again.");
		} finally {
			toast.remove(load);
		}
	};

	useEffect(() => {
		const staffRan = faker.finance.pin(3);
		if (details.first_name === "" || details.last_name === "") {
		} else {
			const busId = details.first_name
				.toUpperCase()
				.substring(0, 1)
				.concat(details.last_name)
				.toString()
				.concat(staffRan.toString());

			setDetails((prevDetails) => ({
				...prevDetails,
				username: busId,
			}));
		}
	}, [details.first_name, details.last_name]);

	// const PRIVILEDGES = [
	//   {
	//     label: "HRM",
	//     value: "hrms",
	//   },
	//   {
	//     label: "Customers",
	//     value: "customers",
	//   },
	//   {
	//     label: "Sales/Payment",
	//     value: "sales",
	//   },
	//   {
	//     label: "Products",
	//     value: "products",
	//   },
	//   // {
	//   // 	label: "Delivery",
	//   // 	value: "delivery",
	//   // },
	//   {
	//     label: "Manufacturer",
	//     value: "manufacturers",
	//   },
	//   {
	//     label: "Return",
	//     value: "returns",
	//   },
	//   {
	//     label: "Orders",
	//     value: "orders",
	//   },
	//   {
	//     label: "Reports",
	//     value: "reports",
	//   },
	//   {
	//     label: "Invoice",
	//     value: "invoices",
	//   },
	// ];

	return (
		<>
			<Helmet>
				<title>Add New Staff</title>
			</Helmet>

			<div className="col-md-9 middle  edit-relative pb-5">
				<Toaster />
				<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
					<div>
						<h6 className="mt-2 text-deep">HRM</h6>
						<DateHeader />
						<div className="d-flex flex-wrap">
							<BreadOutlined name="HRM" breadcrumb="/pharmacy/hrm/staff" />
							<BreadOutlined name="Staff" breadcrumb="/pharmacy/hrm/staff" />
							<BreadCrumb
								name="Add Staff"
								breadcrumb="/pharmacy/hrm/staff/name/edit"
								hasStyles={true}
							/>
						</div>
					</div>
					<PharmacyName />
				</div>

				<div className="mt-4 mx-auto mx-md-5">
					<Toaster />
					{/* PERSONAL */}
					<div
						className="card border-0 pb-3 my-5 rounded"
						style={{ borderRadius: "10px" }}>
						<div className="ms-bg text-white py-2">
							<h6 className="mx-4">PERSONAL DETAILS</h6>
						</div>
						<div className="mx-4 mt-3 text-deep">
							<Form autoComplete="on">
								{/* {error ? <p className="error">{errorMsg}</p> : ""} */}
								<Row>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="fname">
												<b className="text-deep">First name*</b>
											</Label>
											<Input
												id="firstName"
												name="first_name"
												type="text"
												placeholder="Andrews"
												style={{ borderColor: "#C1BBEB" }}
												value={details.first_name}
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="lname">
												<b className="text-deep">Last name*</b>
											</Label>
											<Input
												id="lastName"
												name="last_name"
												type="text"
												placeholder="Opoku"
												style={{ borderColor: "#C1BBEB" }}
												value={details.last_name}
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="fname">
												<b className="text-deep">Email*</b>
											</Label>
											<Input
												id="email"
												name="email"
												type="email"
												placeholder="example@gmail.com"
												style={{ borderColor: "#C1BBEB" }}
												value={details.email}
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="number">
												<b className="text-deep">Phone number*</b>
											</Label>
											<Input
												id="number"
												name="phone_number"
												type="text"
												placeholder="0000000000"
												style={{ borderColor: "#C1BBEB" }}
												value={details.phone_number}
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="address">
												<b className="text-deep">Address*</b>
											</Label>
											<Input
												id="address"
												name="address"
												type="textarea"
												placeholder="PLT 16 BLK III, Tafo-Kumasi"
												style={{ height: "9rem", borderColor: "#C1BBEB" }}
												value={details.address}
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="about">
												<b className="text-deep">Photo*</b>
											</Label>
											<div className="drug-photo" style={{ cursor: "pointer" }}>
												{details.photo ? (
													<img
														src={URL.createObjectURL(details.photo)}
														alt=""
														className="w-100 h-100"
														style={{
															aspectRatio: "3 / 2",
															objectFit: "cover",
															// mixBlendMode: "darken",
															pointerEvents: "none",
														}}
													/>
												) : (
													<p className="small file_name">
														Drag and drop or click here to select image
													</p>
												)}
												<input
													type="file"
													className="drug_file"
													accept="image/*"
													name="photo"
													onChange={handleChange}
												/>
											</div>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="place">
												<b className="text-deep">Place of birth*</b>
											</Label>
											<Input
												id="place"
												name="place_of_birth"
												type="address"
												placeholder="Tafo Government Hospital"
												style={{ borderColor: "#C1BBEB" }}
												value={details.place_of_birth}
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="date">
												<b className="text-deep">Date of birth*</b>
											</Label>
											<Input
												id="date"
												name="date_of_birth"
												type="date"
												style={{ borderColor: "#C1BBEB" }}
												value={details.date_of_birth}
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="place">
												<b className="text-deep">Ghana Card Number*</b>
											</Label>
											<Input
												style={{ borderColor: "#C1BBEB" }}
												id="place"
												name="ghana_card_number"
												type="text"
												placeholder="GHA-0123456789"
												value={details.ghana_card_number}
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
								</Row>
							</Form>
						</div>
					</div>

					{/* WORK */}
					<div
						className="card border-0 pb-3 my-5 rounded"
						style={{ borderRadius: "10px" }}>
						<div className="ms-bg text-white py-2">
							<h6 className="mx-4">WORK DETAILS</h6>
						</div>
						<div className="mx-4 mt-3 text-deep">
							<Form>
								<Row>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="fname">
												<b className="text-deep">Department*</b>
											</Label>

											<Select
												isSearchable={true}
												options={department.sort().map(({ label, value }) => ({
													value,
													label,
												}))}
												styles={{
													control: (baseStyles, state) => ({
														...baseStyles,
														borderColor: "#C1BBEB",
													}),
												}}
												onChange={(e) =>
													setDetails({ ...details, department: e.value })
												}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="lname">
												<b className="text-deep">Supervisor*</b>
											</Label>
											<Select
												isSearchable={true}
												options={supervisor.sort().map(({ label, value }) => ({
													value,
													label,
												}))}
												styles={{
													control: (baseStyles, state) => ({
														...baseStyles,
														borderColor: "#C1BBEB",
													}),
												}}
												onChange={(e) =>
													setDetails({ ...details, supervisor: e.value })
												}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<Col>
											<FormGroup>
												<Label className="small" htmlFor="pay_grade">
													<b className="text-deep">Pay Grade*</b>
												</Label>

												<Select
													isSearchable={true}
													options={pay_grade.sort().map(({ label, value }) => ({
														value,
														label,
													}))}
													styles={{
														control: (baseStyles, state) => ({
															...baseStyles,
															borderColor: "#C1BBEB",
														}),
													}}
													onChange={(e) =>
														setDetails({ ...details, pay_grade: e.value })
													}
												/>
											</FormGroup>
										</Col>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="number">
												<b className="text-deep">Mode of Payment*</b>
											</Label>
											<Select
												isSearchable={true}
												options={mode_of_payment
													.sort()
													.map(({ label, value }) => ({
														value,
														label,
													}))}
												styles={{
													control: (baseStyles, state) => ({
														...baseStyles,
														borderColor: "#C1BBEB",
													}),
												}}
												onChange={(e) =>
													setDetails({ ...details, mode_of_payment: e.value })
												}
											/>
										</FormGroup>
									</Col>
								</Row>
							</Form>
						</div>
					</div>
					{/* Education */}
					<div
						className="card border-0 pb-3 my-5 rounded pb-3 mb-5"
						style={{ borderRadius: "10px" }}>
						<div className="ms-bg text-white py-2">
							<h6 className="mx-4">EDUCATION</h6>
						</div>
						<div className="mx-4 mt-3 text-deep">
							<Form>
								<Row>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="fname">
												<b className="text-deep">University*</b>
											</Label>

											<Select
												isSearchable={true}
												options={schools.sort().map(({ name }) => ({
													value: name,
													label: name,
												}))}
												styles={{
													control: (baseStyles, state) => ({
														...baseStyles,
														borderColor: "#C1BBEB",
													}),
												}}
												onChange={(e) =>
													setDetails({ ...details, university: e.value })
												}
											/>
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="lname">
												<b className="text-deep">Degree*</b>
											</Label>
											<Input
												id="lastName"
												name="degree"
												type="text"
												placeholder="Bsc. Computer Science"
												style={{ borderColor: "#C1BBEB" }}
												value={details.degree}
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<Row>
											<Col>
												<FormGroup>
													<Label className="small" htmlFor="fname">
														<b className="text-deep">Start Date*</b>
													</Label>
													<Input
														id="email"
														name="start_date"
														type="date"
														placeholder="2017"
														style={{ borderColor: "#C1BBEB" }}
														value={details.start_date}
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
											<Col>
												<FormGroup>
													<Label className="small" htmlFor="fname">
														<b className="text-deep">End Date*</b>
													</Label>
													<Input
														id="date"
														name="end_date"
														type="date"
														placeholder="2021"
														style={{ borderColor: "#C1BBEB" }}
														value={details.end_date}
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
										</Row>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="number">
												<b className="text-deep">City*</b>
											</Label>
											<Input
												id="number"
												name="city"
												type="text"
												placeholder="Kumasi, Ghana"
												style={{ borderColor: "#C1BBEB" }}
												value={details.city}
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
								</Row>
							</Form>

							{/* Documents */}
							<h6 className="small">Documents</h6>
							<p className="gray-text small">Curriculum vitae</p>
							<div className=" mb-3">
								<Input
									style={{ borderColor: "#C1BBEB" }}
									type="file"
									className="form-control"
									onChange={handleChange}
									accept=".pdf,.docx,.doc"
									name="cv"
								/>
							</div>
							<p className="gray-text small">Degree Certificcate</p>
							<div className="">
								<Input
									style={{ borderColor: "#C1BBEB" }}
									type="file"
									className="form-control"
									title="select a file"
									name="certificate"
									accept=".pdf,.docx,.doc"
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div
						className="card border-0 pb-3 my-5 rounded"
						style={{ borderRadius: "10px" }}>
						<div className="ms-bg text-white py-2">
							<h6 className="mx-4">PRIVILEDGES</h6>
						</div>
						<div className="mx-4 mt-3 text-deep">
							<h6>Select priviledges for this staff?</h6>
							<div className="grid">
								{PRIVILEDGESWLABELS?.map(({ label, value }, index) => (
									<div key={index} className="form-check mx-3">
										<input
											disabled={details.terminated}
											className="form-check-input admin"
											type="checkbox"
											id={value}
											name={value}
											onChange={handleChange}
											checked={
												details.privileges && details.privileges.includes(value)
											}
										/>
										<label
											className="form-check-label text-deep small"
											htmlFor={value}>
											{label}
										</label>
									</div>
								))}
							</div>
						</div>
					</div>

					<div
						className="card border-0 pb-3 my-5 rounded pb-3 mb-5 "
						style={{ borderRadius: "10px" }}>
						<div className="ms-bg text-white py-2">
							<h6 className="mx-4">LOGIN CREDENTIALS</h6>
						</div>
						<div className="mx-4 mt-3 text-deep">
							<Form>
								<Row>
									<Col md={4}>
										<FormGroup>
											<Label className="small" htmlFor="username">
												<b className="text-deep">Business ID</b>
											</Label>
											<Input
												id="username"
												name="username"
												type="text"
												placeholder="AN123456"
												style={{ borderColor: "#C1BBEB" }}
												value={details.username}
												onChange={handleChange}
												disabled
											/>
										</FormGroup>
									</Col>
									<Col md={4}>
										<FormGroup>
											<Label className="small" htmlFor="lname">
												<b className="text-deep">Password</b>
											</Label>
											<Input
												id="lastName"
												name="password"
												type="password"
												placeholder="Anzi45?m"
												style={{ borderColor: "#C1BBEB" }}
												value={
													(details.password = details.first_name
														? `${random}`
														: "")
												}
												onChange={handleChange}
												disabled
											/>
										</FormGroup>
									</Col>
								</Row>
							</Form>
						</div>

						{error ? <div className="error">{errorMsg}</div> : ""}
					</div>

					<button
						disabled={isLoading}
						type="submit"
						className="ms-bg text-white rounded-pill px-4 mb-5 save py-2"
						onClick={handleSubmit}>
						{isLoading ? (
							// <span className="spinner-border" role="status">
							//   <span className="sr-only">Loading...</span>
							// </span>
							<>
								<Spinner size="sm">Loading...</Spinner>
								<span> Loading</span>
							</>
						) : (
							<span className="text-center">Submit</span>
						)}
					</button>
				</div>
			</div>
			<div className="my-5 h-100"></div>
		</>
	);
};

export default AddNewStaff;
