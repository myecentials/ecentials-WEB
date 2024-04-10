import jsPDF from "jspdf";
	/**
	 * The function `generatePDF` creates a PDF document containing a table with sales report data.
	 */
	export const exportToPDF = (filteredData , columnMapping,title ) => {
		const doc = new jsPDF();

		// Define the mapping between keys and display names
		// const columnMapping = {
		// 	createdAt: "Created Date",
		// 	customer_name: "Customer Name",
		// 	// delivery_date: "Delivery Date",
		// 	delivery_method: "Delivery Method",
		// 	// fulfilled: "Fulfilled",
		// 	grand_total: "Grand Total",
		// 	// invoice_number: "Invoice Number",
		// 	order_code: "Order Code",
		// 	// order_status: "Order Status",
		// 	// payment_status: "Payment Status",
		// 	// payment_type: "Payment Type"
		// };

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
		doc.save(`${title}.pdf`);
	};

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