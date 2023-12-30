import BarcodeReader from "react-barcode-reader";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Form, Col, FormGroup, Input, Label } from "reactstrap";
import Select from "react-select";
import axiosCall from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import BreadCrumb from "../../../components/BreadCrumb";
import SideBar from "../../../components/SideBar";
import CustomeNav from "../../../components/CustomeNav";
import BreadOutlined from "../../../components/BreadOutlined";
import DateHeader from "../../../components/DateHeader";
import Header from "../../../components/Header";
import PharmacyName from "../../../components/PharmacyName";
import axios from "../../../config/api/axios";
import drug from "../../../static/drugs.json";
import dustbin from "../../../assets/icons/svg/dustbin.svg";

import { toast, Toaster } from "react-hot-toast";
import {
	facility_id,
	setToken,
} from "../../../app/features/authSlice/authSlice";
import { Button } from "../../../stories/Button";

const tableStyle = {
	borderCollapse: "collapse",
	width: "95%",
	margin: "10px",
};

const cellStyle = {
	border: "1px solid #dddddd",
	textAlign: "left",
	padding: "8px",
};

const headerStyle = {
	backgroundColor: "#f2f2f2",
};

const initialProducts = [
	{
		name: "Product A",
		price: 20.0,
		manufacturer: "Manufacturer X",
		barcode: "CNB4L420K8",
		image: "",
	},
	{
		name: "Product B",
		price: 15.0,
		manufacturer: "Manufacturer Y",
		barcode: "B11",
		image: "",
	},
	{
		name: "Product C",
		price: 20.0,
		manufacturer: "Manufacturer XX",
		barcode: "C11",
		image: "",
	},
	{
		name: "Product D",
		price: 15.0,
		manufacturer: "Manufacturer YY",
		barcode: "D11",
		image: "",
	},
];

