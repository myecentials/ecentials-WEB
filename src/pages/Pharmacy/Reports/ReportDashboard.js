import React, { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
import SideBar from "../../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../../components/CustomeNav";
import DateMenu from "../../../components/RevenueDashboardComponents/DateMenu";
import ReportRevenueCard from "../../../components/RevenueDashboardComponents/ReportRevenueCard";
import ReportInventoryCard from "../../../components/RevenueDashboardComponents/ReportInventoryCard";
import ReportActivityMonitorCard from "../../../components/RevenueDashboardComponents/ReportActivityMonitorCard";
import RevenueDeliveryCard from "../../../components/RevenueDashboardComponents/RevenueDeliveryCard";
import ReportCustomerReviesCard from "../../../components/RevenueDashboardComponents/ReportCustomerReviesCard";
import CustomerMapLocation from "../../../components/RevenueDashboardComponents/CustomerMapLocation";
import RevenueUser from "../../../components/RevenueDashboardComponents/RevenueUser";
import { Collapse } from "reactstrap";
import { Calendar } from "react-calendar";
import PharmacyName from "../../../components/PharmacyName";
import DateHeader from "../../../components/DateHeader";
import { Input } from "reactstrap";

const ReportDashboard = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<Helmet>
				<title>Report Dashboard</title>
			</Helmet>

			<div className="col-md-9 middle">
				<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
					<div>
						<h6 className="mt-2 text-deep text-uppercase">Report Dashboard</h6>
						<DateHeader />
						<div className="d-flex">
							<BreadCrumb
								name="Report Dashboard"
								breadcrumb=""
								width="11.5rem"
								hasStyles={true}
							/>
						</div>
					</div>
					<PharmacyName />
				</div>

				<div className="mt-4 mx-md-3 mx-2 report">
					<DateMenu
						handleClick={handleClick}
						startDate={startDate}
						endDate={endDate}
					/>
					<Collapse isOpen={isOpen}>
						<div className="card border-0  datemenu p-4 shadow">
							<div className="d-lg-flex justify-content-center align-items-center">
								{/* <Calendar className="border-0 mx-lg-4" />
                  <Calendar className="border-0 mt-lg-0 mt-4" /> */}

								<Input
									className="order-number border-0 rounded-0"
									type="date"
									onChange={(e) => setStartDate(e.target.value)}
								/>
								<Input
									className="order-number border-0 rounded-0"
									type="date"
									onChange={(e) => setEndDate(e.target.value)}
								/>
							</div>
						</div>
					</Collapse>
					<div className="row gy-lg-0 gy-3 mt-4">
						<div className="col-lg-6">
							<ReportRevenueCard startDate={startDate} endDate={endDate} />
						</div>
						<div className="col-lg-6">
							<ReportInventoryCard />
						</div>
						<div className="col-lg-3">
							{/* <ReportActivityMonitorCard /> */}
						</div>
					</div>

					<div className="row gy-lg-0 gy-3 mt-4">
						<div className="col-lg-3">{/* <RevenueDeliveryCard /> */}</div>
						<div className="col-lg-3">{/* <ReportCustomerReviesCard /> */}</div>
						<div className="col-lg-6">{/* <CustomerMapLocation /> */}</div>
					</div>
					<div className="row mt-4 mb-4">
						<div className="col-lg-3">{/* <RevenueUser /> */}</div>
						<div className="col-lg-3"></div>
						<div className="col-lg-3"></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReportDashboard;
