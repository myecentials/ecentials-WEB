import React from "react";
import { useState, useEffect } from "react";
import NetIncomeCard from "./NetIncomeCard";
import RevenueCardBottom from "./RevenueCardBottom";
import {
	useFetchRevenueMutation,
	useFetchFixedRevenueMutation,
} from "../../app/features/report/reportApiSlice";
import RevenueCardHeader from "./RevenueCardHeader";
import RevenueLineChart from "./RevenueLineChart";
import MoreMenu from "./MoreMenu";
import { facility_id } from "../../app/features/authSlice/authSlice";
import { useSelector } from "react-redux";
// import data from "./../../static/revenuedata";

const ReportRevenueCard = ({ startDate, endDate }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [income, setIncome] = useState(null);
	const facilityId = useSelector(facility_id);
	const [fetchRevenue] = useFetchRevenueMutation();
	const [fetchFixedRevenue] = useFetchFixedRevenueMutation();
	const [details, setDetails] = useState([]);
	const [fdetails, setFDetails] = useState([]);

	useEffect(() => {

    
 
		const options = { month: "short", day: "numeric" };
		const updatedArray = details?.map((obj) => {
			return {
				...obj, // Spread the original object to retain its other properties
				startDate: new Date(obj.startDate).toLocaleDateString("en-US", options), // Modify the specific key value
				endDate: new Date(obj.endDate).toLocaleDateString("en-US", options), // Modify the specific key value
			};
		});
		console.log("Details after", updatedArray);
		setFDetails((prev) => updatedArray);
	}, [details, endDate, startDate]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let result;

				if (startDate !== "" && endDate !== "") {
					result = await fetchFixedRevenue({ store_id: facilityId ,start_date :new Date(startDate).toISOString() ,end_date :new Date(endDate).toISOString()});
				} else {
					result = await fetchRevenue(facilityId);
				}
				console.log("Report revenue", result);

				console.log("Details before", result.data.details);

				setIncome(result.data);
				setDetails(result.data.details);
			} catch (error) {
				console.error("Error fetching data", error);
			}
		};

		fetchData();
	}, [endDate, facilityId, fetchFixedRevenue, fetchRevenue, startDate]);

	console.log("income", income);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className="card shadow bg-white border-0 report_container__height ">
			<RevenueCardHeader
				header="Revenue"
				subheader="Report Center"
				handleClick={handleClick}
			/>
			<div className="d-flex mx-4 align-items-center">
				<span className="gray-text small">REVENUE</span>
				<span className="mx-2" style={{ fontSize: "1.2rem" }}>
					{income?.net_income}{" "}
				</span>
				{/* <span className="gray-text small">-0.8%</span> */}
			</div>
			<div className="revenue_body mx-3">
				<MoreMenu isOpen={isOpen} />
				<div className="row gy-sm-0 gy-3">
					<div className="col-sm-7 " style={{ height: "200px" }}>
						<RevenueLineChart data={fdetails} />
					</div>
					<div className="col-sm-5">
						<div className="d-flex align-items-center flex-column">
							<NetIncomeCard
								header="Net Income"
								// text={`${80}%`}
								trailColor="rgba(255, 255, 255, 0.3)"
								pathColor="#ffffff"
								textColor="#ffffff"
								amount={income?.net_income}
								value={100}
							/>
							{/* <NetIncomeCard
                border={true}
                header="Average Spend"
                text={`${20}%`}
                trailColor="rgba(0, 0, 0, 0.1)"
                pathColor="#f15744"
                textColor="#000000"
                amount="2,000,000"
                value={20}
              /> */}
						</div>
					</div>
				</div>
			</div>

			<RevenueCardBottom content="SEE DETAILS" link="" />
		</div>
	);
};

export default ReportRevenueCard;
