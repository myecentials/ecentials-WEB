import React from "react";
import logo from "../../logo.svg";
import briefcase from "../../assets/icons/svg/briefcase.svg";
import lock from "../../assets/icons/svg/lock.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../../components/Footer";
import { useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";
import { useLoginMutation } from "../../app/features/authSlice/userApiSlice";
import { setCredentials } from "../../app/features/authSlice/authSlice";
import { useDispatch } from "react-redux";

export const LoggedInContext = React.createContext();
const Login = () => {
	const [errMes,setErrMes] = useState("");
	const [error,setError] = useState(false);
	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [show, setShow] = useState(false);
	const [, setIsLoading] = useState(false);
	const [details, setDetails] = useState({ account_id: "", password: "" });
	const [login, { isLoading }] = useLoginMutation();

	const [erC, setErC] = useState(0);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setDetails({ ...details, [name]: value });
	};
	const handleFocus = () => {
		setIsLoading(true);
	};
	const navigate = useNavigate();
	// const location = useLocation();

	// Check whether owner has pharmacy

	// Hanlde submit  function
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (details.account_id === "" && details.password === "") {
			setUsernameError(true);
			setPasswordError(true);
			return;
		}
		if (details.account_id === "") {
			setUsernameError(true);
			return;
		}
		if (details.password === "") {
			setPasswordError(true);
			return;
		}
		try {
			const res = await login({ ...details }).unwrap();
			dispatch(setCredentials({ ...res?.result }));
			console.log(res);
			
			setError(true)
		// 	if (res?.message === "an error occurred, please try again") {
		// 		setError(true)
		// setErrMes(prev => "An error occurred please retry");
		// 	}
		// 	if (res?.message === "wrong password, please try again"
		// 	) {
		// 		setError(true)
		// 		setErrMes("Invalid credentials ,please retry");
		// 	}



			// checking for being staff or owner
			if (
				res?.result?.data?.staff_privileges &&
				!res?.result?.data?.staff_terminated
			) {
				navigate("/pharmacy/dashboard");
				return;
			}

			navigate("/signup");
		} catch (error) {
			console.log(error);
			if (erC === 0) {
				setErC(1);
				toast.error("An error occured,plase retry");
			} else if (erC === 1) {
				setErC(2);
				toast.error(
					"An error occured,please check your internet connection and try again"
				);
			} else {
				toast.error("Try refreshing the page again");
			}
		}

		
	};

	const handleClick = () => {
		setShow(!show);
	};

	return (
		<><Toaster /><LoggedInContext.Provider value={true}>
			<Helmet>
				<title>Login</title>
				<meta name="description" content="Health Care application" />
				<meta
					name="keywords"
					content="ecentails, ecential, hospital, pharmacy, epharmacy, e-pharmacy, lab, Health Care application" />
			</Helmet>
			<div className="container">
				<div className="contain">

					<div className="card shadow-lg border-0 login">
						<Link to="/" className=" mx-auto mt-4">
							<img src={logo} alt="" width={120} />
						</Link>
						<div className="card-body">
							<h5 className="card-title  mt-4 mb-4">Welcome Back</h5>

							
							<form
								className="form-group"
								onSubmit={handleSubmit}
								autoComplete="off">
								<div className="form-floating mb-4">
									{error ? (<div className="error">Invalid credentials</div>) : ("")}
									<input
										data-cy="businessId"
										type="text"
										className="form-control login-form-control"
										id="email"
										placeholder="Business ID"
										name="account_id"
										value={details.account_id}
										onChange={handleChange}
										autoComplete="off"
										required />
									<label htmlFor="email" className="light-text">
										<img src={briefcase} alt="" className="mb-2" />
										<span className="mx-4">Business ID</span>
									</label>
								</div>
								{usernameError ? (
									<div className="error" data-cy="username-error">
										{" "}
										Username is empty
									</div>
								) : (
									""
								)}

								<div className="form-floating input_container">
									<input
										data-cy="password"
										type={show ? "text" : "password"}
										className="form-control login-form-control"
										id="password"
										placeholder="Password"
										name="password"
										value={details.password}
										onChange={handleChange}
										required />
									<label htmlFor="password" className="light-text">
										<img src={lock} alt="" className="mb-2" />
										<span className="mx-4">Password</span>
									</label>
									{!details.password ? (
										""
									) : (
										<div>
											{show ? (
												<span className="eye" onClick={handleClick}>
													<RiEyeLine />
												</span>
											) : (
												<span className="eye" onClick={handleClick}>
													<RiEyeCloseLine />
												</span>
											)}
										</div>
									)}
								</div>
								{passwordError ? (
									<div className="error" data-cy="password-error">
										{" "}
										Password is empty
									</div>
								) : (
									""
								)}

								<div className="row justify-content-center mt-3 ">
									<div className="col-6 col-md-8">
										<div className="form-check ">
											<input
												className="form-check-input"
												type="checkbox"
												value=""
												id="rememberme" />
											<label
												className="form-check-label light-text "
												htmlFor="rememberme">
												Remember Me
											</label>
										</div>
									</div>

									<div className="col-6 col-md-4 text-center">
										<Link
											to="/forgot-password"
											className="text-primary light-text">
											Forgot Password
										</Link>
									</div>
								</div>

								<button
									data-cy="login-btn"
									type="submit"
									className="btn signup-btn w-100 mt-4 bold-font btn-auth"
									onClick={handleSubmit}
									onFocus={handleFocus}>
									{isLoading ? (
										<div className="spinner-border" role="status">
											<span className="visually-hidden">Loading...</span>
										</div>
									) : (
										"Sign in"
									)}
								</button>
								<Toaster />
								<p className="mt-4  text-center small">
									Don't have an account?{" "}
									<Link to="/" className="text-primary text-decoration-none">
										sign up
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</LoggedInContext.Provider></>
	);
};

export default Login;
