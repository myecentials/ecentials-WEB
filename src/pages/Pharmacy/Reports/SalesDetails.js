import React, { useState, useEffect } from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
import { Helmet } from "react-helmet";
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import BreadOutlined from "../../../components/BreadOutlined";
import PharmacyName from "../../../components/PharmacyName";
import Loader from "../../../components/Loader";
import DataTable from "react-data-table-component";

const SalesDetails = () => {	
 	const [data, setData] = useState([])
 	const [products, setProducts] = useState([])
	const [isLoading ,setIsLoading] =useState(true)

	
	useEffect(() => {
		const retrieveStoredItems = async () => {
		  try {
			const storedItemsString = sessionStorage.getItem("saleChosen");
			const storedItems = storedItemsString ? JSON.parse(storedItemsString) : []; // Handle missing or invalid data
	  
			setData(storedItems);
			setProducts(storedItems?.products_summary);
			setIsLoading(false);
		  } catch (error) {
			console.error("Error retrieving sale items:", error);
			// Handle retrieval error gracefully, e.g., show an error message or indicate loading failure
		  }
		};
	  
		retrieveStoredItems();
	  }, []);

	const columns = [
		
		{
			name: "Product Name",
			sortable: true,
			minWidth: "200px",
			selector: (row) => row?.drug_name,
		},
		{
			name: "Product Image",
			minWidth: "200px",

			cell: (row) => (
				<span className="py-3">
					<img
						src={row?.drug_image}
						alt=""
						className="img-fluid d-block rounded"
						style={{
							width: "5rem",
							height: "3rem",
							aspectRatio: "3 / 2",
							objectFit: "contain",
							mixBlendMode: "darken",
							pointerEvents: "none",
						}}
					/>
				</span>
			),
		},
		{
			name: "Quantity",
			sortable: true,
			minWidth: "100px",
			selector: (row) => row?.quantity,
		},
		{
			name: "Price (GHC)",
			sortable: true,
			minWidth: "200px",

			selector: (row) => row?.prize,
		},
		{
			name: "Discount Type",
			sortable: true,
			minWidth: "200px",

			selector: (row) => row?.nhis,
		},
		{
			name: "Discount",
			sortable: true,
			minWidth: "200px",

			selector: (row) => row?.discount,
		},
		
	];
	

	return (
		<>
			<Helmet>
				<title>Sales Report</title>
			</Helmet>
			
				<div className="col-md-9 middle">
					<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
						<div>
							<h6 className="mt-2 text-deep">Sales Report</h6>
							<DateHeader />
							<div className="d-flex ">
                              <BreadOutlined
                                name="Report Dashboard"
                                breadcrumb="/pharmacy/reports/sales-report"
                                width="11.5rem"
                              />
                             <BreadCrumb
                                name="Sales Report"
                                breadcrumb="/pharmacy/reports/sales-report/sales-report-details"
                                hasStyles={true}
                                width="10rem"
                                />
							</div>
						</div>
						<PharmacyName />
					</div>

					<div className="row mt-4">
						<div className="col-md-8">
							<Form>
								
								<FormGroup row className="mx-2">
									<Label
										htmlFor="invoice-id"
										sm={3}
										className="text-nowrap text-purple">
										INVOICE ID:
									</Label>
									<Col className="w-category">
										<Input
											id="category"
											className="f-border"
											name="category"
											value={data?.invoice_number || ''}
											placeholder="1052"
											type="text"
											style={{ borderColor: "#C1BBEB" }}
										/>
									</Col>
								</FormGroup>
								<FormGroup row className="mx-2">
									<Label
										htmlFor="name"
										sm={3}
										className="text-nowrap text-purple">
										CREATED DATE:
									</Label>
									<Col className="w-category">
										<Input
											id="category"
											className="f-border"
											name="category"
											placeholder="Ashanti"
											type="text"
											value={new Date(data.createdAt).toLocaleDateString() || ''}
											style={{ borderColor: "#C1BBEB" }}
										/>
									</Col>
								</FormGroup>
								<FormGroup row className="mx-2">
									<Label
										htmlFor="name"
										sm={3}
										className="text-nowrap text-purple">
										TOTAL AMOUNT:
									</Label>
									<Col className="w-category">
										<Input
											id="category"
											className="f-border"
											name="category"
											placeholder="ORD-2457"
											value={data?.grand_total || ''}
											type="text"
											style={{ borderColor: "#C1BBEB" }}
										/>
									</Col>
								</FormGroup>
                                <FormGroup row className="mx-2">
									<Label
										htmlFor="name"
										sm={3}
										className="text-nowrap text-purple">
										CUSTOMER NAME:
									</Label>
									<Col className="w-category">
										<Input
											id="category"
											className="f-border"
											name="category"
											placeholder="Ashanti"
											type="text"
											value={data?.customer_name || 'N/A'}
											style={{ borderColor: "#C1BBEB" }}
										/>
									</Col>
								</FormGroup>
							</Form>
						</div>
						{/*  */}
						<div className="col-md-4"></div>
					</div>
					<div className="mt-4">
						<div className="mx-3">
							{isLoading ? (
								<Loader />
							) : (
								<DataTable
									columns={columns}
									data={products}
									customStyles={customStyles}
                                    pagination
									striped		
                                    // fixedHeader							
								/>
							)}
						</div>
					</div>
					{/* End of Table */}
				</div>
		</>
	);
};


export default SalesDetails;

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