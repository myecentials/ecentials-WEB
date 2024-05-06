import React, { useEffect, useState } from "react";
import DateHeader from "../../../components/DateHeader";
import { Helmet } from "react-helmet";
// import CustomeNav from "../../../components/CustomeNav";
// import SideBar from "../../../components/SideBar";
import BreadOutlined from "../../../components/BreadOutlined";
import BreadCrumb from "../../../components/BreadCrumb";
import StaffDetailsHeader from "../../../components/Pharmacy/Hrm/StaffDetailsHeader";
// import { BsX } from "react-icons/bs";
import {
	Form,
	Input,
	Label,
	FormGroup,
	Col,
	Row,
	Modal,
	// ToastHeader,
	// Toast,
	// ToastBody,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
// import deleteicon from "../../../assets/icons/svg/delete.svg";
// import Header from "../../../components/Header";
import axios from "../../../config/api/axios";
import { CgClose } from "react-icons/cg";
import PharmacyName from "../../../components/PharmacyName";
import { toast, Toaster } from "react-hot-toast";
import schools from "../../../static/schools.json";
import Select from "react-select";
import {
	setToken,
	facility_id,
} from "../../../app/features/authSlice/authSlice";
import { useSelector } from "react-redux";
import { PRIVILEDGESWLABELS } from "../../../static/priviledges";
const EditProfile = () => {
	const token = useSelector(setToken);
	const facilityId = useSelector(facility_id);
	
	const [isOpen, setIsOpen] = useState(false);
	// const [isUpdated, setIsUpdated] = useState(false);
	const [isEqual, setIsEqual] = useState(false);
	const [, setStaffName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [details, setDetails] = useState({
		first_name: "",
		last_name: "",
		city: "",
		email: "",
		phone_number: "",
		photo: null,
		profile: null,
		role: "",
		university: "",
		privileges: [],
		address: "",
		degree: "",
		place_of_birth: "",
		date_of_birth: "",
		ghana_card_number: "",
		start_date: "",
		end_date: "",
		employee_id: "",
		certificate: "",
		cv: "",
		facility_type: "Pharmacy",
		facility_id: facilityId,
		_id: "",
	});

	const formatDateForInput = (dateISO) => {
		if (!dateISO) return "";

		const date = new Date(dateISO);
		return date.toISOString().split("T")[0]; // Converts to "YYYY-MM-DD"
	};

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

	useEffect(()=>{
		const staffDetails = sessionStorage.getItem("staffDetails");
		if (staffDetails) {
			const refined = JSON.parse(staffDetails)
		  // Parse the stored data if it's an object or an array
		  setDetails(refined);
		 
		}
	  },[])
	
	  const fetchUpdate = () =>{
		const load = toast.loading("Updating staff details page...")
		axios
		.post(
			"/pharmacy/staff/fetch-pharmacy-staff",
			{
				facility_id: facilityId,
			},
			{
				headers: {
					"auth-token": token,
				},
			}
		)
		.then((res) => {
			toast.dismiss(load);
			console.log(res);
		const staffUpdated = res.data.data.find(obj => obj._id === details._id);	
		if(staffUpdated){
			sessionStorage.setItem("staffDetails", JSON.stringify(staffUpdated))

		}
			
			console.log(res);
			setTimeout(() => {
				navigate("/pharmacy/hrm/staff/name");
			}, [1500]);
			
						  })
		.catch((err) => {
			toast.dismiss(load);
			console.log(err);
		});
	  }

	

	

	// const PRIVILEDGES = [
	// 	{
	// 		label: "HRM",
	// 		value: "hrms",
	// 	},
	// 	{
	// 		label: "Customers",
	// 		value: "customers",
	// 	},
	// 	{
	// 		label: "Sales/Payment",
	// 		value: "sales",
	// 	},
	// 	{
	// 		label: "Products",
	// 		value: "products",
	// 	},
	// 	// {
	// 	// 	label: "Delivery",
	// 	// 	value: "delivery",
	// 	// },
	// 	{
	// 		label: "Manufacturer",
	// 		value: "manufacturers",
	// 	},
	// 	{
	// 		label: "Return",
	// 		value: "returns",
	// 	},
	// 	{
	// 		label: "Orders",
	// 		value: "orders",
	// 	},
	// 	{
	// 		label: "Report",
	// 		value: "reports",
	// 	},
	// 	{
	// 		label: "Invoice",
	// 		value: "invoices",
	// 	},
	// ];

	const handleModalOpen = () => {
		setIsOpen(true);
	};
	const handleModalClose = () => {
		setIsOpen(false);
	};

	const handleStaffName = (e) => {
		setStaffName(e.target.Value);
		e.target.value === `${details.first_name} ${details.last_name}`
			? setIsEqual(true)
			: setIsEqual(false);
	};

	const formData = new FormData();
	formData.append("first_name", details.first_name);
	formData.append("last_name", details.last_name);
	formData.append("email", details.email);
	formData.append("phone_number", details.phone_number);
	formData.append("address", details.address);
	formData.append("place_of_birth", details.place_of_birth);
	formData.append("date_of_birth", details.date_of_birth);
	formData.append("ghana_card_number", details.ghana_card_number);
	formData.append("pay_grade", details.pay_grade);
	formData.append("mode_of_payment", details.mode_of_payment);
	formData.append("department", details.department);
	formData.append("start_date", details.start_date);
	formData.append("end_date", details.end_date);
	formData.append("city", details.city);
	formData.append("username", details.username);
	formData.append("employee_id", details.employee_id);
	formData.append("password", details.password);
	formData.append("degree", details.degree);
	formData.append("university", details.university);
	formData.append("facility_type", details.facility_type);
	formData.append("facility_id", details.facility_id);
	formData.append("photo", details.profile ? details.profile : details.photo);
	formData.append("cv", details.cv);
	formData.append("certificate", details.certificate);
	formData.append("staff_type", details.staff_type);
	for (let i = 0; i < details.privileges.length; i++) {
		if (details?.privileges?.[i] === "") continue;
		formData.append("privileges[]", details.privileges[i]);
		console.log(details.privileges[i]);
	}

	console.log(details.privileges);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		setIsLoading(true);
		e.preventDefault();
		axios
			.post("/pharmacy/staff/update-staff-information", formData, {
				headers: { "auth-token": token, "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				console.log(res);
				setIsLoading(false);

				if (res?.data?.status === "success") {
					toast.success("Staff Updated  Successfully");
					fetchUpdate()
					
				}
			})
			.catch((err) => {
				setIsLoading(false);
			});
		
	};

	const handleTerminate = (e) => {
		e.preventDefault();

		const myPromise = axios.post(
			"/pharmacy/staff/terminate-staff",
			{
				facility_id: facilityId,
				staff_id: details._id,
			},
			{ headers: { "auth-token": token } }
		);

		toast.promise(
			myPromise,
			{
				loading: "Loading...",
				success: "Staff Terminated",
				error: "Something went wrong",
			},
			setTimeout(() => {
				setIsOpen(false);
				navigate("/pharmacy/hrm/staff")
			}, 1500)
		);
	};

	// const resume = URL.createObjectURL(new Blob([details.cv]));


	
	

	return (
		<>
			<Helmet>
				<title>Edit Profile</title>
			</Helmet>

			<div className="col-md-9 middle edit-relative pb-5">
				<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
					<div>
						<h6 className="mt-2 text-deep">HRM</h6>
						<DateHeader />
						<div className="d-flex flex-wrap">
							<BreadOutlined name="HRM" breadcrumb="/pharmacy/hrm/staff" />
							<BreadOutlined name="Staff" breadcrumb="/pharmacy/hrm/staff" />
							<BreadOutlined
								name={details.first_name}
								breadcrumb="/pharnacy/hrm/staff/name"
							/>
							<BreadCrumb
								name="Edit profile"
								breadcrumb="/pharmacy/hrm/staff/name/edit"
								width="7rem"
								hasStyles={true}
							/>
						</div>
					</div>
					<PharmacyName />
				</div>

				<div className="mt-4 mx-auto mx-md-5">
					<StaffDetailsHeader
						name={`${details.first_name} ${details.last_name}`}
						role={details.role}
						location={details.city}
						phone={details.phone_number}
						gmail={details.email}
						img={details.photo}
					/>
					{/* PERSONAL */}
					<div
						className="card border-0 pb-3 my-5 rounded"
						style={{ borderRadius: "10px" }}>
						<div className="ms-bg text-white py-2">
							<h6 className="mx-4">PERSONAL DETAILS</h6>
						</div>
						<div className="mx-4 mt-3 text-deep">
							<Form>
								<Row>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="fname">
												<b className="text-deep">First name*</b>
											</Label>
											<Input
												disabled={details.terminated}
												id="firstName"
												name="first_name"
												type="text"
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
												disabled={details.terminated}
												id="lastName"
												name="last_name"
												type="text"
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
												disabled={details.terminated}
												id="email"
												name="email"
												type="email"
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
												disabled={details.terminated}
												id="number"
												name="phone_number"
												type="text"
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
												disabled={details.terminated}
												id="address"
												name="address"
												type="textarea"
												value={details.address}
												style={{ height: "9rem", borderColor: "#C1BBEB" }}
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
														src={
															details.profile
																? URL.createObjectURL(details.profile)
																: details.photo
														}
														alt=""
														className="w-100 h-100"
														style={{
															aspectRatio: "3 / 2",
															objectFit: "cover",
															mixBlendMode: "darken",
															pointerEvents: "none",
														}}
													/>
												) : (
													<p className="small file_name">
														Drag and drop or click here to select image
													</p>
												)}
												<input
													disabled={details.terminated}
													type="file"
													className="drug_file"
													accept="image/*"
													name="profile"
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
												disabled={details.terminated}
												id="place"
												name="place_of_birth"
												type="text"
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
												disabled={details.terminated}
												id="date"
												name="date_of_birth"
												type="date"
												style={{ borderColor: "#C1BBEB" }}
												value={formatDateForInput(details.date_of_birth)}
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
												disabled={details.terminated}
												style={{ borderColor: "#C1BBEB" }}
												onChange={handleChange}
												id="place"
												name="ghana_card_number"
												type="text"
												value={details.ghana_card_number}
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
											{
												details?.university ?										
											<Select
												isSearchable={true}
												defaultValue={{
													value: details?.university,
													label: details?.university,
												}}
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
											/>  : ""
										}
										</FormGroup>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="lname">
												<b className="text-deep">Degree*</b>
											</Label>
											<Input
												disabled={details.terminated}
												id="lastName"
												name="degree"
												type="text"
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
													<Label className="small" htmlFor="start_date">
														<b className="text-deep">Start Date*</b>
													</Label>
													<Input
														disabled={details.terminated}
														id="start_date"
														name="start_date"
														type="date"
														style={{ borderColor: "#C1BBEB" }}
														value={formatDateForInput(details.start_date)}
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
											<Col>
												<FormGroup>
													<Label className="small" htmlFor="end_date">
														<b className="text-deep">End Date*</b>
													</Label>
													<Input
														disabled={details.terminated}
														id="end_date"
														name="end_date"
														type="date"
														style={{ borderColor: "#C1BBEB" }}
														value={formatDateForInput(details.end_date)}
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
										</Row>
									</Col>
									<Col md={6}>
										<FormGroup>
											<Label className="small" htmlFor="city">
												<b className="text-deep">City*</b>
											</Label>
											<Input
												disabled={details.terminated}
												id="city"
												name="city"
												type="text"
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
							<div className="d-flex mb-3">
								<a
									href={details.cv}
									className="text-deep my-0"
									download={`${details.first_name}.docx`}
									target="_blank"
									rel="noreferrer">
									{details.first_name} CV
								</a>
								{/* <img src={deleteicon} alt="" className="mx-5" /> */}
							</div>
							<p className="gray-text small">Degree Certificate</p>
							<div className="d-flex">
								<a
									href={details.certificate}
									download={details.certificate}
									target="_blank"
									className="text-deep my-0"
									rel="noreferrer">
									{details.first_name} Certificate
								</a>
								{/* <img src={deleteicon} alt="" className="mx-5" /> */}
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
					{/*  */}

					<div
						className="card border-0 pb-3 my-5 rounded pb-3 mb-5"
						style={{ borderRadius: "10px" }}>
						<div className="ms-bg text-white py-2">
							<h6 className="mx-4">LOGIN CREDENTIALS</h6>
						</div>
						<div className="mx-4 mt-3 text-deep">
							<Form>
								<Row>
									<Col md={4}>
										<FormGroup>
											<Label className="small" htmlFor="fname">
												<b className="text-deep">Business ID</b>
											</Label>
											<Input
												disabled={details.terminated}
												id="username"
												name="employee_id"
												type="text"
												style={{ borderColor: "#C1BBEB" }}
												value={details.employee_id}
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
									<Col md={4}>
										<FormGroup>
											<Label className="small" htmlFor="lname">
												<b className="text-deep">Password</b>
											</Label>
											<Input
												disabled={details.terminated}
												id="lastName"
												name="lname"
												type="text"
												style={{ borderColor: "#C1BBEB" }}
												value=""
												onChange={handleChange}
											/>
										</FormGroup>
									</Col>
								</Row>
							</Form>
						</div>
					</div>

					{details.terminated ? (
						""
					) : (
						<button
							type="submit"
							className="ms-bg text-white rounded-pill px-4 mb-5 save py-2"
							onClick={handleSubmit}>
							{isLoading ? (
								<div>
									<span
										className="spinner-border spinner-border-sm mx-2"
										role="status">
										<span className="sr-only">Loading...</span>
									</span>
									<span>Editing...</span>
								</div>
							) : (
								"Submit"
							)}
						</button>
					)}

					<button
						className="btn btn-danger rounded-pill border-0 shadow-lg"
						onClick={handleModalOpen}
						disabled={details.terminated}>
						{details.terminated ? "Staff Terminated" : "Terminate this staff"}
					</button>
					<Modal isOpen={isOpen} centered={true}>
						<div className="card border-0 modal_card">
							<CgClose className="close_modal" onClick={handleModalClose} />
							<p className="pt-3 mx-3">Are you absolutely sure?</p>
							<p className="py-3 px-3 warning_bg">
								Unexpected bad things will happen if you don’t read this!
							</p>
							<p className="px-3">
								This action cannot be undone. This will permanently terminate{" "}
								<b>
									{details.first_name} {details.last_name}'s
								</b>{" "}
								information
							</p>
							<p className="mx-3">
								Please type staff name{" "}
								<b>
									{details.first_name} {details.last_name}
								</b>{" "}
								to confirm.
							</p>
							<input
								disabled={details.terminated}
								type="text"
								className="form-control delete_staff_input"
								onChange={handleStaffName}
							/>
							<input
								disabled={details.terminated}
								onClick={handleTerminate}
								type="button"
								value="I understand consequence, Terminate this staff"
								className={
									isEqual
										? "form-control btn btn-outline-danger delete_staff_input my-4 delete_hover"
										: "form-control btn btn-outline-danger delete_staff_input disabled  my-4 delete_hover"
								}
							/>
						</div>
					</Modal>
					<Toaster />
				</div>
			</div>
		</>
	);
};

export default EditProfile;
