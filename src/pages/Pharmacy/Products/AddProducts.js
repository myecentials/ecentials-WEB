import React, { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import { Form, FormGroup, Input, Label } from "reactstrap";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import axiosCall from "axios";
import { Link ,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

import BreadCrumb from "../../../components/BreadCrumb";
// import SideBar from "../../../components/SideBar";
// import CustomeNav from "../../../components/CustomeNav";
import BreadOutlined from "../../../components/BreadOutlined";
import DateHeader from "../../../components/DateHeader";
// import Header from "../../../components/Header";
import PharmacyName from "../../../components/PharmacyName";
import axios from "../../../config/api/axios";
import drug from "../../../static/drugs.json";
import { toast, Toaster } from "react-hot-toast";
import {
	facility_id,
	setToken,
} from "../../../app/features/authSlice/authSlice";
import { useFetchDefaultProductMutation } from "../../../app/features/products/productsApiSlice";

const AddProducts = () => {
	const controllerRef = useRef();
	const [fetchDefaultDrug] = useFetchDefaultProductMutation();
	const navigate = useNavigate();
	const facilityid = useSelector(facility_id);
	const token = useSelector(setToken);
	const [categoryId] = useState([]);
	const [error] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMsg] = useState("");
	const [drugs, setDrugs] = useState([]);
	const [search_text, setSearchText] = useState("");
	const [newProductBool, setNewProductBool] = useState(true);
	const [drugDetails, setDrugDetails] = useState({
		name: "",
		medicine_group: "",
		total_stock: 1,
		discount: "",
		nhis: "",
		expiry_date: "",
		manufacturer: "",
		selling_price: "",
		price: "",
		description: "",
		image: "",
		level: "",
		dosage: "",
		product_ndc: "",
		purpose: "",
		upc: "",
		unii: "",
		adminstration_instructions: "",
		active_ingredient: "",
	});
	// const [fdrugDetails, setfDrugDetails] = useState({
	// 	name: "",
	// 	price: "",
	// 	selling_price: "",
	// 	description: "",
	// 	medicine_group: "",
	// 	// level: "",
	// 	dosage: "",
	// 	total_stock: 1,
	// 	manufacturer: "",
	// 	discount: "",
	// 	nhis: "N/A",
	// 	// otc: "N/A",
	// 	expiry_date: "",
	// 	store_id: facilityid,
	// 	category_id: "",
	// 	picture: null,
	// });

	const levels = [
		// A,M,B1,B2, C,D,SD,PD
		{
			label: "A",
			value: "A",
		},
		{
			label: "M",
			value: "M",
		},
		{
			label: "B1",
			value: "B1",
		},
		{
			label: "B2",
			value: "B2",
		},
		{
			label: "C",
			value: "C",
		},
		{
			label: "D",
			value: "D",
		},
		{
			label: "SD",
			value: "SD",
		},
		{
			label: "PD",
			value: "PD",
		},
	];

	// useEffect(() => {
	//   axios
	//     .post("/pharmacy/drug-category/fetch-drug-categories", {
	//       pharmacy_id: facilityid,
	//     })
	//     .then((res) => {
	//       //  ;
	//       setCategoryId(res.data.data);
	//       sessionStorage.setItem("categoryId", res.data.data[0]._id);
	//       sessionStorage.setItem("medicineGroup", res.data.data[0].name);
	//     })
	//     .catch((err) => {
	//       console.log(err);
	//       if (err.message === "Network Error") {
	//         setError(true);
	//         setErrorMsg("Network Error");
	//       }
	//     });
	// }, []);

	const {
		name,
		medicine_group,
		total_stock,
		discount,
		nhis,
		expiry_date,
		manufacturer,
		selling_price,
		price,
		description,
		image,
		level,
		dosage,
		product_ndc,
		purpose,
		upc,
		unii,
		adminstration_instructions,
		active_ingredient,
	} = drugDetails;
	// const {
	// 	name,
	// 	description,
	// 	picture,
	// 	total_stock,
	// 	manufacturer,
	// 	dosage,
	// 	price,
	// 	selling_price,
	// 	expiry_date,
	// 	store_id,
	// 	medicine_group,
	// 	nhis,
	// 	level,
	// } = drugDetails;

	const mockMedicineData = [
		{
			name: "Medicine 1",
			medicine_group: "Group 1",
			total_stock: 50,
			discount: 10,
			nhis: "Yes",
			expiry_date: "2023-12-31",
			manufacturer: "Manufacturer 1",
			selling_price: 25.99,
			price: 20.99,
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			image:
				"https://firebasestorage.googleapis.com/v0/b/ecentials-82465.appspot.com/o/659091067c5f7df7e687d1a2%2Flogo%2Faceta.jpg?alt=media&token=bda5acff-e785-40d5-8191-1943d5a9784a",
			level: "A",
			dosage: "Once a day",
			product_ndc: "1234567890",
			purpose: "Pain relief",
			upc: "0987654321",
			unii: "ABC123DEF",
			adminstration_instructions: "Take with water",
			active_ingredient: "Acetaminophen",
		},
		{
			name: "Medicine 2",
			medicine_group: "Group 2",
			total_stock: 30,
			discount: 5,
			nhis: "No",
			expiry_date: "2023-11-30",
			manufacturer: "Manufacturer 2",
			selling_price: 19.99,
			price: 15.99,
			description:
				"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			image:
				"",
			level: "B1",
			dosage: "Twice a day",
			product_ndc: "0987654321",
			purpose: "Allergy relief",
			upc: "1234567890",
			unii: "DEF456GHI",
			adminstration_instructions: "Take before meals",
			active_ingredient: "Loratadine",
		},
	];

	const formData = new FormData();

	// useEffect(() => {
	// 	const getFdaDrugs = async () => {
	// 		try {
	// 			const response = await axiosCall.get(
	// 				"https://api.fda.gov/drug/label.json?search=_exists_:openfda&limit=10"
	// 			);
	// 			setFdaDrugs(response?.data?.results);
	// 			setIsLoading(false);
	// 			// console.log(response);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	getFdaDrugs();
	// }, []);

	//   const controller = new AbortController();
	//     const getDrugsAvailable = async(inputValue)=>{

	//     console.log("Value" ,inputValue)
	//     try{
	//      const res = await axios.post("pharmacy/drugs/drug-search",{search_text : inputValue},{
	//       headers : {
	//         "auth-token": token
	//       },
	//       signal: controller.signal    })
	// console.log(res)
	// controller.abort()

	//     }catch (err){
	// console.log(err)
	//     }finally{

	//     }
	//   }

	const loadOptions = (inputValue) => {
		return getDrugsAvailable(inputValue);
	};

	const getDrugsAvailable = async (inputValue) => {
		// Cancel the previous request, if it exists
		if (controllerRef.current) {
			controllerRef.current.abort();
		}
		controllerRef.current = new AbortController();
		const signal = controllerRef.current.signal;

		console.log("Value", inputValue);
		try {
			// const res = await axios.get(
			//   "pharmacy/drugs/fetch-default-drugs",
			//   // "pharmacy/drugs/drug-search",
			//   { search_text: inputValue },
			//   {
			//     headers: {
			//       "auth-token": token,
			//     },
			//     signal,
			//   }
			// );

			const res = await fetchDefaultDrug({ search_text: inputValue }).unwrap();

			// Handle the response
			console.log(res);
			//  const  dataArray = res.data.data
			const newArray = mockMedicineData?.map((obj, index) => {
				return {
					...obj,
					label: obj.name,
					value: obj.name,
				};
			});
			console.log(newArray);
			//  setDrugs( res.data.data);
			setDrugs(newArray);
			return newArray;
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	// useEffect(() => {
	// getDrugsAvailable()

	// },[getDrugsAvailable])

	// useEffect(() => {
	//   axios
	//     .post("/pharmacy/wholesaler/fetch-wholesalers")
	//     .then((res) => {
	//       //  ;
	//       setData(res.data.data);
	//     })
	//     .catch((err) => console.log(err));
	// }, []);

	// useEffect(() => {
	//   axios
	//     .post("/pharmacy/drugs", {
	//       store_id: facilityid,
	//     },
	//     {
	//       headers: {
	//         "auth-token": token,
	//       },
	//     })
	//     .then((res) => setMyData(res.data.data))
	//     .catch((err) => console.log(err));
	// }, []);
	// let count = 0;

	// for (let item of mydata) {
	//   const { name, medicine_group, dosage } = item;
	//   if (
	//     name === drugDetails.name &&
	//     medicine_group === drugDetails.medicine_group &&
	//     dosage === drugDetails.dosage
	//   ) {
	//     count++;
	//   }
	// }
	// console.log(auth.token);

	// useEffect(() => {
	//   axiosCall
	//     .get("https://dgidb.org/api/v2/drugs?count=14449")
	//     .then((res) => {
	//        ;
	//       setDrugs(res.data.records);
	//     })
	//     .catch((err) => console.log(err));
	// }, []);

	const categories = [];
	for (let drugCat of drug) {
		const { dosage_form } = drugCat;
		if (!categories.includes(dosage_form)) {
			categories.push(dosage_form);
		}
	}

	for (let catId of categoryId) {
		const { name } = catId;
		if (!categories.includes(name)) {
			categories.push(name);
		}
	}

	const drugStrength = [];
	for (let drugStr of drug) {
		const { strength } = drugStr;
		if (!drugStrength.includes(strength)) {
			drugStrength.push(strength);
		}
	}

	const handleChange = (e) => {
		const name = e.target.name;
		const value =
			e.target.type === "checkbox"
				? (e.target.value = e.target.checked
						? e.target.name.toUpperCase()
						: "N/A")
				: e.target.type === "file"
				? e.target.files[0]
				: e.target.value;
		setDrugDetails({ ...drugDetails, [name]: value });
		setTimeout(() => console.log(drugDetails), 5000);
	};

	const handleMedicineNameChange = (selectedOption) => {
		// const selectedDrug = drugs.find(
		// 	(drug) => drug.id === selectedOption.value
		// );
		console.log(selectedOption);
		setDrugDetails({
			name: selectedOption?.name,
			medicine_group: selectedOption?.medicine_group,
			total_stock: 1,
			discount: "",
			nhis: "N/A",
			expiry_date: "",
			manufacturer: selectedOption?.manufacturer,
			selling_price: "",
			price: "",
			description: selectedOption?.description,
			image: selectedOption?.image,
			level: selectedOption?.level,
			dosage: selectedOption?.dosage,
			product_ndc: selectedOption?.product_ndc,
			purpose: selectedOption?.purpose,
			upc: selectedOption?.upc,
			unii: selectedOption?.unii,
			adminstration_instructions: selectedOption?.adminstration_instructions,
			active_ingredient: selectedOption?.active_ingredient,
		});
		// setDrugDetails({
		// 	...drugDetails,
		// 	name: selectedDrug
		// 		? selectedDrug.openfda?.generic_name?.[0] ?? "No Name"
		// 		: "",
		// 	description: selectedDrug
		// 		? selectedDrug.purpose?.[0] ?? "No Description"
		// 		: "",
		// 	medicine_group: selectedDrug
		// 		? selectedDrug.openfda?.route?.[0] ?? "No Med Group"
		// 		: "",
		// 	manufacturer: selectedDrug
		// 		? selectedDrug.openfda?.manufacturer_name?.[0] ?? "No Manufacturer"
		// 		: "",
		// 	store_id: facilityid,
		// 	category_id: "6362bdcfe75eb05f85e05106", //selectedOption.value
		// 	picture: null,
		// 	nhis: "N/A",
		// 	otc: "N/A",
		// 	expiry_date: "",
		// 	price: "",
		// 	selling_price: "",
		// 	level: "",
		// 	dosage: "",
		// 	total_stock: 1,
		// });
	};

	// const handleClick = async (e) => {
	//   e.preventDefault();
	//   setIsLoading(true)
	//   try {

	//     const res = await axios.post("/pharmacy/drugs/add-new-drug" , formData ,{
	//       headers : {
	//         "Content-Type" : "multipart/form-data",
	//         "auth-token" : token
	//       }

	//     })

	//     toast.promise(
	//       Promise.resolve(res),
	//       {
	//         loading: "Loading",
	//         success: (res) =>
	//           `${res?.data?.error?.message
	//             ? "Plase fill all fields"
	//             : "Drug added successfully"
	//           }`,
	//         error: " An error occured, please fill all required fields",
	//       },

	//       setIsLoading(false)

	//     );
	//   } catch (error) {
	//     console.log(error);
	//     setIsLoading(false)
	//   }
	// };
	const handleNewDrugBool = () => {
		setNewProductBool((prev) => !prev);
	};
	const addNewDrug = async (e) => {
		e.preventDefault();



		// formData.append("name", name);
		// formData.append("medicine_group", medicine_group);
		// formData.append("total_stock", total_stock);
		// formData.append("discount", discount);
		// formData.append("nhis", nhis);
		// formData.append("expiry_date", expiry_date);
		// formData.append("manufacturer", manufacturer);
		// formData.append("selling_price", selling_price);
		// formData.append("price", price);
		// formData.append("description", description);
		// formData.append("image", image);
		// formData.append("level", level);
		// formData.append("dosage", dosage);
		// formData.append("product_ndc", product_ndc);
		// formData.append("purpose", purpose);
		// formData.append("upc", upc);
		// formData.append("unii", unii);
		// formData.append("adminstration_instructions", adminstration_instructions);
		// formData.append("active_ingredient", active_ingredient);
		console.log(drugDetails);

		formData.append("name", name); //
		formData.append("description", description); //
		formData.append("total_stock", total_stock);
		formData.append("manufacturer", manufacturer); //
		formData.append("dosage", dosage); //
		formData.append("price", price); //
		formData.append("selling_price", selling_price);
		formData.append("expiry_date", expiry_date); //
		formData.append("store_id", facilityid); //
		formData.append("medicine_group", medicine_group); //
		formData.append("level", level);
		formData.append("nhis", nhis);
		formData.append("picture", image); //
		setIsLoading(true);

		try {
			const res = await axios.post("/pharmacy/drugs/add-new-drug", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"auth-token": token,
				},
			});

			toast.promise(Promise.resolve(res), {
				loading: "Loading",
				success: (res) => res.data.message,
				error: (res) => {
					if (res.data.error.message) {
						return "An error occurred, please fill all required fields";
					}
				},
			});
			console.log(res);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Helmet>
				<title>Add Products</title>
			</Helmet>
			<div className="col-md-9 middle">
				<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
					<div>
						<h6 className="mt-2 text-deep">PRODUCTS</h6>
						<Toaster />
						<DateHeader />
						<div className="d-flex">
							<BreadOutlined name="Products" breadcrumb="/pharmacy/products" />
							<BreadCrumb
								name="Add Products"
								breadcrumb=""
								width="9rem"
								hasStyles={true}
							/>
						</div>
					</div>
					<PharmacyName />
				</div>
				<Toaster />

				<div className="text-deep mx-3 mt-4">
					Please add category, group, dosage, company name before adding
					medicine.
				</div>
				<div className="mx-md-3 mx-2">
					<div
						className="card border-0 pb-3 rounded"
						style={{ borderRadius: "10px" }}>
						<div className="ms-bg text-white py-4 d-flex justify-content-between align-items-center">
							<h6 className="mx-3">PRODUCT DETAILS</h6>

							<div className="d-flex justify-content-end">
								<Link
									to="/pharmacy/products/barcode-scan"
									className="  mx-1 d-flex align-content-center">
									<button
										type="button"
										className="btn btn-light btn-sm py-md-3"
										style={{ color: "#4D44B5" }}>
										{" "}
										Barcode
									</button>
								</Link>
								<Link
									to="/pharmacy/products/mass-upload"
									className=" px-3 mx-1 d-flex align-content-center"
									style={{ color: "#4D44B5" }}>
									<button
										type="button"
										className="btn btn-light btn-sm py-md-3"
										style={{ color: "#4D44B5" }}>
										{" "}
										Mass Upload
									</button>
								</Link>
							</div>
						</div>
						<div className="mx-md-4 mt-3 text-deep">
							<div className="mx-3 my-4">
								<Form className="p-4 ">
									<FormGroup>
										<Label className="small" htmlFor="nhis">
											<b>New Drug </b>
										</Label>
										<Input
											id="nhis"
											name="nhis"
											type="checkbox"
											placeholder=""
											style={{ borderColor: "#C1BBEB", marginLeft: "2px" }}
											// readOnly={true}
											onChange={handleNewDrugBool}
											// value={drugDetails.nhis}
										/>
									</FormGroup>
									<FormGroup>
										<Label className="small" htmlFor="mname">
											<b>Medicine Name*</b>
										</Label>
										{newProductBool ? (
											<AsyncSelect
												styles={{
													control: (baseStyles, state) => ({
														...baseStyles,
														borderColor: "#C1BBEB",
													}),
												}}
												cacheOptions
												//  defaultOptions
												loadOptions={loadOptions}
												onChange={handleMedicineNameChange}
											/>
										) : (
											<FormGroup>
												<Input
													id="mname"
													name="name"
													type="text"
													onChange={handleChange}
													value={drugDetails.name}
													placeholder="medicine name"
													style={{ borderColor: "#C1BBEB" }}
												/>
											</FormGroup>
										)}
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
											readOnly={newProductBool}
											defaultValue={drugDetails.medicine_group}
											onChange={handleChange}
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
											readOnly={newProductBool}
											defaultValue={drugDetails.purpose}
											onChange={handleChange}
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
											readOnly={newProductBool}
											defaultValue={drugDetails.manufacturer}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="number">
											<b> Image:</b>
										</Label>
										
                    <div className="drug-photo">
  {newProductBool ? (
    drugDetails?.image !== "" ? (
      <img
        src={drugDetails?.image}
        alt=""
        className="img-fluid h-100 w-100"
        style={{
          aspectRatio: "3 / 2",
          objectFit: "contain",
          mixBlendMode: "darken",
          pointerEvents: "none",
        }}
        readOnly={newProductBool}
      />
    ) : (
      <p className="small file_name">Drug image</p>
    )
  ) : (
    <div className="drug-photo">
      {drugDetails.image instanceof File ? (  // Check if drugDetails.image is a File
        <img
          src={URL.createObjectURL(drugDetails.image)}
          alt=""
          className="img-fluid h-100 w-100"
          style={{
            aspectRatio: "3 / 2",
            objectFit: "contain",
            mixBlendMode: "darken",
            pointerEvents: "none",
          }}
        />
      ) : (
        <p className="small file_name">
          Drag and drop or click here to select image
        </p>
      )}
      <input
        type="file"
        className="drug_file"
        accept="image/*"
        name=""
        onChange={handleChange}
      />
    </div>
  )}image
</div>

									</FormGroup>

									<FormGroup>
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
											placeholder="description"
											style={{ borderColor: "#C1BBEB" }}
											readOnly={newProductBool}
											defaultValue={drugDetails.description}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="level">
											<b>Level</b>
										</Label>
										<Input
											id="level"
											name="level"
											type="text"
											placeholder="level"
											style={{ borderColor: "#C1BBEB" }}
											readOnly={newProductBool}
											defaultValue={drugDetails.level}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="dosage">
											<b>Dosage</b>
										</Label>
										<Input
											id="dosage"
											name="dosage"
											type="text"
											placeholder="dosage"
											style={{ borderColor: "#C1BBEB" }}
											readOnly={newProductBool}
											defaultValue={drugDetails.dosage}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="product_ndc">
											<b>Product NDC</b>
										</Label>
										<Input
											id="product_ndc"
											name="product_ndc"
											type="text"
											placeholder="product ndc"
											style={{ borderColor: "#C1BBEB" }}
											readOnly={newProductBool}
											defaultValue={drugDetails.product_ndc}
											onChange={handleChange}
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
											placeholder="upc"
											style={{ borderColor: "#C1BBEB" }}
											readOnly={newProductBool}
											defaultValue={drugDetails.upc}
											onChange={handleChange}
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
											placeholder="unii"
											style={{ borderColor: "#C1BBEB" }}
											readOnly={newProductBool}
											defaultValue={drugDetails.unii}
											onChange={handleChange}
										/>
									</FormGroup>

									<FormGroup>
										<Label
											className="small"
											htmlFor="adminstration_instructions">
											<b>Administration Instructions</b>
										</Label>
										<Input
											id="adminstration_instructions"
											name="adminstration_instructions"
											type="text"
											placeholder=""
											style={{ borderColor: "#C1BBEB" }}
											readOnly={newProductBool}
											defaultValue={drugDetails.adminstration_instructions}
											onChange={handleChange}
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
											readOnly={newProductBool}
											defaultValue={drugDetails.active_ingredient}
											onChange={handleChange}
										/>
									</FormGroup>

									{/**  User inputs needed here */}

									<FormGroup>
										<Label className="small" htmlFor="nhis">
											<b>Accept NHIS* </b>
										</Label>
										<Input
											id="nhis"
											name="nhis"
											type="checkbox"
											placeholder=""
											style={{ borderColor: "#C1BBEB", marginLeft: "20px" }}
											// readOnly={true}
											onChange={handleChange}
											value={drugDetails.nhis}
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
											onChange={handleChange}
											value={drugDetails.total_stock}
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
											value={drugDetails.discount}
											onChange={handleChange}
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
											value={drugDetails.expiry_date}
											onChange={handleChange}
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
											onChange={handleChange}
											value={drugDetails.selling_price}
										/>
									</FormGroup>

									<FormGroup>
										<Label className="small" htmlFor="price">
											<b>Purchase Price*</b>
										</Label>
										<Input
											id="price"
											name="price"
											type="number"
											placeholder=""
											style={{ borderColor: "#C1BBEB" }}
											// readOnly={true}
											min={0}
											onChange={handleChange}
											value={drugDetails.price}
										/>
									</FormGroup>
								</Form>
							</div>
						</div>
						<div className="d-flex justify-content-end align-items-end mt-5">
							<button
								disabled={isLoading}
								type="submit"
								className="ms-bg text-white rounded-pill px-4 my-5 save py-2"
								onClick={addNewDrug}>
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

export default AddProducts;

// <Form>
// {error ? <p className="error">{errorMsg}</p> : ""}
// <FormGroup>
//   <Label className="small" htmlFor="fname">
//     <b>Medicine Name*</b>
//   </Label>
//   <Select
//   isLoading={isLoading}
//   isDisabled={isLoading}
//     isSearchable={true}
//     options={fdaDrugs.map((row) => ({
//       value: row?.id,
//       label: row.openfda?.generic_name?.[0],
//     }))}
//     styles={{
//       control: (baseStyles, state) => ({
//         ...baseStyles,
//         borderColor: "#C1BBEB",
//       }),
//     }}
//     onChange={handleMedicineNameChange}
//   />
// </FormGroup>

// <FormGroup>
//   <Label className="small" htmlFor="fname">
//     <b>Medicine Group</b>
//   </Label>
//   <Input
//     id="number"
//     name="price"
//     type="text"
//     onChange={handleChange}
//     placeholder={drugDetails.medicine_group}
//     style={{ borderColor: "#C1BBEB" }}
//     readOnly={true}
//   />
// </FormGroup>
// <FormGroup>
//   <Label className="small" htmlFor="fname">
//     <b>Level Of Prescription*</b>
//   </Label>
//   <Select
//     isSearchable={true}
//     options={levels.map(({ label, value }) => ({
//       label: label,
//       value: value,
//     }))}
//     styles={{
//       control: (baseStyles, state) => ({
//         ...baseStyles,
//         borderColor: "#C1BBEB",
//       }),
//     }}
//     onChange={(e) =>
//       setDrugDetails({
//         ...drugDetails,
//         level: e.value,
//       })
//     }
//   />
// </FormGroup>

// <FormGroup>
//   <Label className="small" htmlFor="price">
//     <b>Purchase Price per Piece (GHS) *</b>
//   </Label>
//   <Input
//     id="price"
//     name="price"
//     type="text"
//     onChange={handleChange}
//     value={drugDetails.price}
//     placeholder="200"
//     style={{ borderColor: "#C1BBEB" }}
//   />
// </FormGroup>
// <FormGroup>
//   <Label className="small" htmlFor="selling_price">
//     <b>Selling Price per Piece (GHS) *</b>
//   </Label>
//   <Input
//     id="selling_price"
//     name="selling_price"
//     type="text"
//     placeholder="250"
//     onChange={handleChange}
//     value={drugDetails.selling_price}
//     style={{ borderColor: "#C1BBEB" }}
//   />
// </FormGroup>
// <FormGroup>
//   <Label className="small" htmlFor="total_stock">
//     <b>Quantity *</b>
//   </Label>
//   <Input
//     id="total_stock"
//     name="total_stock"
//     type="number"
//     onChange={handleChange}
//     value={drugDetails.total_stock}
//     style={{ borderColor: "#C1BBEB" }}
//     min={1}
//   />
// </FormGroup>

// <FormGroup>
//   <Label className="small" htmlFor="fname">
//     <b>Dosage*</b>
//   </Label>
//   <Select
//     isSearchable={true}
//     options={drugStrength.sort().map((item) => ({
//       value: item,
//       label: item,
//     }))}
//     styles={{
//       control: (baseStyles, state) => ({
//         ...baseStyles,
//         borderColor: "#C1BBEB",
//       }),
//     }}
//     onChange={(e) =>
//       setDrugDetails({ ...drugDetails, dosage: e.value })
//     }
//   />
// </FormGroup>

// <FormGroup>
//   <Label className="small" htmlFor="manufacturer">
//     <b>Supplier/Company Name*</b>
//   </Label>
//   <Input
//     id="manufacturer"
//     name="manufacturer"
//     type="text"
//     list="wholesaler"
//     // onChange={handleChange}
//     value={drugDetails.manufacturer}
//     style={{ borderColor: "#C1BBEB" }}
//     readOnly={true}
//   />

// </FormGroup>
// <FormGroup>
//   <Label className="small" htmlFor="number">
//     <b>Medicine Description*</b>
//   </Label>
//   <Input
//     maxLength={2000}
//     max={200}
//     height={500}
//     id="number"
//     name="description"
//     type="textarea"
//     value={drugDetails.description}
//     placeholder=""
//     style={{ borderColor: "#C1BBEB" }}
//     readOnly={true}
//   />
// </FormGroup>
// <FormGroup>
//   <Label className="small" htmlFor="expiry_date">
//     <b>Expiry Date*</b>
//   </Label>
//   <Input
//     id="expiry_date"
//     name="expiry_date"
//     type="date"
//     value={drugDetails.expiry_date}
//     onChange={handleChange}
//     style={{ borderColor: "#C1BBEB" }}
//   />
// </FormGroup>
// <FormGroup>
//   <Input
//     id="number"
//     name="nhis"
//     type="checkbox"
//     value={drugDetails.nhis}
//     onChange={handleChange}
//     style={{ borderColor: "#C1BBEB" }}
//   />
//   <Label className="small mx-2" htmlFor="number">
//     <b>Accept NHIS*</b>
//   </Label>
// </FormGroup>

// <FormGroup>
//   <Label className="small" htmlFor="number">
//     <b>Photo*</b>
//   </Label>
//   <div className="drug-photo">
//     {drugDetails.picture ? (
//       <img
//         src={URL.createObjectURL(drugDetails.picture)}
//         alt=""
//         className="img-fluid h-100 w-100"
//         style={{
//           aspectRatio: "3 / 2",
//           objectFit: "contain",
//           mixBlendMode: "darken",
//           pointerEvents: "none",
//         }}
//       />
//     ) : (
//       <p className="small file_name">
//         Drag and drop or click here to select image
//       </p>
//     )}
//     <input
//       type="file"
//       className="drug_file"
//       accept="image/*"
//       name="picture"
//       // value={drugDetails.picture}
//       onChange={handleChange}
//     />
//   </div>
// </FormGroup>
// </Form>
