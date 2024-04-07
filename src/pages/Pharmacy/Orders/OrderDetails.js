import React from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import NavIcons from "../../../components/NavIcons";
// import SideBar from "../../../components/SideBar";
import { Helmet } from "react-helmet";
// import CustomeNav from "../../../components/CustomeNav";
import {
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	// Table,
} from "reactstrap";
import BreadOutlined from "../../../components/BreadOutlined";
// import orders from "../../../static/orders";
// import updownchev from "../../../assets/icons/svg/updownchev.svg";
// import Header from "../../../components/Header";
import { useState } from "react";
import { useEffect } from "react";
// import axios from "../../../config/api/axios";
import PharmacyName from "../../../components/PharmacyName";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import { useSelector } from "react-redux";
// import { setToken } from "../../../app/features/authSlice/authSlice";
import {
	useFetchSpecificOrderMutation,
	useProcessOrderMutation,
	useCancelOrderMutation,
} from "../../../app/features/orders/ordersApiSlice";
import DataTable from "react-data-table-component";
import { pharmacyName } from "../../../app/features/authSlice/authSlice";
import toast from "react-hot-toast";

const OrderDetails = () => {
	const [data, setData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isEqual, setIsEqual] = useState(false);
	// const [orderCode, setOrderCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	// const token = useSelector(setToken);
	const [fetchSpecificOrder] = useFetchSpecificOrderMutation();
	const [processOrder] = useProcessOrderMutation();
	const [cancelOrder] = useCancelOrderMutation();
	const pharmName = useSelector(pharmacyName);

	const columns = [
		{
			name: "Product Name",
			sortable: true,
			minWidth: "200px",
			selector: (row) => row.drug_name,
		},
		{
			name: "Product Image",
			minWidth: "200px",

			cell: (row) => (
				<span className="py-3">
					<img
						src={row.drug_image}
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
			selector: (row) => row.quantity,
		},
		{
			name: "Price (GHC)",
			sortable: true,
			minWidth: "200px",

			selector: (row) => row.prize,
		},
		{
			name: "Discount Type",
			sortable: true,
			minWidth: "200px",

			selector: (row) => row.nhis,
		},
		{
			name: "Discount",
			sortable: true,
			minWidth: "200px",

			selector: (row) => row.discount,
		},
		{
			name: "Total",
			sortable: true,
			minWidth: "200px",

			cell: (row) => (
				<span>{((row.prize * row.quantity) - ((row.discount * 0.01 ) * (row.prize * row.quantity) )).toFixed(2)}</span>
			),
		},
	];

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				setIsLoading(true);
				const orderIdString = sessionStorage.getItem("orderIdSelected");
				const orderIdObject = JSON.parse(orderIdString);
				if (!orderIdObject) {
					console.error("Invalid order ID format");
					return;
				}
				const res = await fetchSpecificOrder({
					_id: orderIdObject._id,
				}).unwrap();

				console.log(res?.data);
				setData(res?.data);
			} catch (error) {
				console.error("Error fetching order:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchOrder();
	}, [fetchSpecificOrder]);

	const {
		// customer_name,
		invoice_number,
		payment_type,
		order_code,
		order_status,
		products_summary,
	} = data;
	//console.log(data)

	const products = [];
	for (let item in products_summary) {
		products.push(products_summary[item]);
	}

	const handleModalClose = () => {
		setIsOpen(false);
	};

	const handleOrderChange = (e) => {
		e.target.value === `${order_code}` ? setIsEqual(true) : setIsEqual(false);
	};

	const navigate = useNavigate();

	/**
	 * The function `handleCancelOrder` handles the cancellation of an order by closing a modal, sending a
	 * cancellation request, and displaying a toast message based on the response.
	 */
	const handleCancelOrder = async () => {
		handleModalClose();
		try {
			const res = await cancelOrder({
				order_code,
				message: `Your order with code ${order_code} is cancelled`,
			}).unwrap();

			toast.promise(
				Promise.resolve(res),
				{
					loading: "Cancelling",
					success: (res) => res.data.message,
					error: (res) => console.log(res),
				},
				navigate("/pharmacy/orders")
			);
		} catch (error) {
			console.error("Error in Cancelling order:", error);
		}
	};

	const handleOpenModel = () => {
		setIsOpen(true);
	};

	let sum = 0;
	for (let total of products) {
		sum += ((total.prize * total.quantity) - ((total.discount *0.01) * (total.prize * total.quantity) ))?.toFixed(2);
	}

	const handleProcessOrder = async () => {
		try {
			const res = await processOrder({
				order_code,
				message: `We are pleased to inform you that your order has been processed and is now being prepared for shipment. Thank you for choosing ${pharmName} and we look forward to delivering your order soon. Best regards, ecentials`,
			}).unwrap();
			toast.promise(
				Promise.resolve(res),
				{
					loading: "Processing",
					success: (res) => res.data.message,
					error: (res) => console.log(res),
				},
				navigate("/pharmacy/orders")
			);
		} catch (error) {
			console.log(error);
		}
	};

	const [isOpenConfirm, setIsOpenComfirm] = useState(false);
	const handleOpenConfirm = () => {
		setIsOpenComfirm(true);
	};

	return (
		<>
			<Helmet>
				<title>Orders Details</title>
			</Helmet>
			
				<div className="col-md-9 middle">
					<div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
						<div>
							<h6 className="mt-2 text-deep">ORDERS</h6>
							<DateHeader />
							<div className="d-flex ">
								<BreadOutlined
									name="Orders"
									breadcrumb="/pharmacy/orders"
									hasStyles={true}
								/>
								<BreadCrumb
									name={order_code}
									breadcrumb="/pharmacy/orders/order-details"
									hasStyles={true}
									width="9rem"
								/>
							</div>
						</div>
						<PharmacyName />
					</div>

					<div className="row mt-4">
						<div className="col-md-8">
							<Form>
								{/* <FormGroup row className="mx-2">
									<Label
										htmlFor="name"
										sm={3}
										className="text-nowrap text-purple">
										Customer Name:
									</Label>
									<Col className="w-category">
										<Input
											id="category"
											className="f-border"
											name="category"
											placeholder="Andrews Opoku"
											value={customer_name}
											type="text"
											style={{ borderColor: "#C1BBEB" }}
										/>
									</Col>
								</FormGroup> */}
								<FormGroup row className="mx-2">
									<Label
										htmlFor="name"
										sm={3}
										className="text-nowrap text-purple">
										Invoice No. :
									</Label>
									<Col className="w-category">
										<Input
											id="category"
											className="f-border"
											name="category"
											value={invoice_number}
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
										PaymentType:
									</Label>
									<Col className="w-category">
										<Input
											id="category"
											className="f-border"
											name="category"
											placeholder="Ashanti"
											type="text"
											value={payment_type}
											style={{ borderColor: "#C1BBEB" }}
										/>
									</Col>
								</FormGroup>
								<FormGroup row className="mx-2">
									<Label
										htmlFor="name"
										sm={3}
										className="text-nowrap text-purple">
										Order Number:
									</Label>
									<Col className="w-category">
										<Input
											id="category"
											className="f-border"
											name="category"
											placeholder="ORD-2457"
											value={order_code}
											type="text"
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
									pagination
									customStyles={customStyles}
									striped
									// progressPending={pending}
									// onSelectedRowsChange={handleChange}
									// selectableRows
								/>
							)}
						</div>
					</div>
					{/* End of Table */}

					<div className="row mt-5">
						<div className="col-md-6"></div>
						<div className="col-md-6">
							<div className="bg-white rounded mx-3 py-4">
								<Form>
									<FormGroup row className="mx-2">
										<Label
											htmlFor="name"
											sm={5}
											className="text-nowrap text-purple">
											Sub Total (GHC):
										</Label>
										<Col className="w-category">
											<Input
												disabled
												id="category"
												className="border-0 order-form"
												name="category"
												placeholder={sum.toFixed(2)}
												type="text"
												style={{ borderColor: "#C1BBEB" }}
											/>
										</Col>
									</FormGroup>
									<FormGroup row className="mx-2">
										<Label
											htmlFor="name"
											sm={5}
											className="text-nowrap text-purple">
											Tax:
										</Label>
										<Col className="w-category">
											<Input
												disabled
												id="category"
												className="border-0 order-form"
												name="category"
												placeholder="0"
												type="text"
												style={{ borderColor: "#C1BBEB" }}
											/>
										</Col>
									</FormGroup>
									<FormGroup row className="mx-2">
										<Label
											htmlFor="name"
											sm={5}
											className="text-nowrap text-purple">
											Tax Amount:
										</Label>
										<Col className="w-category">
											<Input
												disabled
												id="category"
												className="border-0 order-form"
												name="category"
												placeholder="0"
												type="text"
												style={{ borderColor: "#C1BBEB" }}
											/>
										</Col>
									</FormGroup>
									<FormGroup row className="mx-2">
										<Label
											htmlFor="name"
											sm={5}
											className="text-nowrap text-purple">
											Grand Total (GHC):
										</Label>
										<Col className="w-category">
											<Input
												disabled
												id="category"
												className="border-0 bg order-form-last"
												name="category"
												placeholder={sum.toFixed(2)}
												type="text"
												style={{ borderColor: "#C1BBEB" }}
											/>
										</Col>
									</FormGroup>
								</Form>
							</div>
						</div>

						{/*  */}
					</div>

					<Modal isOpen={isOpen} centered={true}>
						<div className="card border-0 modal_card">
							<CgClose className="close_modal" onClick={handleModalClose} />
							<p className="pt-3 mx-3">Are you absolutely sure?</p>
							<p className="py-3 px-3 warning_bg">
								Unexpected bad things will happen if you don’t read this!
							</p>
							<p className="px-3">
								This action cannot be undone. This will permanently cancel{" "}
								<b>order with code {order_code}</b> information
							</p>
							<p className="mx-3">
								Please type Order code <b>{order_code}</b> to confirm.
							</p>
							<input
								type="text"
								className="form-control delete_staff_input"
								placeholder={order_code}
								onChange={handleOrderChange}
							/>
							<input
								type="submit"
								value="I understand the consequence, Cancel order"
								className={
									isEqual
										? "form-control btn btn-outline-danger delete_staff_input my-4 delete_hover"
										: "form-control btn btn-outline-danger delete_staff_input disabled  my-4 delete_hover"
								}
								onClick={handleCancelOrder}
							/>
						</div>
					</Modal>

					<div className="order-btns mt-3 mb-5  d-flex justify-content-end align-items-end">
						<button
							className=" btn btn-danger btn-lg py-2 px-4 rounded"
							disabled={order_status === "Approved"}
							onClick={handleOpenModel}>
							<span className="small">Cancel Order</span>
						</button>
						<button
							disabled={order_status === "Approved"}
							className="btn btn-success ms-bg btn-lg mx-3 text-white py-2 px-4 rounded"
							onClick={handleOpenConfirm}>
							<span className="small">Process Order</span>
						</button>
					</div>
					<Modal isOpen={isOpenConfirm} centered={true}>
						<ModalBody>
							<p className="text-center text-deep">
								Do you want to process this order?
							</p>
							<div className="d-flex pb-3 justify-content-center align-items-center mx-auto">
								<button
									className="btn btn-danger mx-2"
									onClick={() => setIsOpenComfirm(false)}
									style={{ width: "7rem" }}>
									Cancel
								</button>
								<button
									className="btn btn-success text-nowrap text-white mx-2"
									onClick={handleProcessOrder}
									style={{ width: "7rem" }}>
									Process
								</button>
							</div>
						</ModalBody>
					</Modal>
				</div>
		</>
	);
};

export default OrderDetails;

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
