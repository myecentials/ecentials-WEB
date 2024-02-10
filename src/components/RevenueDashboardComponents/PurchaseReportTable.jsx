import React, { useEffect, useState } from "react";
import { useFetchAllInvoicesMutation } from '../../app/features/report/reportApiSlice';
import { Link } from "react-router-dom";
import Loader from "../Loader";
import DataTable from "react-data-table-component";


const PurchaseReportTable = ({ startDate, endDate }) => {
  const [allReviews, { data: response, isLoading, isError }] = useFetchAllInvoicesMutation();

  useEffect(() => {
    allReviews();
  }, []);
 
    
const returnedData = response?.data;
console.log('returned', returnedData);

const filteredData = returnedData ? returnedData.filter(row => {
  const rowDate = new Date(row.createdAt);
  if (startDate && endDate) {
    return rowDate >= startDate && rowDate <= endDate;
  } else if (startDate) {
    return rowDate >= startDate;
  } else if (endDate) {
    return rowDate <= endDate;
  }
  return true; 
}) : [];

console.log('filtered', filteredData)


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
    selector: (row) => new Date(row.createdAt).toLocaleDateString(),
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

    selector: (row) => row.customer_name || 'N/A',
  },
  {
    name: "ACTION ",
    sortable: true,
    minWidth: "200px",

    cell: (row) => (
          <Link
            to="/pharmacy/reports/sales-report/sales-report-details"
            className="border-0 px-3 py-1 small rounded-pill"
            style={{
              backgroundColor: "rgba(147, 193, 249, 0.15)",
              color: "#000000",
              padding:"5px 0",
              fontWeight:"500"
            }}
           >
            View Invoice
          </Link>
    )
  },
  
];

 
  return (
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
    
  );
};

export default PurchaseReportTable;

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