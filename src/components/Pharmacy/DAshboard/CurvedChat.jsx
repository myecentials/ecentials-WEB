import React, { Component } from "react";
import "../../../assets/styles/dashboard.css";
import {
	AreaChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Area,
	// ReferenceLine,
	ResponsiveContainer,
} from "recharts";
import { connect } from "react-redux";

// import data from "../static/data.js";
import axios from "../../../config/api/axios";

class CurvedChat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props?.data,
		};
	}

	componentDidMount() {
		const { shopId, accessToken } = this.props;
		axios
			.post(
				"/pharmacy/sales/monthly-sales",
				{ store_id: shopId },
				{ headers: { "auth-token": accessToken } }
			)
			.then((res) => this.setState({ data: res.data.data }))
			// .then((res) => console.log( res.data.data ))
			.catch((err) => console.log(err));
	}

	render() {
		const data = [
			{
				month: "Jan",
				lastYear: 0,
				thisYear: 0,
			},
			{
				month: "Feb",
				lastYear: 0,
				thisYear: 0,
			},
			{
				month: "Mar",
				lastYear: 0,
				thisYear: 0,
			},
			{
				month: "Apr",
				lastYear: 0,
				thisYear: 0,
			},
			{
				month: "May",
				lastYear: 0,
				thisYear: 0,
			},
			{
				month: "Jun",
				lastYear: 0,
				thisYear: 0,
			},
			{
				month: "Jul",
				lastYear: 0,
				thisYear: 0,
			},
			{
				month: "Aug",
				lastYear: 0,
				thisYear: 0,
			},
			{
				month: "Sep",
				lastYear: 0,
				thisYear: 0,
			},
			{
				month: "Oct",
				lastYear: 0,
				thisYear: 0,
			},
			{
				month: "Nov",
				lastYear: 0,
				thisYear: 0,
			},
			{
				month: "Dec",
				lastYear: 0,
				thisYear: 0,
			},
		];

		this.state.data.forEach(({ name, sale }) => {
			data.forEach((item) => {
				if (item.month === name) {
					item.thisYear = sale;
				}
			});
		});

		// const CustomYAxisTick = (props) => {
		// 	const { x, y, payload } = props;
		// 	const value = payload.value / 1000;
		// 	const textColor = "#c1bbeb"; // custom color for tick labels
		// 	const textStyle = { fill: textColor };
		// 	return (
		// 		<text
		// 			x={x}
		// 			y={y}
		// 			dx={-20}
		// 			textAnchor="middle"
		// 			style={textStyle}>{`${value}k`}</text>
		// 	);
		// };

		const CustomYAxisTick = (props) => {
			const { x, y, payload } = props;
			let value = payload.value;
			let unit = '';
		
			// Determine the appropriate unit based on the value
			if (Math.abs(value) >= 1e12) {
				value /= 1e12;
				unit = 'T'; // Trillions
			} else if (Math.abs(value) >= 1e9) {
				value /= 1e9;
				unit = 'B'; // Billions
			} else if (Math.abs(value) >= 1e6) {
				value /= 1e6;
				unit = 'M'; // Millions
			} else if (Math.abs(value) >= 1e3) {
				value /= 1e3;
				unit = 'K'; // Thousands
			}
		
			// Customize text color for tick labels
			const textColor = "#c1bbeb";
			const textStyle = { fill: textColor };
		
			return (
				<text
					x={x}
					y={y}
					dx={-20}
					textAnchor="middle"
					style={textStyle}
				>{`${value}${unit}`}</text>
			);
		};
		

		return (
			<div
				className="mt-3 card chat border-0"
				style={{ borderRadius: "10px", height: "20rem" }}>
				<ResponsiveContainer>
					<AreaChart
						width={730}
						height={250}
						data={data}
						margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						<defs>
							<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#FB7D5B" stopOpacity={0.3} />
								<stop offset="95%" stopColor="#FB7D5B" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#FCC43E" stopOpacity={0.3} />
								<stop offset="95%" stopColor="#FCC43E" stopOpacity={0} />
							</linearGradient>
						</defs>
						<XAxis dataKey="month" tickLine={false} axisLine={false} />
						<YAxis
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => value / 1000}
							tick={CustomYAxisTick}
						/>
						<CartesianGrid stroke="#c1bbeb" horizontal={false} />
						<Tooltip />

						{/* <ReferenceLine
              x="Sep"
              stroke="#000"
              strokeDasharray="3 3"
              height={0}
            /> */}

						<Area
							type="monotone"
							dataKey="thisYear"
							stroke="#FB7D5B"
							strokeWidth={3}
							fillOpacity={10}
							fill="url(#colorUv)"
							name="This Year"
							animationBegin={1500}
							animationDuration={1000}
							animationEasing="ease-in"
						/>
						<Area
							type="monotone"
							dataKey="lastYear"
							stroke="#FCC42E"
							strokeWidth={3}
							fillOpacity={10}
							fill="url(#colorPv)"
							name="Last Year"
							animationBegin={1000}
							animationDuration={2000}
							animationEasing="ease-in"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	shopId: state?.auth?.hasPharmacy?.data?.[0]?._id,
	accessToken: state?.auth?.results?.token,
});

