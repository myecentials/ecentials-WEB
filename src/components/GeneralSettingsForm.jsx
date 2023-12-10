import React, { useEffect, useState } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { useSelector } from "react-redux";
import { BsX } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

import axios from "../config/api/axios";
import logo from "../logo.svg";
import useAuth from "../hooks/useAuth";
import {
	facility_id,
	pharmacyinfo,
	setToken,
} from "../app/features/authSlice/authSlice";

const GeneralSettingsForm = () => {
	const facilityid = useSelector(facility_id);
	const pharmInfo = useSelector(pharmacyinfo);
	const token = useSelector(setToken);

	const { auth } = useAuth();
	const [details, setDetails] = useState({
		...pharmInfo,
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value =
			e.target.type === "file"
				? e.target.files[0]
				: e.target.type === "checkbox"
				? details.privileges.push(e.target.name)
				: e.target.value;
		setDetails({ ...details, [name]: value });
	};
	console.log(details);

	useEffect(() => {
		axios
			.post(
				"/hospitals/fetch-hospital-information",
				{
					hospital_id: facilityid,
				},
				{
					headers: {
						"auth-token": token,
					},
				}
			)
			.then((res) => {
				setDetails({ ...details, ...res.data.data[0] });
			})
			.catch((err) => console.log(err));
	}, []);

	const {
		store_id,
		name,
		email,
		gps_address,
		phone_number,
		opening_hours,
		license_number,
		photo,
		location,
		logo,
	} = details;

	const updateInfo = {
		store_id,
		name,
		email,
		gps_address,
		phone_number,
		opening_hours,
		license_number,
		logo,
	};

	const formData = new FormData();

	const [isOpen, setIsOpen] = useState(false);
	const handleClick = (e) => {
		e.preventDefault();
		formData.append("store_id", details.store_id);
		formData.append("name", details.name);
		formData.append("email", details.email);
		formData.append("gps_address", details.gps_address);
		formData.append("phone_number", details.phone_number);
		formData.append("opening_hours", details.opening_hours);
		formData.append("license_number", details.license_number);
		formData.append("location", details.location);
		formData.append("logo", details.photo);

		try {
			const res = axios.post(
				"/pharmacies/update-pharmacy-information",
				formData,
				{
					headers: {
						"auth-token": token,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			toast.promise(
				res, {
				loading: "Loading",
				success: (res) => console.log(res),
				error: "An error occured",
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<div className="bg-white pb-5" style={{ borderRadius: "10px" }}>
			<h6 className="pt-5 px-3">General Settings</h6>
			<hr className="my-0" />

			{/* FORM */}
			<div className="row px-3 mt-4">
				<div className="col-md">
					<div className="form-group mb-2">
						<label htmlFor="name" className="small mb-2">
							Company Title*
						</label>
						<input
							type="text"
							className="form-control mb-4"
							name="name"
							defaultValue={details.name}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label htmlFor="text" className="small mb-2">
							Address
						</label>
						<input
							type="address"
							className="form-control mb-4"
							name="gps_address"
							defaultValue={details.gps_address}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label htmlFor="location" className="small mb-2">
							Phone Number
						</label>
						<input
							type="text"
							className="form-control mb-4"
							name="phone_number"
							defaultValue={details.phone_number}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label htmlFor="password" className="small mb-2">
							Language
						</label>
						<select name="" id="" className="form-control mb-4">
							<option value="">English(US)</option>
						</select>
					</div>
					{/* <div className="form-group mb-2">
            <label htmlFor="password" className="small mb-2">
              Courier Type
            </label>
            <select name="" id="" className="form-control">
              <option value="">Internal fleet</option>
            </select>{" "}
          </div> */}
				</div>
				<div className="col-md">
					<div className="form-group mb-2">
						<label htmlFor="name" className="small mb-2">
							Location
						</label>
						<input
							type="text"
							name="location"
							className="form-control mb-4"
							defaultValue={details.location}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label htmlFor="email" className="small mb-2">
							License number
						</label>
						<input
							type="text"
							className="form-control mb-4"
							name="license_number"
							defaultValue={details.licence_no}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label htmlFor="location" className="small mb-2">
							Email
						</label>
						<input
							type="email"
							className="form-control mb-4"
							name="email"
							defaultValue={details.email}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label htmlFor="password" className="small mb-2">
							Currency
						</label>
						<select name="" id="" className="form-control">
							<option value="">Ghanaian Cedis</option>
						</select>{" "}
					</div>
				</div>
			</div>
			<div
				className="card bg-light mx-3 d-flex flex-column justify-content-center align-items-center"
				style={{ height: "10rem", border: "1px dashed grey" }}>
				{/* <div className="d-flex align-items-center justify-content-even">
          <button className="btn btn-outline-secondary w-25 rounded-0 bg-light text-secondary">
            Add period
          </button>
          <button className="btn btn-outline-secondary w-25 rounded-0 bg-light text-secondary">
            Add period
          </button>
          <button className="btn btn-outline-secondary w-25 rounded-0 bg-light text-secondary">
            Add period
          </button>
          <button className="btn btn-outline-secondary w-25 rounded-0 bg-light text-secondary">
            Add period
          </button>
        </div> */}
				<button className="btn btn-outline-secondary w-25 rounded-0 bg-light text-secondary mt-4">
					Add period
				</button>
			</div>
			<p className="mt-4 mx-3">Logo</p>
			<div className="drug-photo mx-3" style={{ cursor: "pointer" }}>
				{details.logo ? (
					<img
						src={details.photo ? URL.createObjectURL(details.photo) : logo}
						alt=""
						className="w-100 h-100"
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
			<hr className="mx-3" />
			<input
				type="submit"
				className="btn signup-btn btn-lg px-5 mx-auto d-block rounded-0"
				value="Save & Exit"
				onClick={handleClick}
			/>
			<Toast
				isOpen={isOpen}
				onClick={handleClose}
				className="toast-position text-success border-0">
				<ToastHeader className="py-3">
					<BsX className="cancel_icon" size={20} />
				</ToastHeader>
				<ToastBody>Pharmacy information updated successfully</ToastBody>
			</Toast>
			<Toaster />
		</div>
	);
};

export default GeneralSettingsForm;
