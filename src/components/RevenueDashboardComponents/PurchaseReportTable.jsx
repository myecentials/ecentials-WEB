import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useFetchAllInvoicesMutation } from '../../app/features/report/reportApiSlice';
import { Link } from "react-router-dom";
import Loader from "../Loader";
import DataTable from "react-data-table-component";


const PurchaseReportTable = () => {
  const [allReviews, { data: response, isLoading, isError }] = useFetchAllInvoicesMutation();

  useEffect(() => {
    allReviews();
  }, []);
 
    
const returnedData = response?.data;
console.log(returnedData);

const columns = [
  {
    name: "INVOICE ID",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.products_summary?.drug_name,
  },

  {
    name: "CREATED DATE",
    sortable: true,
    minWidth: "100px",
    selector: (row) => row.products_summary?.quantity,
  },
  {
    name: "TOTAL AMOUNT (GHC)",
    sortable: true,
    minWidth: "200px",

    selector: (row) => row.products_summary?.prize,
  },
  {
    name: "CUSTOMER NAME",
    sortable: true,
    minWidth: "200px",

    selector: (row) => row.products_summary?.nhis,
  },
  {
    name: "ACTION ",
    sortable: true,
    minWidth: "200px",

    selector: (row) => row.products_summary?.discount,
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
									data=''
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