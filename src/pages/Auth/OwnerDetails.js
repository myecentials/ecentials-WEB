import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
// import mbleft from "../../assets/images/png/mbscreen1.png";
// import mbright from "../../assets/images/png/mbscreen2.png";
import ebusiness from "../../assets/images/png/ebusiness.svg";
// import mbup from "../../assets/images/png/mbscreen3.png";
import google from "../../assets/icons/svg/googleicon.svg";
import googleplay from "../../assets/icons/svg/googledownload.svg";
import iosdownload from "../../assets/icons/svg/iosdownload.svg";
import circlecorrect from "../../assets/gifs/loader-with-check-no background.gif";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
// import { useSpring, animated } from "react-spring";
import {
	Form,
	FormGroup,
	Row,
	Label,
	Col,
	Input,
	// ModalBody,
	Modal,
} from "reactstrap";
//import { phone_number } from "faker/lib/locales/az";
// import axios from "../../config/api/axios";
// import { BASE_URL } from "../../private/keys";
import { useSignupMutation } from "../../app/features/authSlice/userApiSlice";
import toast ,{Toaster} from "react-hot-toast";

const OwnerDetails = () => {
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const [valid] = useState(true);
	const [error] = useState(false);
	const [checked, setChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errMes, setErrMes] = useState("");
	const [details, setDetails] = useState({
		full_name: "",
		email: "",
		phone_number: "",
		address: "",
		password: "",
		confirm_password: "",
	});

	const handleShow = () => {
		setShow(!show);
	};
	const handleCheck = () => {
		setChecked(!checked);
	};

	const [validEmail, setValidEmail] = useState(false);
	// const [emailFocus, setEmailFocus] = useState(false);
	const [validPass, setValidPass] = useState(false);
	// const [passFocus, setPassFocus] = useState(false);
	const [phoneValid, setPhoneValid] = useState(false);

	useEffect(() => {
		const emailReg = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

		const result = emailReg.test(details.email);
		setValidEmail(result);
	}, [details.email]);

	useEffect(() => {
		const passReg =
			/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*\d).{8,}$/;
		const result = passReg.test(details.password);
		setValidPass(result);
	}, [details.password]);

	useEffect(() => {
		const phoneReg = /^0\d{9}$/;

		const result = phoneReg.test(details.phone_number);
		setPhoneValid(result);
	}, [details.phone_number]);

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setDetails({ ...details, [name]: value });
	};

	const handleFocus = () => {
		setIsLoading(true);
	};

	const [signup] = useSignupMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const {
			full_name,
			address,
			phone_number,
			email,
			password,
			confirm_password,
		} = details;
		if (password !== confirm_password) {
			setErrMes("Password do not match");
		} else {
			const newUser = {
				full_name: full_name.trim(),
				email: email.trim(),
				phone_number: phone_number.trim(),
				address: address.trim(),
				password: password.trim(),
			};

			try {
				const response = await signup(newUser).unwrap();
				console.log(response);

				if (response?.message === "Owner created successfully"
        ) {
					console.log("loading stopped");
					setOpen(true);
					setIsLoading(false);
				}
			} catch (error) {
				console.error("Error during signup:", error);
				if (error?.data?.message === "Owner already exists") {
					toast.error("Owner already exists");
				}
				setIsLoading(false);
			
			}
		
		}
	};

  const  maskEmail = (email) => {
       // Split the email address into local part and domain part
       const [localPart, domainPart] = email.split('@');

       // Extract the first three characters of the local part
       const visibleCharacters = localPart.substring(0, Math.min(3, localPart.length));
   
       // Mask the remaining characters with asterisks
       const maskedCharacters = '*'.repeat(Math.max(localPart.length - 3, 0));
   
       // Combine the visible characters and masked characters with the domain part
       const maskedEmail = `${visibleCharacters}${maskedCharacters}@${domainPart}`;
   
       return maskedEmail;
   
}




	let checkClass =
		"text-white btn btn-primary px-5 small py-2  text-nowrap  rounded w-100";

	return (
		<>
    <Toaster/>
			<Helmet>
				<title>Signup Information</title>
				<meta name="description" content="Health Care application" />
				<meta
					name="keywords"
					content="ecentails, ecential, hospital, pharmacy, epharmacy, e-pharmacy, lab, Health Care application"
				/>
			</Helmet>

			<div className="home-center">
				<div className="card home-login bg-white border-0">
					<div className="d-lg-flex flex-row-reverse">
						<div className="col-lg-6 home-right bg-white">
							<div className="mx-4">
								<img
									src={logo}
									alt=""
									width={120}
									className="mt-4 text-center mx-auto d-block mx-md-0"
								/>

								<small
									className="card-title  mt-3 small"
									style={{ fontSize: "12px", marginBottom: "6rem" }}>
									Personal details
								</small>
								{error ? <div className="error">{errMes}</div> : ""}
								<Form>
									<Row>
										<Col md={6}>
											<FormGroup>
												<Label className="small" htmlFor="full_name">
													Full name
												</Label>
												<Input
													id="full_name"
													name="full_name"
													type="text"
													value={details.full_name}
													onChange={handleChange}
												/>
											</FormGroup>
										</Col>
										<Col md={6}>
											<FormGroup>
												<Label className="small" htmlFor="email">
													{valid ? "Email" : "Invalid"}
												</Label>
												<Input
													id="lastName"
													name="email"
													value={details.email}
													onChange={handleChange}
													type="email"
													invalid={details.email && !validEmail}
													// valid={validEmail}
													aria-describedby="#note"
												/>
												<p className="text-danger small" id="note">
													{details.email && !validEmail
														? "Please enter a valid email"
														: ""}
												</p>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col md={6}>
											<FormGroup>
												<Label className="small" htmlFor="phone_number">
													Phone number
												</Label>
												<Input
													id="email"
													name="phone_number"
													value={details.phone_number}
													onChange={handleChange}
													type="tel"
													invalid={details.phone_number && !phoneValid}
													valid={details.phone_number && phoneValid}
													maxLength={10}
												/>
											</FormGroup>
										</Col>
										<Col md={6}>
											<FormGroup>
												<Label className="small" htmlFor="date">
													Address
												</Label>
												<Input
													id="date"
													name="address"
													value={details.address}
													onChange={handleChange}
													type="text"
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col md={6}>
											<FormGroup className="input_container">
												<Label className="small" htmlFor="password">
													Password
												</Label>
												<Input
													id="password"
													name="password"
													value={details.password}
													onChange={handleChange}
													type={show ? "text" : "password"}
													invalid={details.password && !validPass}
												/>

												{!details.password ? (
													""
												) : (
													<div>
														{show ? (
															<RiEyeLine
																className="eyeicon"
																onClick={handleShow}
															/>
														) : (
															<RiEyeCloseLine
																className="eyeicon"
																onClick={handleShow}
															/>
														)}
													</div>
												)}
											</FormGroup>
										</Col>
										<Col md={6}>
											<FormGroup className="input_container">
												<Label className="small" htmlFor="confirmpass">
													Confirm Password
												</Label>
												<Input
													id="confirmpass"
													name="confirm_password"
													type={show ? "text" : "password"}
													value={details.confirm_password}
													onChange={handleChange}
													invalid={
														details.confirm_password &&
														details.password !== details.confirm_password
													}
													valid={
														details.confirm_password &&
														details.password === details.confirm_password
													}
												/>
												{!details.confirm_password ? (
													""
												) : (
													<div>
														{show ? (
															<RiEyeLine
																className="eyeicon"
																onClick={handleShow}
															/>
														) : (
															<RiEyeCloseLine
																className="eyeicon"
																onClick={handleShow}
															/>
														)}
													</div>
												)}
											</FormGroup>
										</Col>
									</Row>
									<p className="small text-danger mt-2">
										{details.password && !validPass
											? "Password should contain atleast 1 special character 1 uppercase letter and 1 number"
											: ""}
									</p>

									<div className="form-check ">
										<input
											className="form-check-input"
											type="checkbox"
											value=""
											id="rememberme"
											onChange={handleCheck}
										/>
										<label
											className="form-check-label light-text "
											htmlFor="rememberme">
											I agree to all the <Link to="">Terms</Link> and{" "}
											<Link to="">Privacy policy</Link>
										</label>
									</div>
									<Row className="row gy-md-0 gy-3 mt-3 justify-content-center text-center  align-items-center">
										<Col>
											<button
												type="submit"
												onFocus={handleFocus}
												onClick={handleSubmit}
												className={
													checked &&
													validEmail &&
													validPass &&
													details.password === details.confirm_password
														? checkClass.concat(" ")
														: checkClass.concat(" disabled")
												}>
												{isLoading ? (
													<span className="spinner-border" role="status">
														<span className="sr-only">Loading...</span>
													</span>
												) : (
													<span className="text-center">Create account</span>
												)}
											</button>
										</Col>
										<Col>
											<Link
												to=""
												className=" text-white btn btn-dark px-5  small py-2 text-nowrap  rounded d-block">
												<span>
													<img src={google} alt="" />
												</span>{" "}
												Create account
											</Link>
											<Modal isOpen={open} centered={true}>
												<div className="contain">
													<div className="border-0 id-card">
														<img src={circlecorrect} alt="" width={100} />
														<p className="my-3">Successful !</p>
														<p className="w-75 text-center">
															Your login ID has been sent to your email{" "}
															<Link to="">
																{ maskEmail(details.email)}
															</Link>{" "}
															Use it each time you sign in
														</p>
														<Link
															to="/login"
															className="btn signup-btn w-75 mt-4">
															Sign in
														</Link>
													</div>
												</div>
											</Modal>
										</Col>
									</Row>
									<p className="mt-4  text-center small">
										Already have an account?{" "}
										<Link
											to="/login"
											className="text-primary text-decoration-none">
											login
										</Link>
									</p>
									<div className="pb-3 mx-auto text-center">
										<Link to="" className="col">
											<img src={googleplay} alt="" />
										</Link>
										<Link to="" className="col mx-2">
											<img src={iosdownload} alt="" />
										</Link>
									</div>
								</Form>
							</div>
						</div>
						<div className="col-lg-6 owner_details_bg d-flex justify-content-center align-items-center flex-column">
							<div className=" my-5 circle-color">
								<img src={ebusiness} alt="" width={150} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default OwnerDetails;
