import React from "react";
import { useState } from "react";
// import logo from "../logo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import dashboard from "../assets/icons/svg/dash.svg";
import hrm from "../assets/icons/svg/hrm.svg";
import customers from "../assets/icons/svg/customer.svg";
import sales from "../assets/icons/svg/sale.svg";
import products from "../assets/icons/svg/product.svg";
// import delivery from "../assets/icons/svg/delivery.svg";
import manufacture from "../assets/icons/svg/manufacture.svg";
import returnicon from "../assets/icons/svg/return.svg";
import invoice from "../assets/icons/svg/invoice.svg";
import orders from "../assets/icons/svg/order.svg";
import report from "../assets/icons/svg/report.svg";
// import latestactivity from "../assets/icons/svg/latestactivity.svg";
// import chat from "../assets/icons/svg/chat.svg";
import settings from "../assets/icons/svg/settings.svg";
import ebusiness from "../assets/images/png/ebusiness.svg";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import { Collapse } from "reactstrap";

const SideBar = (props) => {
	const [isOpenHRM, setIsOpenHRM] = useState(false);
	const [isOpenCustomers, setIsOpenCustomers] = useState(false);
	const [isOpenManufacture, setIsOpenManufacture] = useState(false);
	const [isOpenReturn, setIsOpenReturn] = useState(false);
	const [isOpenInvoice, setIsOpenInvoice] = useState(false);
	const [isOpenReport, setIsOpenReport] = useState(false);
	const [isOpenOrders, setIsOpenOrders] = useState(false);
	const [isOpenProducts, setIsOpenProducts] = useState(false);
	const location = useLocation();

	const handleAll = () => {
		setIsOpenCustomers(false);
		setIsOpenManufacture(false);
		setIsOpenReturn(false);
		setIsOpenInvoice(false);
		setIsOpenReport(false);
		setIsOpenOrders(false);
		setIsOpenHRM(false);
		setIsOpenProducts(false);
	};

	const handleHRM = () => {
		handleAll()
		setIsOpenHRM(!isOpenHRM);

	};
	const handleProducts = () => {
		handleAll()
		setIsOpenProducts(!isOpenProducts);

	};
	const handleCustomers = () => {
		handleAll()
		setIsOpenCustomers(!isOpenCustomers);
	};
	const handleManufacture = () => {
		handleAll()
		setIsOpenManufacture(!isOpenManufacture);
	};
	const handleReturn = () => {
		handleAll()
		setIsOpenReturn(!isOpenReturn);
	};
	const handleInvoice = () => {
		handleAll()
		setIsOpenInvoice(!isOpenInvoice);
	};
	const handleReport = () => {
		handleAll()
		setIsOpenReport(!isOpenReport);
	};
	const handleOrders = () => {
		handleAll()
		setIsOpenOrders(!isOpenOrders);
	};

	const TABS = [
		{
			isMultiPanel: false,
			name: "Dashboard",
			url: "/pharmacy/dashboard",
			image: dashboard,
			click: handleAll,
		},
		{
			isMultiPanel: true,
			name: "Invoices",
			url: "/pharmacy/invoices",
			image: invoice,
			click: handleInvoice,
			dropDownOpen: isOpenInvoice,
			dropDownLists: [
				{
					link: "/pharmacy/invoices/invoice-pos",
					name: "POS Invoice",
				},
				{
					link: "/pharmacy/invoices/invoice-list",
					name: "Invoice List",
				},
			],
		},
		{
			isMultiPanel: true,
			name: "Products",
			url: "/pharmacy/products",
			image: products,
			click: handleProducts,
			dropDownOpen: isOpenProducts,
			dropDownLists: [
				{
					link: "/pharmacy/products",
					name: "Products",
				},
				{
					link: "/pharmacy/products-approvals",
					name: "Products Approvals",
				},
			],
		},
		{
			isMultiPanel: true,
			name: "Orders",
			url: "/pharmacy/orders",
			image: orders,
			click: handleOrders,
			dropDownOpen: isOpenOrders,
			dropDownLists: [
				{
					link: "/pharmacy/orders",
					name: "Orders",
				},
				{
					link: "/pharmacy/orders/prescription",
					name: "Prescriptions",
				},
			],
		},
		{
			isMultiPanel: false,
			name: "Sales/Payments",
			url: "/pharmacy/sales",
			image: sales,
			click: handleAll,
		},
		{
			isMultiPanel: true,
			name: "Returns",
			url: "/pharmacy/returns",
			image: returnicon,
			click: handleReturn,
			dropDownOpen: isOpenReturn,
			dropDownLists: [
				{
					link: "/pharmacy/returns/add-return",
					name: "Add Return",
				},
				{
					link: "/pharmacy/returns/invoice-return-list",
					name: "Invoice Return List",
				},
			],
		},
		{
			isMultiPanel: true,
			name: "HRM",
			url: "/pharmacy/hrm",
			image: hrm,
			click: handleHRM,
			dropDownOpen: isOpenHRM,
			dropDownLists: [
				{
					link: "/pharmacy/hrm/staff",
					name: "Staff",
				},
			],
		},
		{
			isMultiPanel: true,
			name: "Customers",
			url: "/pharmacy/customers",
			image: customers,
			click: handleCustomers,
			dropDownOpen: isOpenCustomers,
			dropDownLists: [
				{
					link: "/pharmacy/customers/add-customers",
					name: "Add Customer",
				},
				{
					link: "/pharmacy/customers/customers-list",
					name: "Customer List",
				},
			],
		},
		{
			isMultiPanel: true,
			name: "Wholesaler",
			url: "/pharmacy/manufacturer",
			image: manufacture,
			click: handleManufacture,
			dropDownOpen: isOpenManufacture,
			dropDownLists: [
				{
					link: "/pharmacy/manufacturer/add-manufacturer",
					name: "Add Wholesaler",
				},
				{
					link: "/pharmacy/manufacturer/manufacturer-list",
					name: "Wholesaler List",
				},
			],
		},
		{
			isMultiPanel: true,
			name: "Reports",
			url: "/pharmacy/reports",
			image: report,
			click: handleReport,
			dropDownOpen: isOpenReport,
			dropDownLists: [
				{
					link: "/pharmacy/reports/report-dashboard",
					name: "Report Dashboard",
				},
				{
					link: "/pharmacy/reports/sales-report",
					name: "Sales Report",
				},
				{
					link: "/pharmacy/reports/inventory-report",
					name: "Inventory Report",
				},
			],
		},
		{
			isMultiPanel: false,
			name: "Settings",
			url: "/pharmacy/settings",
			image: settings,
			click: handleAll,
		},
	];

	return (
		<>
			<div className="img-header mt-md-5 mx-0 d-flex">
				<Link to="/pharmacy/dashboard" onClick={handleAll}>
					<img
						src={ebusiness}
						alt="Dashboard"
						// width={120}
						className="mx-md-auto d-block w-50 text-md-center"
					/>
				</Link>
			</div>
			<div className="my-md-5 mt-2">
				{TABS.map(
					(
						{
							isMultiPanel,
							name,
							url,
							image,
							dropDownLists,
							dropDownOpen,
							click,
						},
						index
					) => (
						<div key={index}>
							{!isMultiPanel ? (
								<NavLink
									onClick={click}
									to={`${url}`}
									className="links move-left d-flex align-items-start flex-column"
									style={({ isActive }) => ({
										borderTopLeftRadius: "50px",
										borderBottomLeftRadius: "50px",
										backgroundColor: isActive ? "#f3f4ff" : "transparent",
									})}>
									<NavLink
										to={`${url}`}
										className="p-3 d-flex align-items-center justify-content-between hovered">
										<div className="group text-nowrap">
											<img src={image} alt="" width={25} />
											<b
												className="text-deep mx-lg-4 mx-2"
												style={{
													color: location.pathname.startsWith(`${url}`)
														? "#303972"
														: "#c1bbeb",
												}}>
												{name}
											</b>
										</div>
									</NavLink>
								</NavLink>
							) : (
								<>
									<div
										className="d-flex move-left links align-items-start flex-column"
										// isActive={location.pathname.startsWith(url)}
										style={{
											borderTopLeftRadius: "50px",
											borderBottomLeftRadius: "50px",
											backgroundColor: location.pathname.startsWith(url)
												? "#F3F4FF"
												: "#FFFFFF",
										}}>
										<div
											className="link p-3 d-flex align-items-center justify-content-between"
											onClick={click}>
											<div className="group text-nowrap">
												<img src={image} alt="" width={25} />
												<b
													className="text-deep mx-lg-4 mx-2"
													style={{
														color: location.pathname.startsWith(`${url}`)
															? "#303972"
															: "#c1bbeb",
													}}>
													{name}
												</b>
											</div>
											{dropDownOpen ? <BsChevronDown /> : <BsChevronRight />}
										</div>
										<Collapse isOpen={dropDownOpen}>
											<div className="sublinks">
												{dropDownLists?.map(({ link, name }, index) => (
													<Link
														key={index}
														to={link}
														className="sublink"
														style={{
															color: location.pathname.startsWith(link)
																? "#303972"
																: "#c1bbeb",
														}}>
														{name}
													</Link>
												))}
											</div>
										</Collapse>
									</div>
								</>
							)}
						</div>
					)
				)}
			</div>
		</>
	);
};

export default SideBar;
