import React, { useEffect, useState, useCallback } from "react";
import { useFetchAllInvoicesMutation } from "../../../app/features/report/reportApiSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
// import autoTable from 'jspdf-autotable'
import { facility_id } from "../../../app/features/authSlice/authSlice";
import { useSelector } from "react-redux";

const SalesReportTable = ({ startDate, endDate, setParsedData, setTotal }) => {
	const [allReviews] = useFetchAllInvoicesMutation();
	const facilityId = useSelector(facility_id);
	const navigate = useNavigate();

	const [filteredData, setFilteredData] = useState([]);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await allReviews({ store_id: facilityId }).unwrap(); // Assuming this fetches data
			console.log(response);
			setFilteredData(response.data);
			setParsedData(response.data);
			setData(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	}, [allReviews, facilityId, setParsedData]);

	// Handle asynchronous API data and filtering
	useEffect(() => {
		fetchData();
	}, [allReviews, fetchData, setParsedData]);

	const handleTotal = useCallback(
		(parsedData) => {
			let totalPrice = 0;
			for (let i = 0; i < parsedData.length; i++) {
				totalPrice += parseFloat(parsedData[i]?.grand_total.toFixed(2));
			}

			
				setTotal((prev) => totalPrice);
				console.log("Total price:", totalPrice);
			
		},
		[ setTotal]
	);

	useEffect(() => {
		if (startDate !== "" && endDate !== "") {
			const newData = data?.filter((item) => {
				const created = new Date(item.createdAt);
				const start = new Date(startDate);
				const end = new Date(endDate);
				return created >= start && created <= end;
			});
			setFilteredData((prev) => newData);
			setParsedData((prev) => newData);
			handleTotal(newData);
		} else if (startDate !== "") {
			const newData = data.filter((item) => {
				return new Date(item.createdAt) >= new Date(startDate);
			});
			setFilteredData((prev) => newData);
			setParsedData((prev) => newData);
			handleTotal(newData);
		} else if (endDate !== "") {
			const newData = data.filter((item) => {
				return new Date(item.createdAt) <= new Date(endDate);
			});
			setFilteredData((prev) => newData);
			setParsedData((prev) => newData);
			handleTotal(newData);
		} else {
			setFilteredData((prev) => data);
			setParsedData((prev) => data);
			handleTotal(data);
		}
	}, [startDate, endDate, data, setParsedData, handleTotal]);

	/**
	 * The function `handleSaleChosen` stores selected sale items in session storage and navigates to a
	 * sales report details page in a React application.
	 */
	const handleSaleChosen = (items) => {
		console.log(items); // Optional logging for debugging

		try {
			const itemsString = JSON.stringify(items);
			sessionStorage.setItem("saleChosen", itemsString);
			navigate("/pharmacy/reports/sales-report/sales-report-details");
		} catch (error) {
			console.error("Error storing sale items:", error);
			// Handle storage error gracefully, e.g., show an error message to the user
		}
	};

	const columns = [
		{
			name: "INVOICE ID",
			sortable: true,
			minWidth: "200px",
			selector: (row) => row.order_code,
		},

		{
			name: "CREATED DATE",
			sortable: true,
			minWidth: "100px",
			selector: (row) =>
				new Date(row.createdAt).toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
					year: "numeric",
				}),
		},
		{
			name: "TOTAL AMOUNT (GHC)",
			sortable: true,
			minWidth: "200px",

			selector: (row) => row.grand_total.toFixed(2),
		},
		{
			name: "CUSTOMER NAME",
			sortable: true,
			minWidth: "200px",

			selector: (row) => row.customer_name || "N/A",
		},
		{
			name: "ACTION ",
			sortable: true,
			minWidth: "200px",

			cell: (row) => (
				<span
					onClick={() => handleSaleChosen(row)}
					className="border-0 px-3 py-1 small rounded-pill"
					style={{
						backgroundColor: "rgba(147, 193, 249, 0.15)",
						color: "#000000",
						padding: "5px 0",
						fontWeight: "500",
					}}>
					View Invoice
				</span>
			),
		},
	];

/**
 * The `formatDate` function takes an ISO date string as input and returns a formatted date in the "MMM
 * DD, YYYY" format.
 * @returns The `formatDate` function takes an ISO date string as input, converts it to a Date object,
 * and then returns a formatted date string in the format "MMM D, YYYY" (e.g., "Jan 1, 2022").
 */
	const formatDate = (isoDate) => {
		const date = new Date(isoDate);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	/**
	 * The function `generatePDF` creates a PDF document containing a table with sales report data.
	 */
	const generatePDF = () => {
		const doc = new jsPDF();

		// Define the mapping between keys and display names
		const columnMapping = {
			createdAt: "Created Date",
			customer_name: "Customer Name",
			// delivery_date: "Delivery Date",
			delivery_method: "Delivery Method",
			// fulfilled: "Fulfilled",
			grand_total: "Grand Total",
			// invoice_number: "Invoice Number",
			order_code: "Order Code",
			// order_status: "Order Status",
			// payment_status: "Payment Status",
			// payment_type: "Payment Type"
		};

		// Define table columns using display names from the mapping
		const tableColumn = Object.values(columnMapping);

		// Map the data to the table rows using the mapping
		// const tableRows = filteredData?.map(item => {
		//   return Object.keys(columnMapping).map(key => item[key]);
		// });
		const tableRows = filteredData?.map((item) => {
			return Object.keys(columnMapping).map((key) => {
				// Convert createdAt property to human-readable format
				if (key === "createdAt") {
					return formatDate(item[key]);
				}
				return item[key];
			});
		});

		// Add table to the document
		doc.autoTable({
			head: [tableColumn],
			body: tableRows,
		});

		// Save the document
		doc.save("SalesReport.pdf");
	};

	return (
		<>
			<div className="mt-4 mx-3">
				<div className="card border-0">
					<div className="d-md-flex justify-content-between align-items-center m-3">
						<div className="d-flex">
							<div>
								<h6 className="text-deep">Sales Report</h6>
								<p className="gray-text small">More than 400+ new reviews</p>
							</div>
						</div>
						<div className="d-flex">
							<button className="btn-refresh" onClick={fetchData}>
								Refresh{" "}
							</button>
							<button className="btn-export" onClick={generatePDF}>
								Export to pdf
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row mt-4">
				<div className="mt-4">
					<div className="mx-3">
						{isLoading ? (
							<Loader />
						) : (
							<DataTable
								columns={columns}
								data={filteredData}
								customStyles={customStyles}
								pagination
								striped
								fixedHeader
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default SalesReportTable;

const customStyles = {
	headRow: {
		style: {
			backgroundColor: "#4D44B5",
			color: "white",
			fontSize: "15px",
			fontWeight: 800,
		},
	},
	cells: {
		style: {
			fontSize: "16px",
			fontWeight: 500,
		},
	},
};
