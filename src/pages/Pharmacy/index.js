import React from "react";
import { useEffect } from "react";
// import ItemsCard from "../../components/ItemsCard";
// import SearchBar from "../../components/SearchBar";
// import notification from "../../assets/icons/svg/notification.svg";
// import settings from "../../assets/icons/svg/settings.svg";
// import circleperson from "../../assets/icons/svg/circleperson.svg";
// import continueicon from "../../assets/icons/svg/continue.svg";
// import ActiveStaff from "../../components/ActiveStaff";
// import CurvedChat from "../../components/CurvedChat";
import SideBar from "../../components/SideBar";
// import { Collapse } from "reactstrap";
// import DeliveryCalander from "../../components/DeliveryCalander";
// import BarGraph from "../../components/BarGraph";
// import Shipment from "../../components/Shipment";
// import { Helmet } from "react-helmet";
import NavBar from "../../components/NavBar";
// import dayofWeek from "../../static/todaysDate";
// import dayOfMonth from "../../static/todaysDate";
// import curMonth from "../../static/todaysDate";
// import curYear from "../../static/todaysDate";
// import todaysDate from "../../static/todaysDate";
// import deliverycard from "../../assets/images/svgs/deliverycard.svg";
// import hrmcard from "../../assets/images/svgs/hrmcard.svg";
// import returncard from "../../assets/images/svgs/returncard.svg";
// import NavIcons from "../../components/NavIcons";
// import { BsSearch } from "react-icons/bs";
// import Search from "../../components/Search";
import Header from "../../components/Header";
// import PharmacyName from "../../components/PharmacyName";
// import axios from "../../config/api/axios";
// import product from "../../assets/images/svgs/Finance.svg";
// import hrm from "../../assets/images/svgs/hrm.svg";
// import invoice from "../../assets/images/svgs/invoices.svg";
// import orders from "../../assets/images/svgs/food.svg";
// import returns from "../../assets/images/svgs/returns.svg";
// import sales from "../../assets/images/svgs/sales.svg";
// import customers from "../../assets/icons/svg/customer.svg";
// import DateHeader from "../../components/DateHeader";
// import HomeHeader from "../../components/HomeHeader";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetMonthlySalesMutation } from "../../app/features/dashboard/dashboardApiSlice";
// import { facility_id } from "../../app/features/authSlice/authSlice";
// import { monthlySales } from "../../app/features/dashboard/dashboardSlice";
import { Outlet} from "react-router-dom";
// import Dashboard from "./Dashboard/Dashboard";
import { facility_id, pharmacyInfo } from "../../app/features/authSlice/authSlice";
import { useGetPharmacyInfoMutation } from "../../app/features/authSlice/userApiSlice";
import { useDispatch, useSelector } from "react-redux";


const Pharmacy = () => {
	const facilityid = useSelector(facility_id);
	const [getinfo] = useGetPharmacyInfoMutation();
	const dispatch = useDispatch();


	useEffect(() => {
   
		const fetchData = async () => {
		  try{
			const results = await getinfo(facilityid).unwrap();
			dispatch(pharmacyInfo(results?.data));
			sessionStorage.setItem("pharmacyInfo", JSON.stringify(results?.data));
		  }catch (error) {
			console.log(error)
			if (error.status === "FETCH_ERROR")
					console.error("Network Error ");
		  }
		  
		};
		fetchData();
	  }, [dispatch, facilityid, getinfo]);

	return (
		<>
			<Header />
			<NavBar />
			<div className="d-md-flex dashboard">
				{/* LEFT */}
				<div className="col-md-3 d-none d-md-block left">
					<SideBar />
				</div>
				<Outlet/>
			</div>
		</>
	);
};

export default Pharmacy;
