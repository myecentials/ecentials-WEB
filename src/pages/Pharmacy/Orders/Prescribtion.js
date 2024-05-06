import React from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
// import SideBar from "../../../components/SideBar";
import { Helmet } from "react-helmet";
// import CustomeNav from "../../../components/CustomeNav";
// import OrderTable from "../../../components/OrderTable";
// import Header from "../../../components/Header";
import { useState } from "react";
import axios from "../../../config/api/axios";
import { useEffect } from "react";
import PharmacyName from "../../../components/PharmacyName";
import PrescriptionTable from "../../../components/Pharmacy/Orders/PrescriptionTable";
import {
	facility_id,
	setToken,
} from "../../../app/features/authSlice/authSlice";
import { useSelector } from "react-redux";

const Prescription = () => {
	const [, setData] = useState([]);
	const token = useSelector(setToken);
	const facilityId = useSelector(facility_id);

	useEffect(() => {
		axios
			.post(
				"/pharmacy/orders/fetch-all-orders",
				{
					store_id: facilityId,
				},
				{
					headers: {
						"auth-token": token,
					},
				}
			)
			.then((res) => {
				setData(res.data.data);
			})
			.catch((err) => console.log(err));
	}, [facilityId, token]);

	const [searchText,] = useState("");

	return (
		<>
			<Helmet>
				<title>Prescription</title>
			</Helmet>

			<div className="col-md-9 middle">
				<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
					<div>
						<h6 className="mt-2 text-deep">PRESCRIPTION</h6>
						<DateHeader />
						<div className="d-flex">
							<BreadCrumb
								name="Orders"
								breadcrumb="/pharmacy/orders"
								hasStyles={true}
							/>
						</div>
					</div>
					<PharmacyName />
				</div>

				<div className="mt-4">
					<PrescriptionTable search={searchText} />
				</div>
				{/* End of Table */}
			</div>
		</>
	);
};

export default Prescription;
