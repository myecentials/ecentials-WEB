import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Col } from "reactstrap";
import { useSelector } from "react-redux";

import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
import NavIcons from "../../../components/NavIcons";
import SideBar from "../../../components/SideBar";
import menulist from "../../../assets/icons/svg/menulist.svg";
import mail from "../../../assets/icons/svg/mail.svg";
import CustomeNav from "../../../components/CustomeNav";
import BreadOutlined from "../../../components/BreadOutlined";
import Header from "../../../components/Header";
import axios from "../../../config/api/axios";
import PharmacyName from "../../../components/PharmacyName";
import { facility_id, setToken } from "../../../app/features/authSlice/authSlice";
import {
	getSelectedCustomer,
	resetCustomer,
} from "../../../app/features/customers/customerSlice";
import { useEffect } from "react";
import { useUpdateCustomerMutation } from "../../../app/features/customers/customerApiSlice";

const EditCustomer = () => {
	const editCustomer = useSelector(getSelectedCustomer);
	const facilityid = useSelector(facility_id);
	const token = useSelector(setToken);
	const [updateCustomer] = useUpdateCustomerMutation();
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const navigate = useNavigate();

	const [details, setDetails] = useState(
		JSON.parse(sessionStorage.getItem("selectedCustomer")) || {}
	);

	const transformDetailsForEndpoint = (details) => {
		return {
			customer_id: details._id,
			region: details.region,
			city: details.city,
		};
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		// Update the details state
		setDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
	};

	const handleClick = async (e) => {
		e.preventDefault();
		try {
			const transformedDetails = transformDetailsForEndpoint(details);
			const res = await updateCustomer({ ...transformedDetails }).unwrap();
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Helmet>
				<title>Add Customers</title>
			</Helmet>

				<div className="col-md-9 middle">
					<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
						<div>
							<h6 className="mt-2 text-deep">CUSTOMERS</h6>
							<DateHeader />
							<div className="d-flex">
								<BreadOutlined
									name="Customers"
									breadcrumb="/pharmacy/customers/add-customers"
									width="8rem"
								/>
								<BreadCrumb
									name="Edit Customer"
									breadcrumb=""
									width="10rem"
									hasStyles={true}
								/>
							</div>
						</div>
						<PharmacyName />
					</div>

					<div className="mt-4 mx-md-5 mx-2">
						<div
							className="card border-0 pb-3 my-5 rounded"
							style={{ borderRadius: "10px" }}>
							<div
								className="ms-bg text-white pt-2 d-flex align-items-center justify-content-between"
								style={{
									borderTopRightRadius: "10px",
									borderTopLeftRadius: "10px",
								}}>
								<h6 className="mx-3 text-nowrap">Edit Customer</h6>
							</div>
							<div className="mx-4 mt-3 text-deep">
								<Form>
									{error ? <div className="error">{errorMsg}</div> : ""}
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={2}
											className="text-nowrap">
											Customer Name*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="name"
												placeholder="Andrews Opoku"
												value={details.name}
												onChange={handleChange}
												type="text"
												style={{ borderColor: "#C1BBEB" }}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={2}
											className="text-nowrap">
											Email Addresss*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="email"
												placeholder="example@gmail.com"
												value={details.email}
												onChange={handleChange}
												type="email"
												style={{ borderColor: "#C1BBEB" }}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={2}
											className="text-nowrap">
											Phone*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="phone"
												placeholder="+233545098438"
												value={details.phone}
												onChange={handleChange}
												type="text"
												style={{ borderColor: "#C1BBEB" }}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={2}
											className="text-nowrap">
											Address*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="address"
												placeholder="PLT 16 BLK III"
												value={details.address}
												onChange={handleChange}
												type="text"
												style={{ borderColor: "#C1BBEB" }}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={2}
											className="text-nowrap">
											City*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="city"
												placeholder="Kumasi"
												value={details.city}
												onChange={handleChange}
												type="text"
												style={{ borderColor: "#C1BBEB" }}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={2}
											className="text-nowrap">
											Region*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="region"
												placeholder="Kumasi"
												value={details.region}
												onChange={handleChange}
												type="text"
												style={{ borderColor: "#C1BBEB" }}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label
											htmlFor="exampleEmail"
											sm={2}
											className="text-nowrap">
											Country*
										</Label>
										<Col sm={10} className="w-category">
											<Input
												id="category"
												name="country"
												placeholder="Ghana"
												value={details.country}
												onChange={handleChange}
												type="text"
												style={{ borderColor: "#C1BBEB" }}
											/>
										</Col>
									</FormGroup>

									<div className="d-flex justify-content-end align-items-end mt-4">
										<img src={mail} alt="" />
										<input
											type="submit"
											value="Save"
											onClick={handleClick}
											className="ms-bg text-white rounded-pill px-4 py-2"
										/>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
		</>
	);
};

export default EditCustomer;
