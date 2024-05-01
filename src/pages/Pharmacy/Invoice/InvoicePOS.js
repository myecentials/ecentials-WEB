import React, { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
// import SideBar from "../../../components/SideBar";
import { Helmet } from "react-helmet";
import successIcon from "../../../assets/icons/svg/success.svg";
// import qrcode from "../../../assets/icons/svg/qrcode.svg";
// import CustomeNav from "../../../components/CustomeNav";
import { useSelector, useDispatch } from "react-redux";
import {
	Form,
	FormGroup,
	Input,
	Label,
	Col,
	Table,
	Modal,
	ModalBody,
	// Placeholder,
	// Card,
	// CardImg,
	// CardBody,
	// PlaceholderButton,
	// Spinner,
} from "reactstrap";
import Select from "react-select";

import dustbin from "../../../assets/icons/svg/dustbin.svg";
// import blueeye from "../../../assets/icons/svg/blueeye.svg";
// import SearchBar from "../../../components/SearchBar";
import InvoiceDrugCard from "../../../components/Pharmacy/Invoice/InvoiceDrugCard";
import InvoiceNonDrugCard from "../../../components/Pharmacy/Invoice/InvoiceNonDrugCard";
// import orders from "../../../static/orders";
// import Header from "../../../components/Header";
import PharmacyName from "../../../components/PharmacyName";
// import drug1 from "../../../assets/images/png/oraddrug4.png";
import axios from "../../../config/api/axios";
import { useEffect } from "react";
// import Category from "../Products/Category";
// import { de } from "faker/lib/locales";
// import { date } from "faker/lib/locales/az";
// import gif from "../../../assets/images/loader.gif";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import DateHeader from "../../../components/DateHeader";
import { useGetDrugsMutation } from "../../../app/features/invoice/invoiceApiSlice";
import { useGetNonDrugsMutation } from "../../../app/features/products/productsApiSlice";
import {
	addCheckouts,
	checkedDrugs,
	invoicePOS,
	removeCheckouts,
	clearCheckouts,
} from "../../../app/features/invoice/invoiceSlice";
import {
	facility_id,
	setToken,
} from "../../../app/features/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const InvoicePOS = () => {
	const token = useSelector(setToken);
	const facilityId = useSelector(facility_id);
	const [skip, setSkip] = useState(100); // Initial skip value
	const [limit] = useState(100); // Fetch Drugs in pharmacy
	const [focusAfterClose] = useState(false);
	// const [open, setOpen] = useState(false);
	const [totalDone, setTotalDone] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// const toggle = () => {
	//   setOpen(!open);
	// };
	const navigate = useNavigate();

	const handleFetchDrugs = () => {
		const newSkip = skip + limit;
		setSkip(newSkip);
	};

	const [searchText, setSearchText] = useState("");
	const [selectCat, setSelectCat] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [drugs] = useGetDrugsMutation();
	const [nonDrugs] = useGetNonDrugsMutation();
	const facilityid = useSelector(facility_id);

	// Fetch Drugs in pharmacy
	const [data, setData] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		const getDrugs = async () => {
			// setIsLoading(true)
			const results = await drugs({
				store_id: facilityid,
				skip: 0,
				limit: skip,
			}).unwrap();
			const nonDrugResults = await nonDrugs({
				store_id: facilityid,
				skip: 0,
				limit: skip,
			}).unwrap();
			dispatch(invoicePOS([...results?.data]));
			setData([...results?.data, ...nonDrugResults?.data]);
			console.log("POS Invoise drug list", results?.data);
			console.log("POS Invoise nondrug list", nonDrugResults?.data);
			// setIsLoading(false)
		};
		getDrugs();
	}, [skip, limit, drugs, facilityid, dispatch, nonDrugs]);

	// Fetch All Category
	const [category, setCategory] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		axios
			.post(
				"/pharmacy/drug-category/fetch-drug-categories",
				{
					pharmacy_id: facilityId,
				},
				{ headers: { "auth-token": token } }
			)
			.then((res) => {
				setIsLoading(false);
				setCategory(res.data.data);
			})
			.catch((err) => {
				setIsLoading(false);
				console.log(err);
			});
	}, [facilityId, token]);

	const [details, setDetails] = useState({
		name: "",
		expiry_date: "",
		quantity: "",
		selling_price: 0,
		discount: 0,
		total: 0,
		isChecked: false,
	});

	// const [newData, setNewData] = useState([]);

	const handleChange = (e, itemId) => {
		const name = e.target.name;
		const value = e.target.value;
		setSelectedTable((prevSelectedTable) =>
			prevSelectedTable.map((item) => {
				// console.log(item._id, itemId);
				if (item._id === itemId) {
					return {
						...item,
						[name]: value,
						total: item.quantity * item.selling_price - item.discount,
					};
				}
				return item;
			})
		);
	};

	// const [isFocuse, setIsFocuse] = useState(false);

	// HANDLECLICK
	const handleClick = (index, id) => {
		sessionStorage.setItem("drug_id", id);
		setDetails({
			...details,
			...data.filter(({ _id }) => _id === id)[0],
			isChecked: true,
		});
	};

	// HANDLE SELECT
	const [selectedTable, setSelectedTable] = useState([]);

	const handleCheck = (e, id, index) => {
		const value = e.target.checked;
		if (!value) {
			setSelectedTable(selectedTable.filter(({ _id }, i) => _id !== id));
		} else {
			setSelectedTable([
				...selectedTable,
				...data.filter(({ _id }) => _id === id),
			]);
		}
	};

	const mode_of_payment = [
		{
			label: "Momo",
			value: "momo",
		},
		{
			label: "Cash",
			value: "cash",
		},
	];

	const [tables, setTables] = useState([]);

	const handleAddTable = () => {
    // setTotalDone(false)
		// if (details.name !== "") {
			selectedTable.forEach((table) => {
				if (!tables.find((t) => t._id === table._id)) {
					tables.push({ ...table, quantity: table.quantity || 1, total: 0 });
					dispatch(
						addCheckouts({ ...table, quantity: table.quantity || 1, total: 0 })
					);
				}
			});

			setDetails({
				name: "",
				expiry_date: "",
				quantity: 1,
				selling_price: 0,
				discount: 0,
				total: 0,
			});
		// }

		setSelectedTable([]);
};

	const checkeddrugs = useSelector(checkedDrugs);

	// const newTable = [];

	const handleRemove = (id) => {
		setTables(tables.filter(({ _id }) => _id !== id));
		dispatch(removeCheckouts(id));
	};

	const newDate = new Date();
	let day = newDate.getDate();
	let mon = newDate.getMonth() + 1;
	const year = newDate.getFullYear();
	if (day.toString().length === 1) {
		day = `0${day}`;
	}
	if (mon.toString().length === 1) {
		mon = `0${mon}`;
	}

	const [info, setInfo] = useState({
		customer_name: "",
		payment_type: "cash",
		invoice_discount: 0,
		grand_total: 0,
		amount_paid: 0,
		change: 0,
		net_total: 0,
		date: `${day}/${mon}/${year}`,
	});

	const [isFocused, setIsFocused] = useState(true);
	let sum = 0;
	let discountSum = 0;
	let amountlessDiscount = 0;
	const handleTotal = () => {
    setTotalDone(true)
		setIsFocused(false);
		checkeddrugs?.forEach(
			({ quantity, selling_price }) =>
				(sum += quantity * Number(selling_price).toFixed(2))
		);
		checkeddrugs?.forEach(
			({ quantity, selling_price, discount }) =>
				(discountSum +=
					quantity * selling_price * Number((discount / 100).toFixed(2)))
		);
		amountlessDiscount = sum - discountSum;
		// setInfo({ ...info, grand_total: sum });
		setInfo({
			...info,
			invoice_discount: discountSum,
			grand_total: sum,
			net_total: amountlessDiscount,
		});
	};

	const handleInvoiceChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setInfo({ ...info, [name]: value });
	};

	const [invoiceDetails] = useState({
		store_id: facilityId,
		name: sessionStorage.getItem("name"),
		grand_total: 0,

		delivery_date: newDate,
		delivery_method: "Pickup",
		product_summary: [],
	});

	// const formData = new FormData();
	// formData.append("store_id", invoiceDetails.store_id);
	// formData.append("name", invoiceDetails.name);
	// formData.append("customer_name", info.customer_name);
	// formData.append("grand_total", info.grand_total);
	// formData.append("delivery_date", invoiceDetails.delivery_date);
	// formData.append("payment_type", info.payment_type);
	// formData.append("delivery_method", invoiceDetails.delivery_method);
	// for (let i = 0; i < tables.length; i++) {
	//   formData.append("products_summary[]", tables[i]);
	// }

	const formData = new FormData();
	formData.append("name", "Andrews Opoku");

	const handlePostInvoice = (e) => {
		e.preventDefault();
		const load = toast.loading("Adding invoice...");
		axios
			.post(
				"/pharmacy/invoice/add-invoice",
				{
					store_id: invoiceDetails.store_id,
					name: invoiceDetails.name,
					payment_type: info?.payment_type,
					grand_total: Number(info.net_total.toFixed(2)),
					delivery_date: invoiceDetails.delivery_date,
					delivery_method: invoiceDetails.delivery_method,
					customer_name: info.customer_name,
					products_summary: tables.map(
						({ _id, name,product_name, image, quantity, nhis, discount, selling_price }) => {
							return {
								drug_id: _id,
								drug_name: name || product_name,
								drug_image: image,
								quantity: quantity,
								nhis: nhis,
								discount: discount,
								prize: selling_price,
							};
						}
					),
				},
				{ headers: { "auth-token": token } }
			)
			.then((res) => {
				console.log(res);
				if (res.data.message === "success") {
					setIsOpen(true);
					toast.dismiss(load);
					toast.success("Invoice Added");
				}
			})
			.catch((err) => {
				toast.dismiss(load);
				toast.error("An error occured");
				console.log(err);
			});
	};

	const [isDate, setIsDate] = useState(false);
	const handleDate = () => {
		setIsDate(true);
	};

	useEffect(() => {
		dispatch(clearCheckouts());
		sessionStorage.removeItem("checkoutlist");
	}, []);


  function calculateTotal(quantity, sellingPrice, discount) {
    // Convert inputs to numbers
    const numQuantity = Number(quantity);
    const numSellingPrice = Number(sellingPrice);
    const numDiscount = Number(discount);
  
    // Check if any conversions failed (resulting in NaN)
    if (isNaN(numQuantity) || isNaN(numSellingPrice) || isNaN(numDiscount)) {
      console.error("Invalid input:", {quantity, sellingPrice, discount});
      return "Invalid input"; // Handle error as appropriate for your application
    }
  
    // Perform calculation
    const total = numQuantity * numSellingPrice * ((100 - numDiscount) / 100);
    return total.toFixed(2);
  }
  
  
  

	return (
		<>
			<Helmet>
				<title>Invoice POS</title>
			</Helmet>
			<div className="col-md-9 middle">
				<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
					<div>
						<h6 className="mt-2 text-deep">INVOICE POS</h6>
						<DateHeader />
						<div className="d-flex">
							<BreadCrumb
								name="Invoice POS"
								breadcrumb=""
								width="8rem"
								hasStyles={true}
							/>
						</div>
					</div>
					<PharmacyName />
				</div>
				<Toaster />

				<div className="mt-4 mx-md-3 mx-2">
					<div
						className="card bg border-0 pb-3 my-5 rounded"
						style={{ borderRadius: "10px" }}>
						<div className="py-2 ms-bg mb-2">
							<div className="row mx-3">
								<div className="col-sm-9">
									<div className="row gy-md-0 gy-2">
										<div className="col-sm-4">
											<input
												type="search"
												className="form-control"
												onChange={(e) => setSearchText(e.target.value)}
												placeholder="search drug"
											/>
										</div>
										<div className="col-sm-4">
											<Input
												type="select"
												onChange={(e) => setSelectCat(e.target.value)}>
												<option value="All">All</option>
												{category.map(({ name, index }) => (
													<option value={name} key={index}>
														{name}
													</option>
												))}
											</Input>
										</div>
										<div className="col-sm-4">
											<Input
												type={isDate ? "date" : "text"}
												value={info.date}
												name="date"
												placeholder="dd/mm/yyyy"
												onChange={handleInvoiceChange}
												onClick={handleDate}></Input>
										</div>
									</div>
								</div>
								{/* <div className="col-sm-6"></div> */}
							</div>
						</div>

						<div className="mx-md-3">
							{isLoading ? (
								<Loader />
							) : (
								<div className="invoice-grid">
									<>
										{data
											// .filter(({ name, product_name }) => {
											// 	return name?.toLowerCase() === "" ||
											// 		product_name?.toLowerCase() === ""
											// 		? name?.toLowerCase() || product_name?.toLowerCase()
											// 		: name
											// 				?.toLowerCase()
											// 				?.includes(searchText.toLowerCase()) ||
											// 				product_name
											// 					?.toLowerCase()
											// 					?.includes(searchText.toLowerCase());
											// })
											// .filter(({ medicine_group }) => {
											// 	return selectCat.toLowerCase() === "all"
											// 		? medicine_group
											// 		: medicine_group
											// 				.toLowerCase()
											// 				.includes(selectCat.toLowerCase());
											// })
											.map(
												(
													{
														image,
														name,
                            product_name,
                            product_category,
														medicine_group,
														selling_price,
														total_stock,
														level,
														_id,
													},
													index
												) => (
                          
                            name ? 
                  
                            <InvoiceDrugCard
														key={index}
														drug_img={image}
														drug_name={name}
														price={selling_price}
														stock={total_stock}
														category={medicine_group}
														drug_count="0"
														id={_id}
														handleClick={() => handleClick(index, _id)}
														handleChange={(e) => handleCheck(e, _id, index)}
														level={level}
													/> :  
                          <InvoiceNonDrugCard
                          key={index}
                          drug_img={image}
                          drug_name={product_name}
                          price={selling_price}
                          stock={total_stock}
                          category={product_category}
                          drug_count="0"
                          id={_id}
                          handleClick={() => handleClick(index, _id)}
                          handleChange={(e) => handleCheck(e, _id, index)}
                          level={level}
                        />
                          
													
												)
											)}
									</>
									<button
										disabled={skip > data.length}
										className="btn btn-primary text-white my-5 py-2"
										onClick={handleFetchDrugs}>
										Load More
									</button>
								</div>
							)}
						</div>

						<div className="ms-bg py-2 d-flex  align-items-center">
							<button
								className="small mx-3 btn btn-light text-purple"
								onClick={handleAddTable}>
								<svg
									width="12"
									height="12"
									viewBox="0 0 17 17"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M6.34752 10.7299H0.382812V6.4946H6.34752V0.565186H10.5828V6.4946H16.6181V10.7299H10.5828V16.7299H6.34752V10.7299Z"
										fill="#4D44B5"
									/>
								</svg>
								<span className="small mx-2"> Add Table</span>
							</button>
						</div>
						<Table responsive bordered>
							<thead>
								<tr>
									<th className="text-nowrap">Medicine Information</th>
									<th className="text-nowrap">Expiry Date</th>
									<th className="text-nowrap">Quantity</th>
									<th className="text-nowrap">Price</th>
									<th className="text-nowrap">Discount %</th>
									<th className="text-nowrap">Total</th>
									<th className="text-nowrap">Action</th>
								</tr>
							</thead>
							<tbody>
								{selectedTable.map((item, index) => (
									<tr key={index}>
										<td>
											<Input
												type="text"
												name="name"
												value={`${item.name || item.product_name} - ${item.medicine_group || item.product_category}`}
												disabled
												className="bg-white"
											/>
										</td>

										<td>
											<Input
												type="text"
												name="expiry_date"
												value={
													item.name === ""
														? ""
														: `${new Date(
																item.expiry_date
														  ).getDate()}/${new Date(
																item.expiry_date
														  ).getMonth()}/${new Date(
																item.expiry_date
														  ).getFullYear()}`
												}
												disabled
												className="bg-white"
											/>
										</td>
										<td>
											<Input
												type="number"
												min={1}
												max={item.total_stock}
												name="quantity"
												value={Number(item.quantity) || 1}
												onChange={(e) => handleChange(e, item._id)}
												disabled={details.name === ""}
											/>
										</td>
										<td>
											<Input
												type="text"
												name="selling_price"
												value={item.selling_price}
												disabled
												className="bg-white"
											/>
										</td>
										<td>
											<Input
												type="text"
												name="discount"
												value={item.discount}
											/>
										</td>
										<td>
											{/* <Input
												type="text"
												name="total"
												value={ }
												disabled
												className="bg-white"
											/> */}
                  {calculateTotal(Number(item.quantity) || 1, item.selling_price, item.discount)}
										</td>
										<td>
											{/* <div className="d-flex">
                          <button className="btn  border">
                            <img src={dustbin} alt="" />
                          </button>
                          <button className="btn mx-2 border">
                            <img src={blueeye} alt="" />
                          </button>
                        </div> */}
										</td>
									</tr>
								))}

								{checkeddrugs.map(
									(
										{
                      product_name,
                      product_category,
											name,
											expiry_date,
											selling_price,
											discount,
											quantity,
											medicine_group,
											total,
											_id,
										},
										index
									) => (
										<tr key={index}>
											<td>
												<Input
													value={`${name || product_name} - ${medicine_group || product_category} `}
													type="text"
													disabled
												/>
											</td>
											<td>
												<Input
													value={`${new Date(expiry_date).getDate()}/${
														new Date(expiry_date).getMonth() + 1
													}/${new Date(expiry_date).getFullYear()}`}
													type="text"
													disabled
												/>
											</td>
											<td>
												<Input value={quantity || 1} type="text" disabled />
											</td>
											<td>
												<Input value={selling_price} type="text" disabled />
											</td>
											<td>
												<Input value={discount} type="text" disabled />
											</td>
											<td>
												<Input
													value={
														quantity * selling_price -
														quantity *
															selling_price *
															Number((discount / 100).toFixed(2))
													}
													type="text"
													disabled
												/>
											</td>
											<td>
												<div
													className="btn  border"
													onClick={() => {
                            handleRemove(_id)
                          setTotalDone(false)
                          }}>
													<img src={dustbin} alt="" />
												</div>
											</td>
										</tr>
									)
								)}
							</tbody>
						</Table>
						<div className="row mt-5">
							<div className="col-md-6"></div>
							<div className="col-md-6">
								<div className=" rounded mx-3 py-4 ">
									<Form>
										<FormGroup className="mx-2 d-flex">
											<Label
												htmlFor="customer_name"
												sm={5}
												className="text-nowrap text-purple">
												Customer Name:
											</Label>
											<Col className="w-category">
												<Input
													id="customer_name"
													className="border-0 order-form"
													name="customer_name"
													placeholder="Customer name"
													value={info.customer_name}
													type="text"
													style={{
														borderColor: "#C1BBEB",
														background: "#F7FAFE",
														textAlign: "left",
													}}
													onChange={handleInvoiceChange}
												/>
											</Col>
										</FormGroup>
										<FormGroup className="mx-2 d-flex">
											<Label
												htmlFor=""
												sm={5}
												className="text-nowrap text-purple">
												Payment Type:
											</Label>
											<Col className="w-category">
												<Select
													isSearchable={true}
													options={mode_of_payment
														?.sort()
														.map(({ label, value }) => ({
															value,
															label,
														}))}
													styles={{
														control: (baseStyles, state) => ({
															...baseStyles,
															borderColor: "#C1BBEB",
														}),
													}}
													onChange={(e) =>
														setInfo({ ...info, payment_type: e?.value })
													}
												/>
											</Col>
										</FormGroup>
										<FormGroup className="mx-2 d-flex">
											<Label
												htmlFor="amount_paid"
												sm={5}
												className="text-nowrap text-purple">
												Paid:
											</Label>
											<Col className="w-category">
												<Input
													id="amount_paid"
													className="border-0 bg order-form"
													name="amount_paid"
													value={info.amount_paid}
													type="text"
													style={{
														borderColor: "#C1BBEB",
														background: "#F7FAFE",
														textAlign: "right",
													}}
													onChange={handleInvoiceChange}
												/>
											</Col>
										</FormGroup>

										<FormGroup className="mx-2 d-flex">
											<Label
												htmlFor="invoice_discount"
												sm={5}
												className="text-nowrap text-purple">
												Invoice discount:
											</Label>
											<Col className="w-category">
												<Input
													disabled
													id="invoice_discount"
													className="border-0 order-form"
													name="invoice_discount"
													value={info.invoice_discount.toFixed(2)}
													type="text"
													style={{
														borderColor: "#C1BBEB",
														background: "#F7FAFE",
														textAlign: "right",
													}}
												/>
											</Col>
										</FormGroup>

										<FormGroup className="mx-2 d-flex">
											<Label
												htmlFor="grand_total"
												sm={5}
												className="text-nowrap text-purple">
												Grand Total (GHC):
											</Label>
											<Col>
												<Input
													disabled
													id="grand_total"
													className="border-0 bg order-form"
													name="grand_total"
													value={Number(
														info.grand_total.toFixed(2)
													).toLocaleString()}
													type="text"
													style={{
														borderColor: "#C1BBEB",
														background: "#F7FAFE",
														textAlign: "right",
													}}
												/>
											</Col>
										</FormGroup>

										<FormGroup className="mx-2 d-flex">
											<Label
												htmlFor="change"
												sm={5}
												className="text-nowrap text-purple">
												Change:
											</Label>
											<Col className="w-category">
												<Input
													disabled
													id="change"
													className="border-0 bg order-form"
													name="change"
													value={
														(info.change = Number(
															(info.amount_paid - info.net_total).toFixed(2)
														))
													}
													type="text"
													style={{
														borderColor: "#C1BBEB",
														background: "#F7FAFE",
														textAlign: "right",
													}}
												/>
											</Col>
										</FormGroup>
										<FormGroup className="mx-2 d-flex">
											<Label
												htmlFor="net_total"
												sm={5}
												className="text-nowrap text-purple">
												<b>Net Total:</b>
											</Label>
											<Col className="w-category">
												<Input
													disabled
													id="net_total"
													className="border-0 bg order-form-last"
													name="net_total"
													value={info.net_total.toFixed(2)}
													type="text"
													style={{
														borderColor: "#C1BBEB",
														background: "#F7FAFE",
														textAlign: "right",
													}}
												/>
											</Col>
										</FormGroup>
										<div className="d-flex justify-content-end align-items-end mt-4">
											<button
												type="button"
												className="ms-bg text-white mx-2 py-2 rounded"
												style={{ width: "8rem" }}
												onClick={handleTotal}
												disabled={checkeddrugs.length === 0}>
												Compute
											</button>
											<button
												// disabled={isFocused}
												type="submit"
												className="btn btn-success"
												style={{ width: "8rem" }}
												onClick={handlePostInvoice}
												disabled={!totalDone}>
												Save
											</button>
										</div>
									</Form>
									<Modal
										returnFocusAfterClose={focusAfterClose}
										isOpen={isOpen}
										centered={true}>
										<ModalBody>
											<img
												src={successIcon}
												alt=""
												className="mx-auto d-block"
											/>
											<div className="text-center">
												<h3 className="text-deep mt-2">Success</h3>
												<p className="text-deep">Do want to print invoice?</p>
											</div>
										</ModalBody>

										<div className="d-flex pb-4 justify-content-center align-items-center mx-auto">
											<button
												autoFocus
												className="btn btn-light mx-2"
												onClick={() => setIsOpen(false)}
												style={{ width: "7rem" }}>
												No
											</button>
											<Link
												to="/pharmacy/sales"
												className="btn btn-success text-white mx-2"
												onClick={() => {
													setIsOpen(false);
													navigate("/pharmacy/invoices/invoice-list");
												}}
												style={{ width: "7rem" }}>
												Yes
											</Link>
										</div>
									</Modal>
								</div>
							</div>

							{/*  */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InvoicePOS;