const BarcodeScan = () => {
	const [result, setResult] = useState("");
	const [products, setProducts] = useState(initialProducts);
	const [productsSelected, setProductsSelected] = useState({});

	const handleScanResult = () => {
		if (result === "") {
			console.log("Default State");
		} else {
			const newData = initialProducts.filter((row) =>
				row.barcode.includes(result)
			);
			console.log(newData);
			setProductsSelected(newData);
		}
	};

	const handleScan = (data) => {
		setResult(data);
	};

	const handleError = (err) => {
		console.error(err);
	};

	const handleRemove = (index) => {
		const updatedProducts = [...products];
		updatedProducts.splice(index, 1);
		setProducts(updatedProducts);
	};
	return (
		<>
			<Helmet>
				<title>Add Products</title>
			</Helmet>
			<div className="col-md-9 middle">
				<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
					<div>
						<h6 className="mt-2 text-deep">BARCODE SCAN</h6>
						<Toaster />
						<DateHeader />
						<div className="d-flex">
							<BreadOutlined name="Products" breadcrumb="/pharmacy/products" />
							<BreadCrumb
								name="Scan Code"
								breadcrumb="/pharmacy/products/barcode-scan"
								width="9rem"
								hasStyles={true}
							/>
						</div>
					</div>
					<PharmacyName />
				</div>
				<Toaster />

				<BarcodeReader onError={handleError} onScan={handleScan} />
				<p>{result}</p>

				<div className=" bg-white mx-5 text-deep mb-4">
        <div className="ms-bg text-white p-4 d-flex justify-content-between align-items-center">

					<h3>Add Drug</h3>

        </div>
					<Form className="p-4">
							<FormGroup>
								<Label className="my-1 mx-2" htmlFor="barcode">
									<b>Barcode:</b>
								</Label>
								<Input
									id="barcode"
									name="barcode"
									type="input"
									defaultValue={result}
									style={{ borderColor: "#C1BBEB", height: "30px" }}
									onChange={handleScanResult}
                  readOnly={true}

								/>
							</FormGroup>
							<FormGroup>
								<Label className="small" htmlFor="name">
									<b>Name:</b>
								</Label>
								<Input
									id="name"
									name="name"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup>

							<FormGroup>
								<Label className="small" htmlFor="medicine_group">
									<b>Medicine Group :</b>
								</Label>
								<Input
									id="medicine_group"
									name="medicine_group"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup>
              <FormGroup>
								<Label className="small" htmlFor="purpose">
									<b>Purpose</b>
								</Label>
								<Input
									id="purpose"
									name="purpose"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup>
              <FormGroup>
								<Label className="small" htmlFor="manufacturer">
									<b>Manufacturer</b>
								</Label>
								<Input
									id="manufacturer"
									name="manufacturer"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup>

              <FormGroup>
							<Label className="small" htmlFor="number">
								<b> Image:</b>
							</Label>
							<div className="drug-photo">
								{productsSelected.image ? (
									<img
										src={URL.createObjectURL(productsSelected.image)}
										alt=""
										className="img-fluid h-100 w-100"
										style={{
											aspectRatio: "3 / 2",
											objectFit: "contain",
											mixBlendMode: "darken",
											pointerEvents: "none",
										}}
                    readOnly={true}
									/>
								) : (
									<p className="small file_name">Drug Image</p>
								)}
								{/* <input
									type="file"
									className="drug_file"
									accept="image/*"
									name="picture"
                  readOnly={true}
									// value={drugDetails.picture}
								/> */}
							</div>
						</FormGroup>
            <FormGroup>
								<Label className="small" htmlFor="nhis">
									<b>Accept NHIS* </b>
								</Label>
								<Input
									id="nhis"
									name="nhis"
									type="checkbox"
									placeholder=""
									style={{ borderColor: "#C1BBEB" , marginLeft: "20px"}}
									// readOnly={true}
								/>
							</FormGroup>
							<FormGroup>
								<Label className="small" htmlFor="total_stock">
									<b>Total Stock *</b>
								</Label>
								<Input
									id="total_stock"
									name="total_stock"
									type="number"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									// readOnly={true}
                  min={1}

								/>
							</FormGroup>

							<FormGroup>
								<Label className="small" htmlFor="discount">
									<b>Discount*</b>
								</Label>
								<Input
									id="discount"
									name="discount"
									type="number"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									// readOnly={true}
                  min={0}

								/>
							</FormGroup>

						

							<FormGroup>
								<Label className="small" htmlFor="expiry_date">
									<b>Expiry Date *</b>
								</Label>
								<Input
									id="expiry_date"
									name="expiry_date"
									type="date"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									// readOnly={true}
								/>
							</FormGroup>

						
							<FormGroup>
								<Label className="small" htmlFor="selling_price">
									<b>Selling Price*</b>
								</Label>
								<Input
									id="selling_price"
									name="selling_price"
									type="number"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									// readOnly={true}
								/>
							</FormGroup>

							<FormGroup>
								<Label className="small" htmlFor="price">
									<b>Price*</b>
								</Label>
								<Input
									id="price"
									name="price"
									type="number"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									// readOnly={true}
                  min={0}
								/>
							</FormGroup>

							{/* <FormGroup>
								<Label className="small" htmlFor="description">
									<b>Medicine Description</b>
								</Label>
								<Input
									maxLength={2000}
									max={200}
									height={500}
									id="description"
									name="description"
									type="textarea"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

							{/* <FormGroup>
								<Label className="small" htmlFor="level">
									<b>Level</b>
								</Label>
								<Input
									id="level"
									name="level"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

							{/* <FormGroup>
								<Label className="small" htmlFor="dosage">
									<b>Dosage</b>
								</Label>
								<Input
									id="dosage"
									name="dosage"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

							{/* <FormGroup>
								<Label className="small" htmlFor="product_ndc">
									<b>Product NDC</b>
								</Label>
								<Input
									id="product_ndc"
									name="product_ndc"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

						
							{/* <FormGroup>
								<Label className="small" htmlFor="upc">
									<b>UPC</b>
								</Label>
								<Input
									id="upc"
									name="upc"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

							{/* <FormGroup>
								<Label className="small" htmlFor="unii">
									<b>UNII</b>
								</Label>
								<Input
									id="unii"
									name="unii"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

							{/* <FormGroup>
								<Label className="small" htmlFor="adminstration_instructions">
									<b>Administration Instructions</b>
								</Label>
								<Input
									id="adminstration_instructions"
									name="adminstration_instructions"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}

							{/* <FormGroup>
								<Label className="small" htmlFor="active_ingredient">
									<b>Active Ingredient</b>
								</Label>
								<Input
									id="active_ingredient"
									name="active_ingredient"
									type="text"
									placeholder=""
									style={{ borderColor: "#C1BBEB" }}
									readOnly={true}
								/>
							</FormGroup> */}
						

					
					</Form>

					<button
						className="btn btn-primary px-3 mx-3"
						style={{ color: "#FFFFFF" }}>
						Add Drug
					</button>
				</div>
			</div>
		</>
	);
};

export default BarcodeScan;

// import React, { Component } from 'react'
// import BarcodeReader from 'react-barcode-reader'

// class BarCodeScan extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       result: 'No result',
//     }

//     this.handleScan = this.handleScan.bind(this)
//   }
//   handleScan(data){
//     this.setState({
//       result: data,
//     })
//   }
//   handleError(err){
//     console.error(err)
//   }
//   render(){

//     return(
//       <div>
//         <BarcodeReader
//           onError={this.handleError}
//           onScan={this.handleScan}
//           />
//         <p>{this.state.result}</p>
//       </div>
//     )
//   }
// }