export default connect(mapStateToProps)(CurvedChat);

// import React, { Component } from "react";
// import "../assets/styles/dashboard.css";
// import {
//   AreaChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Area,
//   ReferenceLine,
//   ResponsiveContainer,
// } from "recharts";

// // import data from "../static/data.js";
// import axios from "../config/api/axios";

// class CurvedChat extends Component {
//   constructor(props) {
//     let id = sessionStorage.getItem("facility_id");
//     let token = sessionStorage.getItem("userToken");
//     super(props);
//     this.state = {
//       data: props?.data,
//       shop_id: id,
//       accessToken: token,
//     };
//   }

//   componentDidMount() {
//     axios
//       .post(
//         "/pharmacy/sales/monthly-sales",
//         { store_id: this.state.shop_id },
//         { headers: { "auth-token": this.state.accessToken } }
//       )
//       .then((res) => this.setState({ data: res.data.data }))
//       .catch((err) => console.log(err));
//   }

//   render() {
//     const data = [
//       {
//         month: "Jan",
//         lastYear: 0,
//         thisYear: 0,
//       },
//       {
//         month: "Feb",
//         lastYear: 0,
//         thisYear: 0,
//       },
//       {
//         month: "Mar",
//         lastYear: 0,
//         thisYear: 0,
//       },
//       {
//         month: "Apr",
//         lastYear: 0,
//         thisYear: 0,
//       },
//       {
//         month: "May",
//         lastYear: 0,
//         thisYear: 0,
//       },
//       {
//         month: "Jun",
//         lastYear: 0,
//         thisYear: 0,
//       },
//       {
//         month: "Jul",
//         lastYear: 0,
//         thisYear: 0,
//       },
//       {
//         month: "Aug",
//         lastYear: 0,
//         thisYear: 0,
//       },
//       {
//         month: "Sep",
//         lastYear: 0,
//         thisYear: 0,
//       },
//       {
//         month: "Oct",
//         lastYear: 0,
//         thisYear: 0,
//       },
//       {
//         month: "Nov",
//         lastYear: 0,
//         thisYear: 0,
//       },
//       {
//         month: "Dec",
//         lastYear: 0,
//         thisYear: 0,
//       },
//     ];

//     this.state.data.forEach(({ name, sale }) => {
//       data.forEach((item) => {
//         if (item.month === name) {
//           item.thisYear = sale;
//         }
//       });
//     });

//     const CustomYAxisTick = (props) => {
//       const { x, y, payload } = props;
//       const value = payload.value / 1000;
//       const textColor = "#c1bbeb"; // custom color for tick labels
//       const textStyle = { fill: textColor };
//       return (
//         <text
//           x={x}
//           y={y}
//           dx={-20}
//           textAnchor="middle"
//           style={textStyle}
//         >{`${value}k`}</text>
//       );
//     };

//     return (
//       <div
//         className="mt-3 card chat border-0"
//         style={{ borderRadius: "10px", height: "20rem" }}
//       >
//         <ResponsiveContainer>
//           <AreaChart
//             width={730}
//             height={250}
//             data={data}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//           >
//             <defs>
//               <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#FB7D5B" stopOpacity={0.3} />
//                 <stop offset="95%" stopColor="#FB7D5B" stopOpacity={0} />
//               </linearGradient>
//               <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#FCC43E" stopOpacity={0.3} />
//                 <stop offset="95%" stopColor="#FCC43E" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <XAxis dataKey="month" tickLine={false} axisLine={false} />
//             <YAxis
//               tickLine={false}
//               axisLine={false}
//               tickFormatter={(value) => value / 1000}
//               tick={CustomYAxisTick}
//             />
//             <CartesianGrid stroke="#c1bbeb" horizontal={false} />
//             <Tooltip />

//             {/* <ReferenceLine
//               x="Sep"
//               stroke="#000"
//               strokeDasharray="3 3"
//               height={0}
//             /> */}

//             <Area
//               type="monotone"
//               dataKey="thisYear"
//               stroke="#FB7D5B"
//               strokeWidth={3}
//               fillOpacity={10}
//               fill="url(#colorUv)"
//               name="This Year"
//               animationBegin={1500}
//               animationDuration={1000}
//               animationEasing="ease-in"
//             />
//             <Area
//               type="monotone"
//               dataKey="lastYear"
//               stroke="#FCC42E"
//               strokeWidth={3}
//               fillOpacity={10}
//               fill="url(#colorPv)"
//               name="Last Year"
//               animationBegin={1000}
//               animationDuration={2000}
//               animationEasing="ease-in"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }
// }

// export default CurvedChat;
