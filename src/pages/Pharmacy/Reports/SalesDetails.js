import React, { useState, useEffect } from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
import { Helmet } from "react-helmet";
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import BreadOutlined from "../../../components/BreadOutlined";
import PharmacyName from "../../../components/PharmacyName";
import Loader from "../../../components/Loader";
import { useFetchAllReviewsMutation } from "../../../app/features/report/reportApiSlice";
import DataTable from "react-data-table-component";
import { pharmacyName } from "../../../app/features/authSlice/authSlice";

const SalesDetails = () => {	

 	const [allReviews, {data: response, isLoading, isError}] = useFetchAllReviewsMutation();	
 	const [data, setData] = useState([])



useEffect(() => {
	allReviews();
	
}, []);


	const columns = [
		{
			name: "Product Name",
			sortable: true,
			minWidth: "200px",
			selector: (row) => row.products_summary?.drug_name,
		},
		{
			name: "Product Image",
			minWidth: "200px",

			cell: (row) => (
				<span className="py-3">
					<img
						src={row.products_summary?.drug_image}
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
			selector: (row) => row.products_summary?.quantity,
		},
		{
			name: "Price (GHC)",
			sortable: true,
			minWidth: "200px",

			selector: (row) => row.products_summary?.prize,
		},
		{
			name: "Discount Type",
			sortable: true,
			minWidth: "200px",

			selector: (row) => row.products_summary?.nhis,
		},
		{
			name: "Discount",
			sortable: true,
			minWidth: "200px",

			selector: (row) => row.products_summary?.discount,
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
                              <BreadCrumb
                                name="Report Dashboard"
                                breadcrumb="/orders"
                                width="11.5rem"
                              />
                             <BreadCrumb
                                name="Sales Report"
                                breadcrumb="/orders"
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
											value={data?.invoice_number || 'hh'}
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
											value={ ''}
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
											value={''}
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
											value={'N/A'}
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
									data=''
									customStyles={customStyles}
                                    pagination
									striped		
                                    fixedHeader							
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