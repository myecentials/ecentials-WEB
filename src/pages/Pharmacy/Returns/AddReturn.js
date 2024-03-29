import React, { useState } from "react";
import DateHeader from "../../../components/DateHeader";

import { Helmet } from "react-helmet";
import { Input, Modal, ModalBody } from "reactstrap";
import BreadCrumb from "../../../components/BreadCrumb";
import PharmacyName from "../../../components/PharmacyName";
import { facility_id } from "../../../app/features/authSlice/authSlice";
import { useSelector } from "react-redux";
import { useAddReturnsMutation } from "../../../app/features/returns/returnsApiSlice";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const AddReturn = () => {
	const facilityId = useSelector(facility_id);
	const [details, setDetails] = useState("");
	const [open, setIsOpen] = useState(false);
	const [message, ] = useState("");
	const [addReturn] = useAddReturnsMutation();
	const navigate = useNavigate();

	// const [open, setIsOpen] = useState(false);
	const handleReturns = async (e) => {
		const remove = toast.loading("Loading...");
		try {
			const res = await addReturn({
				invoice_number: details,
				store_id: facilityId,
			}).unwrap();
			toast.dismiss(remove);
            toast.success(res.message)

if (res.status === "success"){
	setTimeout(()=> {

		navigate("/pharmacy/returns/invoice-return-list")
	},1500)
}

			console.log(res);
		} catch (error) {}

		// axios
		//   .post("/pharmacy/returns/add-return", {
		//     invoice_number: details,
		//     store_id: facilityId,
		//   },
		//   {
		//     headers : {
		//       "auth:token" : token
		//     }
		//   }
		//   )
		//   .then((res) => {
		//     if (res.data.status === "success") {
		//       setIsOpen(true);
		//       setMessage(res.data.message);
		//     }
		//   })
		//   .catch((err) => console.log(err));
	};

	return (
		<>
			<Helmet>
				<title>Add Return</title>
			</Helmet>

				<div className="col-md-9 middle">
					<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
						<div>
							<h6 className="mt-2 text-deep">RETURN</h6>
							<DateHeader />
							<div className="d-flex">
								<BreadCrumb
									name="Add Return"
									breadcrumb=""
									hasStyles={true}
									width="8rem"
								/>
							</div>
						</div>
						<PharmacyName />
					</div>
<Toaster/>
					<div className="mt-4 mx-md-3 mx-2">
						<div
							className="card border-0 pb-3 my-5 rounded"
							style={{ borderRadius: "10px" }}>
							<div className="ms-bg text-white py-2">
								<div className="row mx-2">
									<div className="col-sm-6">
										<div className="d-flex align-items-center">
											<h6 className="mx-3 text-nowrap">Ship from: </h6>
											<Input type="select">
												<option value="">Customer</option>
											</Input>
										</div>
									</div>
									<div className="col-sm-6"></div>
								</div>
							</div>
							<div className="mx-4 mt-3 text-deep">
								<div
									className="d-flex justify-content-sm-center align-items-sm-center "
									style={{ minHeight: "5rem" }}>
									<div className="d-sm-flex align-items-sm-center">
										<label htmlFor="" className="text-nowrap">
											Invoice ID
										</label>
										<input
											className="form-control add_return__form mx-sm-3 my-sm-0 my-3"
											type="text"
											placeholder=""
											onChange={(e) => setDetails(e.target.value)}
										/>
										<input
											disabled={details === ""}
											type="submit"
											value="Add"
											className=" ms-bg rounded text-white px-4 btn-sm py-2"
											onClick={handleReturns}
										/>
									</div>
									<Modal isOpen={open} centered={true}>
										<ModalBody>
											<img
												// src={successIcon}
												alt=""
												className="mx-auto d-block"
											/>
											<div className="text-center">
												<h3 className="text-deep mt-2">Success</h3>
												<p className="text-deep">{message}</p>
											</div>
										</ModalBody>

										<div className="d-flex pb-4 justify-content-center align-items-center mx-auto">
											<button
												className="btn btn-success text-white mx-2"
												onClick={() => setIsOpen(false)}
												style={{ width: "7rem" }}>
												Close
											</button>
										</div>
									</Modal>
								</div>
							</div>
						</div>
					</div>
				</div>
		</>
	);
};

export default AddReturn;
