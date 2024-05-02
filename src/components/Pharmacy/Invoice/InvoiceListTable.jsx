import React from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

import blueeye from "../../../assets/icons/svg/blueeye.svg";
import phonecall from "../../../assets/icons/svg/phonecall.svg";

import SearchBar from "../../SearchBar";
import Loader from "../../Loader";


const InvoiceListTable = ({ isLoading ,filteredData ,setSearchText }) => {
	const columns = [
		{
			name: "Invoice No.",
			selector: (row) => row?.invoice_number,
			minWidth: "200px",
		},
		// {
		// 	name: "Invoice ID",
		// 	selector: (row) => row.order_code,
		// },
		{
			name: "Customer name",
			selector: (row) => row?.customer_name === "" ?  "N/A": row?.customer_name,
			minWidth: "200px",

		},
		{
			name: "Payment Type",
			selector: (row) => row?.payment_type,
			minWidth: "200px",

		},
    {
      name: " Date",
      cell: (row) => (
        <span>
         {`${new Date(row.createdAt).getDate()}/${new Date(row.createdAt).getMonth() + 1}/${new Date(row.createdAt).getFullYear()}`}
        </span>
      ),
      minWidth: "200px",
    },
		{
			name: "Total Amount",
			selector: (row) => Number((row?.grand_total).toFixed(2)),
			minWidth: "200px",
		},

		{
			name: "Action",
			cell: ( {
        invoice_number ,
        order_code,
        createdAt,
        grand_total,
        customer_name,
        products_summary,
		payment_type,
        _id,
      },index) => (
				<span className="d-flex">
					<Link to="/pharmacy/invoices/invoice-details">
                              <img
                                src={blueeye}
                                alt=""
                                className="mx-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEyeClick(
                                  {
                                    invoice_number ,
                                    order_code,
                                    createdAt,
                                    grand_total,
                                    customer_name,
                                    products_summary,
									payment_type,
                                    _id,
                                  },
                                  index
                                )} />
                            </Link>
                            <Link to="/pharmacy/invoices/invoice-list/invoice-list-id">
                              <img
                                src={phonecall}
                                alt=""
                                className="mx-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => handlePhoneClick( {
                                    invoice_number ,
                                    order_code,
                                    createdAt,
                                    grand_total,
                                    customer_name,
                                    products_summary,
									payment_type,
                                    _id,
                                  },
                                  index)} />
                            </Link>
				</span>
			),
		},
	];


	const handlePhoneClick = (item, e) => {
		sessionStorage.setItem("eyeId", JSON.stringify(item));
	};
	const handleEyeClick = (item, e) => {
		sessionStorage.setItem("eyeId", JSON.stringify(item));
	};

	return (
		<div className="mx-3 card bg-white border-0">
			<div className=" ms-bg py-2 gy-md-0 gy-2">
				<div className=" my-0 text-white small d-flex">
					<span className="mx-2 text-nowrap">
						
					</span>
					<span>
						<SearchBar
							radius="8px"
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</span>
				</div>
			</div>
			<div className="table-responsive">
				{isLoading ? (
					<Loader />
				) : (
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                customStyles={customStyles}
                striped />
				)}
			</div>
			
		</div>
	);
};

export default InvoiceListTable;

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#4D44B5",
      color: "white",
      fontSize: "18px",
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