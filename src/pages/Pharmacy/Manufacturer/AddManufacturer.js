import React, { useState } from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
// import SideBar from "../../../components/SideBar";
import menulist from "../../../assets/icons/svg/menulist.svg";
import mail from "../../../assets/icons/svg/mail.svg";
import { Helmet } from "react-helmet";
// import CustomeNav from "../../../components/CustomeNav";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Col } from "reactstrap";
import BreadOutlined from "../../../components/BreadOutlined";
// import Header from "../../../components/Header";
import axios from "../../../config/api/axios";
import PharmacyName from "../../../components/PharmacyName";
import { facility_id, setToken } from "../../../app/features/authSlice/authSlice";
import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const AddManufacturer = () => {
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const facilityid = useSelector(facility_id);
	const token = useSelector(setToken);
	const [details, setDetails] = useState({
		facility_id: facilityid,
		name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		region: "",
		country: "",
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setDetails({ ...details, [name]: value });
	};

	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();
		setIsLoading(true);
		const load = toast.loading("Loading...");
		if (details.name === "") {
			setError(true);
			setErrorMsg("Please input all fields");
			setIsLoading(false);
		} else {
			axios
				.post("/pharmacy/wholesaler/add-new-wholesaler", details, {
					headers: {
						"auth-token": token,
					},
				})
				.then((res) => {
          console.log(res)
					if (res.data.message === "success") {
						toast.remove(load);
						toast.success("Wholesaler Added !");
						setTimeout(() => {
							navigate("/pharmacy/manufacturer/manufacturer-list", { replace: true });
							
						}, 1500);
						setIsLoading(false);
					}
					if (res.data.error.code === 11000) {
						setError(true);
						setErrorMsg(`${details.name} already exist. Check wholesaler list`);
						setIsLoading(false);
					}
				})
				.catch((err) => {
					setIsLoading(false);
				});
		}
	};

	return (
		<>
			<Helmet>
				<title>Add Wholesaler</title>
			</Helmet>

				<div className="col-md-9 middle">
					<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
						<div>
							<h6 className="mt-2 text-deep">WHOLESALER</h6>
							<DateHeader />
							<div className="d-flex">
								<BreadOutlined
									name="Wholesaler"
									breadcrumb="/pharmacy/manufacturer/add-manufacturer"
									width="9rem"
								/>
								<BreadCrumb
									name="Add Wholesaler"
									breadcrumb=""
									width="11.5rem"
									hasStyles={true}
								/>
							</div>
						</div>
						<PharmacyName />
					</div>
					<Toaster />
					<div className="mt-4 mx-md-3 mx-2">
						<div
							className="card border-0 pb-3 my-5 rounded"
							style={{ borderRadius: "10px" }}>
							<div
								className="ms-bg text-white pt-2 d-flex align-items-center justify-content-between"
								style={{
									borderTopRightRadius: "10px",
									borderTopLeftRadius: "10px",
								}}>
								<h6 className="mx-3 text-nowrap truancate">Add Wholesaler</h6>
								<h6 className="mx-3">
									<Link
										to="/pharmacy/manufacturer/manufacturer-list"
										className="btn btn-light d-flex">
										<img src={menulist} alt="" />
										<b
											className="mx-2 small text-nowrap"
											style={{ color: "#4D44B5" }}>
											Wholesaler List
										</b>
									</Link>
								</h6>
							</div>
							<div className="mx-4 mt-3 text-deep">
								<Form>
									{error ? <div className="error">{errorMsg}</div> : ""}
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={3}
											className="text-nowrap">
											Wholesaler Name*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="name"
												placeholder="Andrews Opoku"
												type="text"
												style={{ borderColor: "#C1BBEB" }}
												value={details.name}
												onChange={handleChange}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={3}
											className="text-nowrap">
											Email Addresss*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="email"
												placeholder="example@gmail.com"
												type="email"
												style={{ borderColor: "#C1BBEB" }}
												value={details.email}
												onChange={handleChange}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={3}
											className="text-nowrap">
											Phone*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="phone"
												placeholder="+233545098438"
												type="text"
												style={{ borderColor: "#C1BBEB" }}
												value={details.phone}
												onChange={handleChange}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={3}
											className="text-nowrap">
											Address*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="address"
												placeholder="PLT 16 BLK III"
												type="text"
												style={{ borderColor: "#C1BBEB" }}
												value={details.address}
												onChange={handleChange}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={3}
											className="text-nowrap">
											City*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="city"
												placeholder="Kumasi"
												type="text"
												style={{ borderColor: "#C1BBEB" }}
												value={details.city}
												onChange={handleChange}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={3}
											className="text-nowrap">
											Region*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="region"
												placeholder="Kumasi"
												type="text"
												style={{ borderColor: "#C1BBEB" }}
												value={details.region}
												onChange={handleChange}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={3}
											className="text-nowrap">
											Country*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="country"
												placeholder="Ghana"
												type="text"
												style={{ borderColor: "#C1BBEB" }}
												value={details.country}
												onChange={handleChange}
											/>
										</Col>
									</FormGroup>

									<div className="d-flex justify-content-end align-items-end mt-4">
										<img src={mail} alt="" />
										<button
											type="submit"
											className="ms-bg text-white rounded-pill px-4 py-2"
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
								</Form>
							</div>
						</div>
					</div>
				</div>
		</>
	);
};

export default AddManufacturer;
