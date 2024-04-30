import React, { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
// import SideBar from "../../../components/SideBar";
import { Helmet } from "react-helmet";
// import { BsX } from "react-icons/bs";
// import CustomeNav from "../../../components/CustomeNav";
// import Navbar from "reactstrap";
import {
	Form,
	// FormFeedback,
	FormGroup,
	Input,
	Label,
	// Toast,
	// ToastBody,
	// ToastHeader,
} from "reactstrap";
import BreadOutlined from "../../../components/BreadOutlined";
// import Header from "../../../components/Header";
import { useEffect } from "react";
import axios from "../../../config/api/axios";
import { useNavigate } from "react-router-dom";
import PharmacyName from "../../../components/PharmacyName";
// import { select } from "d3";
import toast, { Toaster } from "react-hot-toast";
// import useAuth from "../../../hooks/useAuth";
// import Select from "react-select";
import DateHeader from "../../../components/DateHeader";
import {
	facility_id,
	setToken,
} from "../../../app/features/authSlice/authSlice";
import { useSelector } from "react-redux";

const EditProduct = () => {
	const token = useSelector(setToken);
	const facilityId = useSelector(facility_id);

	const [drugDetails, setDrugDetails] = useState([]);
	const [, setData] = useState([]);
	const [, setMyData] = useState([]);
	const [error] = useState(false);
	const [isLoading] = useState(false);
	const [errorMsg] = useState("");

	useEffect(() => {
		const productInfo = sessionStorage.getItem("productSelected");
		const newProduct = JSON.parse(productInfo);
		setDrugDetails(newProduct);
	}, []);

	// Check if expiry_date is a valid date
	const isValidDate =
		drugDetails.expiry_date &&
		!isNaN(new Date(drugDetails.expiry_date).getTime());

	// If it's a valid date, format it; otherwise, use an empty string
	const formattedExpiryDate = isValidDate
		? new Date(drugDetails.expiry_date).toISOString().split("T")[0]
		: "";

	

	const handleChange = (e) => {
		console.log(e.target.value);
		console.log(e.target.name);
		const name = e.target.name;
		const value =
			e.target.type === "checkbox"
				? e.target.checked
					? "NHIS"
					: "N/A"
				: e.target.type === "file"
				? e.target.files[0]
				: e.target.value;

		setDrugDetails((prev) => ({ ...prev, [name]: value }));
	};

	const navigate = useNavigate();

	const {
		total_stock,
		price,
		selling_price,
		expiry_date,
		nhis,
		discount,
		_id,
	} = drugDetails;
	const formData = new FormData();

	const handleClick = async () => {
		formData.append("total_stock", total_stock);
		formData.append("drug_id", _id);
		formData.append("price", price);
		formData.append("selling_price", selling_price);
		formData.append("expiry_date", expiry_date);
		formData.append("nhis", nhis);
		formData.append("discount", discount);
		
    const load =  toast.loading("Updating Drug...")
try{
  const myPromise =await  axios.post(
    "/pharmacy/drugs/update-drug-information",
    formData,
    {
      headers: {
        "auth-token": token,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if(myPromise?.data?.message === 'success'){
    toast.remove(load)
    toast.success("Drug Updated Successfully")
    setTimeout(()=>{
      navigate("/pharmacy/products");
    },1500)
  }
}catch(err){
  toast.remove(load)
  toast.error("An error occured")
console.log(err)
}		
		for (const [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}
		console.log(drugDetails);
	};

	useEffect(() => {
		axios
			.post(
				"/pharmacy/wholesaler/fetch-wholesalers",
				{
					facility_id: facilityId,
				},
				{
					headers: {
						"auth-token": token,
					},
				}
			)
			.then((res) => {
				setData(res.data.data);
			})
			.catch((err) => console.log(err));
	}, [facilityId, token]);

	useEffect(() => {
		axios
			.post(
				"/pharmacy/drugs",
				{
					store_id: facilityId,
				},
				{
					headers: {
						"auth-token": token,
					},
				}
			)
			.then((res) => setMyData(res.data.data))
			.catch((err) => console.log(err));
	}, [facilityId, token]);
	

	return (
		<>
			<Helmet>
				<title>Edit Products</title>
			</Helmet>

			<Toaster />

			<div className="col-md-9 middle">
				<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
					<div>
						<h6 className="mt-2 text-deep">PRODUCTS</h6>
						<DateHeader />
						<div className="d-flex">
							<BreadOutlined name="Products" breadcrumb="/pharmacy/products" />
							<BreadCrumb
								name="Edit Products"
								breadcrumb=""
								width="9rem"
								hasStyles={true}
							/>
						</div>
					</div>
					<PharmacyName />
				</div>

				<div className="text-deep mx-3 mt-4">
					Please add category, group, dosage, company name before adding
					medicine.
				</div>
				<div className="mx-md-3 mx-2">
					<div
						className="card border-0 pb-3 rounded"
						style={{ borderRadius: "10px" }}>
						<div className="ms-bg text-white py-2">
							<h6 className="mx-3">PRODUCT DETAILS</h6>
						</div>
						<div className="mx-md-4 my-5 text-deep">
							<div className="mx-3">
								<Form>
									{error ? <p className="error">{errorMsg}</p> : ""}
							
									<FormGroup>
										<Label className="small" htmlFor="name">
											<b>Medicine Name*</b>
										</Label>
										<Input
											id="name"
											name="name"
											type="text"
											onChange={handleChange}
											value={drugDetails.name}
											placeholder="Tablet"
											style={{ borderColor: "#C1BBEB" }}
											readOnly={true}
										/>
									</FormGroup>
									<FormGroup>
										<Label className="small" htmlFor="medicine_group">
											<b>Medicine Group*</b>
										</Label>
										<Input
											id="medicine_group"
											name="medicine_group"
											type="text"
											onChange={handleChange}
											value={drugDetails.medicine_group}
											placeholder="Tablet"
											style={{ borderColor: "#C1BBEB" }}
											readOnly={true}
										/>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="level">
											<b>Level Of Prescription*</b>
										</Label>
										<Input
											id="level"
											name="level"
											type="text"
											onChange={handleChange}
											value={drugDetails.level}
											placeholder="Tablet"
											style={{ borderColor: "#C1BBEB" }}
											readOnly={true}
										/>
									</FormGroup>


									<FormGroup>
										<Label className="small" htmlFor="dosage">
											<b>Dosage*</b>
										</Label>
										<Input
											id="dosage"
											name="dosage"
											type="text"
											onChange={handleChange}
											value={drugDetails.dosage}
											placeholder="Tablet"
											style={{ borderColor: "#C1BBEB" }}
											readOnly={true}
										/>
									</FormGroup>

									{/* <FormGroup>
										<Label className="small" htmlFor="manufacturer">
											<b>Supplier/Company Name*</b>
										</Label>
										<Input
											id="manufacturer"
											name="manufacturer"
											type="text"
											onChange={handleChange}
											alue={drugDetails.manufacturer}
											style={{ borderColor: "#C1BBEB" }}
											readOnly={true}
										/>
									
									</FormGroup> */}
									<FormGroup>
										<Label className="small" htmlFor="description">
											<b>Medicine Description*</b>
										</Label>
										<Input
											maxLength={2000}
											max={200}
											height={500}
											id="description"
											name="description"
											type="textarea"
											value={drugDetails.description}
											placeholder=""
											onChange={handleChange}
											style={{ borderColor: "#C1BBEB" }}
											readOnly={true}
										/>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="number">
											<b>Photo*</b>
										</Label>
										<div className="drug-photo">
											{drugDetails.image ? (
												<img
													src={drugDetails.image}
													alt=""
													className="img-fluid h-100 w-100"
												/>
											) : (
												<p className="small file_name">
													Drag and drop or click here to select image
												</p>
											)}
											{/* <input
                          type="file"
                          className="drug_file"
                          accept="image/*"
                          name="image"
                          // value={drugDetails.image}
                          onChange={handleChange}
                        /> */}
										</div>
									</FormGroup>

						

						
						<FormGroup>
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
								value={drugDetails?.ndc}
							/>
						</FormGroup>

						<FormGroup>
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
								value={drugDetails?.upc}
							/>
						</FormGroup>

						<FormGroup>
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
								value={drugDetails?.unii}
							/>
						</FormGroup>

						<FormGroup>
							<Label className="small" htmlFor="administration_instructions">
								<b>Administration Instructions</b>
							</Label>
							<Input
								id="administration_instructions"
								name="administration_instructions"
								type="text"
								placeholder=""
								style={{ borderColor: "#C1BBEB" }}
								readOnly={true}
								value={drugDetails?.administration_instructions}
							/>
						</FormGroup>

						<FormGroup>
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
								value={drugDetails?.active_ingredients}
							/>
						</FormGroup>




									<FormGroup>
										<Input
											id="nhis"
											name="nhis"
											type="checkbox"
											defaultValue={drugDetails.nhis === "NHIS" ? "NHIS" : "N/A"}
											onChange={handleChange}
                      checked ={drugDetails.nhis === "NHIS"}
											style={{ borderColor: "#C1BBEB" }}
										/>
										<Label className="small mx-2" htmlFor="nhis">
											<b>Accept NHIS</b>
										</Label>
									</FormGroup>
									<FormGroup>
										<Label className="small" htmlFor="expiry_date">
											<b>Expiry Date*</b>
										</Label>
										<Input
											id="expiry_date"
											name="expiry_date"
											type="date"
											// defaultValue={drugDetails.expiry_date}
											defaultValue={formattedExpiryDate}
											onChange={handleChange}
											style={{ borderColor: "#C1BBEB" }}
										/>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="discount">
											<b>Discount % </b>
										</Label>
										<Input
											id="discount"
											name="discount"
											type="number"
											onChange={handleChange}
											defaultValue={drugDetails.discount}
											placeholder=""
											style={{ borderColor: "#C1BBEB" }}
										/>
									</FormGroup>
									<FormGroup>
										<Label className="small" htmlFor="price">
											<b>Purchase Price </b>
										</Label>
										<Input
											id="price"
											name="price"
											type="number"
											onChange={handleChange}
											defaultValue={drugDetails.price}
											placeholder=""
											style={{ borderColor: "#C1BBEB" }}
										/>
									</FormGroup>
									<FormGroup>
										<Label className="small" htmlFor="selling_price">
											<b>Selling Price *</b>
										</Label>
										<Input
											id="selling_price"
											name="selling_price"
											type="number"
											placeholder="250"
											onChange={handleChange}
											defaultValue={drugDetails.selling_price}
											style={{ borderColor: "#C1BBEB" }}
										/>
									</FormGroup>
									<FormGroup>
										<Label className="small" htmlFor="total_stock">
											<b>Quantity </b>
										</Label>
										<Input
											id="total_stock"
											name="total_stock"
											type="number"
											onChange={handleChange}
											defaultValue={drugDetails.total_stock}
											style={{ borderColor: "#C1BBEB" }}
											min={1}
										/>
									</FormGroup>
								</Form>
							</div>
						</div>
						<div className="d-flex justify-content-end align-items-end mt-5">
							<button
								type="submit"
								className="ms-bg text-white rounded-pill px-4 mb-5 save py-2"
								onClick={handleClick}>
								{isLoading ? (
									<span className="spinner-border" role="status">
										<span className="sr-only">Loading...</span>
									</span>
								) : (
									"Submit"
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProduct;
