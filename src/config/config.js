/* eslint-disable no-lone-blocks */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Dashboard from "../pages/Pharmacy/Dashboard/Dashboard";
import Error from "../pages/Error";
import HospitalSignup from "../pages/signupscreens/Hospital";
import StoreSignup from "../pages/signupscreens/Store";
import AmbulanceSignup from "../pages/signupscreens/Ambulance";
import DeliverySignup from "../pages/signupscreens/Delivery";
import LabSignup from "../pages/signupscreens/Lab";
import IDCreated from "../pages/Auth/IDCreated";
import Settings from "../pages/Pharmacy/Dashboard/Settings";
import Staff from "../pages/Pharmacy/HRM/Staff";
// import Home from "../pages/Home";
import StaffDetails from "../pages/Pharmacy/HRM/StaffDetails";
import EditProfile from "../pages/Pharmacy/HRM/EditProfile";
import AddNewStaff from "../pages/Pharmacy/HRM/AddNewStaff";
import OrgChart from "../pages/Pharmacy/HRM/OrgChart";
import Products from "../pages/Pharmacy/Products/Products";
import AddCategory from "../pages/Pharmacy/Products/AddCategory";
import AddProducts from "../pages/Pharmacy/Products/AddProducts";
import Category from "../pages/Pharmacy/Products/Category";
import Delivery from "../pages/Delivery/Delivery";
import AssignDelivery from "../pages/Delivery/AssignDelivery";
import OrderId from "../pages/Delivery/OrderId";
import OrdersTable from "../pages/Pharmacy/Orders/Orders";
import UnassignedOrderId from "../pages/Delivery/UnassignedOrderId";
import BOL from "../pages/Delivery/BOL";
import OrderDetails from "../pages/Pharmacy/Orders/OrderDetails";
import ReportDashboard from "../pages/Pharmacy/Reports/ReportDashboard";
import Sales from "../pages/Pharmacy/Sales/Sales";
import Chat from "../pages/Chat/Chat";
import InvoiceList from "../pages/Pharmacy/Invoice/InvoiceList";
import InvoiceReturnDetails from "../pages/Pharmacy/Returns/InvoiceReturnDetails";
import MailInvoice from "../pages/Pharmacy/Invoice/MailInvoice";
import AddCustomers from "../pages/Pharmacy/Customers/AddCustomer";
import CustomerList from "../pages/Pharmacy/Customers/CustomerList";
import AddInvoice from "../pages/Pharmacy/Invoice/AddInvoice";
import InvoicePOS from "../pages/Pharmacy/Invoice/InvoicePOS";
import CustomerLedger from "../pages/Pharmacy/Customers/CustomerLedger";
import AddManufacturer from "../pages/Pharmacy/Manufacturer/AddManufacturer";
import EditManufacturer from "../pages/Pharmacy/Manufacturer/EditManufacturer";
import ManufacturerList from "../pages/Pharmacy/Manufacturer/ManufacturerList";
import ManufacturerLedger from "../pages/Pharmacy/Manufacturer/ManufacturerLedger";
import ManufacturerReturnList from "../pages/Pharmacy/Returns/ManufacturerReturnList";
import InvoiceListReturn from "../pages/Pharmacy/Returns/InvoiceListReturn";
import InvoiceListID from "../pages/Pharmacy/Invoice/InvoiceListID";
import AddReturn from "../pages/Pharmacy/Returns/AddReturn";
import UserSalesReport from "../pages/Pharmacy/Reports/UserSalesReport";
import ProductsSalesReport from "../pages/Pharmacy/Reports/ProductsSalesReport";
import CategorySalesReport from "../pages/Pharmacy/Reports/CategorySalesReport";
import ReportCustomerReviews from "../pages/Pharmacy/Reports/ReportCustomerReviews";
import CustomerMapLocationDetails from "../pages/Pharmacy/Reports/CustomerMapLocationDetails";
import ActivityLog from "../pages/Pharmacy/Reports/ActivityLog";
import ReportDelivery from "../pages/Pharmacy/Reports/ReportDelivery";
import PurchaseReport from "../pages/Pharmacy/Reports/PurchaseReport";
import PurchaseReportCategory from "../pages/Pharmacy/Reports/PurchaseReportCategory";
import SalesReport from "../pages/Pharmacy/Reports/SalesReport";
import InventoryReport from "../pages/Pharmacy/Reports/InventoryReport";
import OwnerDetails from "../pages/Auth/OwnerDetails";
import PharmacyProtectedRoutes from "./PharmacyProtectedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import EditProduct from "../pages/Pharmacy/Products/EditProduct";
import Prescription from "../pages/Pharmacy/Orders/Prescribtion";
import ProcessPrescription from "../pages/Pharmacy/Orders/ProcessPrescription";
import InvoiceDetails from "../pages/Pharmacy/Invoice/InvoiceDetails";
import ForgotPaasword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import Unauthorized from "../pages/Pharmacy/Unauthorized/Unauthorized";
import HospitalDashboard from "../pages/Hospital/HospitalDashboard";
import DoctorsDashboard from "../pages/Hospital/DoctorsDashboard/DoctorsDashboard";
import Appointments from "../pages/Hospital/DoctorsDashboard/Schedules/Appointments";
import PendingAppointments from "../pages/Hospital/DoctorsDashboard/Schedules/PendingAppointment";
import HSettings from "../pages/Hospital/Settings";
import HStaff from "../pages/Hospital/Staff";
import HAddStaff from "../pages/Hospital/AddNewStaff";
import EditHospitalStaff from "../pages/Hospital/EditHospitalStaff";
import MassUpload from "../pages/Pharmacy/Products/MassUpload";
import ProductDetails from "../pages/Pharmacy/Products/ProductDetails";
import EditCustomer from "../pages/Pharmacy/Customers/EditCustomer";
import MassUploadDetail from "../pages/Pharmacy/Products/MassUploadDetail";
import BarcodeScan from "../pages/Pharmacy/Products/BarcodeScan";
import Pharmacy from "../pages/Pharmacy";
const Config = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<OwnerDetails />} />
					<Route path="login" element={<Login />} />
					<Route path="/forgot-password" element={<ForgotPaasword />} />
					<Route path="/reset-password" element={<ResetPassword />} />

					{/* PROTECTED ROUTES */}
					<Route element={<ProtectedRoutes />}>
						<Route path="signup" element={<Signup />} />
						<Route path="/signup/store-signup" element={<StoreSignup />} />

					<Route path="/signup/hospital-signup" element={<HospitalSignup />} />
					<Route
						path="/signup/ambulance-signup"
						element={<AmbulanceSignup />}
					/>
					<Route path="/signup/delivery-signup" element={<DeliverySignup />} />
					<Route path="/signup/lab-signup" element={<LabSignup />} />
					<Route path="/signup/id-created" element={<IDCreated />} />

					</Route>

					<Route path="/chat" element={<Chat />} />

					{/* ----------------------------------------------------------PHARMACY ----------------------------------------------------------------*/}
					<Route path="/pharmacy" element={<Pharmacy />}>
						{/**Settinggs */}
						<Route path="unauthorized" element={<Unauthorized />} />
						<Route
							element={
								<PharmacyProtectedRoutes allowedRoles={["isAdmin", "settings"]} />
							}>
								<Route path="settings" element={<Settings />} />
							
						</Route>

						{/**Dashboard */}
						<Route
							element={
								<PharmacyProtectedRoutes allowedRoles={["isAdmin", "dashboard"]} />
							}>
							<Route path="dashboard" element={<Dashboard />} />
						</Route>

						{/**HRM */}
						<Route
							element={<PharmacyProtectedRoutes allowedRoles={["isAdmin", "hrm"]} />}>
							<Route path="hrm/staff" element={<Staff />} />
							<Route path="hrm/staff/:name" element={<StaffDetails />} />
							<Route path="hrm/staff/:name/edit" element={<EditProfile />} />
							<Route path="hrm/staff/add-new-staff" element={<AddNewStaff />} />
							<Route path="hrm/org-chart" element={<OrgChart />} />
						</Route>

						{/**Products */}
						<Route
							element={
								<PharmacyProtectedRoutes allowedRoles={["isAdmin", "products"]} />
							}>
							<Route path="products" element={<Products />} />
							<Route path="products/mass-upload" element={<MassUpload />} />
							<Route
								path="products/mass-upload-details"
								element={<MassUploadDetail />}
							/>
							<Route path="products/category" element={<Category />} />
							<Route path="products/add-categories" element={<AddCategory />} />
							<Route path="products/add-products" element={<AddProducts />} />
							<Route path="products/:slug" element={<ProductDetails />} />
							<Route path="products/edit-product" element={<EditProduct />} />
							<Route path="products/barcode-scan" element={<BarcodeScan />} />
						</Route>

						{/* O ORDERS */}
						<Route
							element={
								<PharmacyProtectedRoutes allowedRoles={["isAdmin", "orders"]} />
							}>
							<Route path="delivery/orders" element={<Delivery />} />
							<Route path="orders/prescription" element={<Prescription />} />
							<Route
								path="orders/prescription/process"
								element={<ProcessPrescription />}
							/>
							<Route
								path="delivery/orders/assign"
								element={<AssignDelivery />}
							/>
							<Route path="delivery/orders/order-id" element={<OrderId />} />
							<Route
								path="delivery/orders/assign/order-id"
								element={<UnassignedOrderId />}
							/>
							<Route path="delivery/orders/assign/bol" element={<BOL />} />
							<Route path="orders" element={<OrdersTable />} />
							<Route path="orders/order-details" element={<OrderDetails />} />
						</Route>

						{/* SALES */}
						<Route
							element={<PharmacyProtectedRoutes allowedRoles={["isAdmin", "sales"]} />}>
							<Route path="sales" element={<Sales />} />
						</Route>

						{/* INVOICE */}
						<Route
							element={
								<PharmacyProtectedRoutes allowedRoles={["isAdmin", "invoice"]} />
							}>
							<Route path="invoices/add-invoice" element={<AddInvoice />} />
							<Route path="invoices/invoice-pos" element={<InvoicePOS />} />
							<Route path="invoices/invoice-list" element={<InvoiceList />} />
							<Route
								path="invoices/invoice-details"
								element={<InvoiceDetails />}
							/>
							<Route
								path="invoice-list/invoice-list-id"
								element={<InvoiceListID />}
							/>
							<Route
								path="invoice-list/invoice-id/email-invoice"
								element={<MailInvoice />}
							/>
						</Route>
						{/* CUSTOMERS */}
						<Route
							element={
								<PharmacyProtectedRoutes allowedRoles={["isAdmin", "customers"]} />
							}>
							<Route
								path="customers/add-customers"
								element={<AddCustomers />}
							/>
							<Route
								path="customers/customers-list"
								element={<CustomerList />}
							/>
							<Route
								path="customers/edit-customer"
								element={<EditCustomer />}
							/>
							<Route
								path="customers/customer-ledger"
								element={<CustomerLedger />}
							/>
						</Route>

						{/* WHOLESALER */}
						<Route
							element={
								<PharmacyProtectedRoutes allowedRoles={["isAdmin", "wholesalers"]} />
							}>
							<Route
								path="manufacturer/add-manufacturer"
								element={<AddManufacturer />}
							/>
							<Route
								path="manufacturer/edit-manufacturer"
								element={<EditManufacturer />}
							/>
							<Route
								path="manufacturer/manufacturer-list"
								element={<ManufacturerList />}
							/>
							<Route
								path="manufacturer/manufacturer-ledger"
								element={<ManufacturerLedger />}
							/>
						</Route>
						{/**Returns */}
						<Route
							element={
								<PharmacyProtectedRoutes allowedRoles={["isAdmin", "returns"]} />
							}>
							<Route
								path="returns/manufacturer-return-list"
								element={<ManufacturerReturnList />}
							/>
							<Route
								path="returns/invoice-return-list"
								element={<InvoiceListReturn />}
							/>
							<Route
								path="returns/invoice-return-details"
								element={<InvoiceReturnDetails />}
							/>
							<Route path="returns/add-return" element={<AddReturn />} />
						</Route>

						{/**Reports */}
						<Route
							element={
								<PharmacyProtectedRoutes allowedRoles={["isAdmin", "reports"]} />
							}>
							<Route
								path="reports/report-dashboard-customer-reviews"
								element={<ReportCustomerReviews />}
							/>
							<Route
								path="reports/report-dashboard"
								element={<ReportDashboard />}
							/>
							<Route path="reports/sales-report" element={<SalesReport />} />
							<Route
								path="reports/sales-report/user"
								element={<UserSalesReport />}
							/>
							<Route
								path="reports/sales-report/products"
								element={<ProductsSalesReport />}
							/>
							<Route
								path="reports/sales-report/category"
								element={<CategorySalesReport />}
							/>
							<Route
								path="reports/customer-map-location-details"
								element={<CustomerMapLocationDetails />}
							/>
							<Route path="reports/activity-log" element={<ActivityLog />} />
							<Route
								path="reports/delivery-reports"
								element={<ReportDelivery />}
							/>
							<Route
								path="reports/purchase-reports"
								element={<PurchaseReport />}
							/>
							<Route
								path="reports/purchase-reports/category"
								element={<PurchaseReportCategory />}
							/>
							<Route
								path="reports/inventory-report"
								element={<InventoryReport />}
							/>
						</Route>
					</Route>


					{/* ------------------------------------------------------------------- */}
					{/* HOSPITAL ROUTES GOES HERE 👇👇👇👇👇 */}
					{/* ------------------------------------------------------------------- */}
					<Route path="/hospital/dashboard" element={<HospitalDashboard />} />
					<Route
						path="/hospital/doctors/dashboard"
						element={<DoctorsDashboard />}
					/>
					<Route
						path="/hospital/doctors/appointments"
						element={<Appointments />}
					/>
					<Route
						path="/hospital/doctors/pending-appointments"
						element={<PendingAppointments />}
					/>

					{/* Settings */}
					<Route path="/hospital/settings" element={<HSettings />} />

					{/* Hospital Management */}
					<Route path="/hospital/management" element={<HStaff />} />
					<Route
						path="/hospital/management/add-staff"
						element={<HAddStaff />}
					/>
					<Route
						path="/hospital/management/edit-staff"
						element={<EditHospitalStaff />}
					/>

					<Route path="*" element={<Error />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Config;


					{/* ONLY HRM */}

					{/* <Route
						element={<PharmacyProtectedRoutes allowedRoles={["isAdmin", "hrm"]} />}>
						<Route path="/hrm/staff" element={<Staff />} />
						<Route path="/hrm/staff/:name" element={<StaffDetails />} />
						<Route path="/hrm/staff/:name/edit" element={<EditProfile />} />
						<Route path="/hrm/staff/add-new-staff" element={<AddNewStaff />} />
						<Route path="/hrm/org-chart" element={<OrgChart />} />
					</Route> */}

					{/* ONLY PRODUCTS */}
					{/* <Route
						element={
							<PharmacyProtectedRoutes allowedRoles={["isAdmin", "products"]} />
						}>
						<Route path="/products" element={<Products />} />
						<Route path="/products/mass-upload" element={<MassUpload />} />
						<Route
							path="/products/mass-upload-details"
							element={<MassUploadDetail />}
						/>
						<Route path="/products/category" element={<Category />} />
						<Route path="/products/add-categories" element={<AddCategory />} />
						<Route path="/products/add-products" element={<AddProducts />} />
						<Route path="/products/:slug" element={<ProductDetails />} />
						<Route path="/products/edit-product" element={<EditProduct />} />
						<Route path="/products/barcode-scan" element={<BarcodeScan />} />
					</Route> */}

					{/* ONLY ORDERS */}
					{/* <Route
						element={<PharmacyProtectedRoutes allowedRoles={["isAdmin", "orders"]} />}>
						<Route path="/delivery/orders" element={<Delivery />} />
						<Route path="/orders/prescription" element={<Prescription />} />
						<Route
							path="/orders/prescription/process"
							element={<ProcessPrescription />}
						/>
						<Route
							path="/delivery/orders/assign"
							element={<AssignDelivery />}
						/>
						<Route path="/delivery/orders/order-id" element={<OrderId />} />
						<Route
							path="/delivery/orders/assign/order-id"
							element={<UnassignedOrderId />}
						/>
						<Route path="/delivery/orders/assign/bol" element={<BOL />} />
						<Route path="/orders" element={<OrdersTable />} />
						<Route path="/orders/order-details" element={<OrderDetails />} />
					</Route> */}

					{/* <Route
						element={<PharmacyProtectedRoutes allowedRoles={["isAdmin", "reports"]} />}>
					<Route
						path="/reports/report-dashboard-customer-reviews"
						element={<ReportCustomerReviews />}
					/>
					<Route
						path="/reports/report-dashboard"
						element={<ReportDashboard />}
					/>
					<Route path="/reports/sales-report" element={<SalesReport />} />
					<Route
						path="/reports/sales-report/user"
						element={<UserSalesReport />}
					/>
					<Route
						path="/reports/sales-report/products"
						element={<ProductsSalesReport />}
					/>
					<Route
						path="/reports/sales-report/category"
						element={<CategorySalesReport />}
					/>
					<Route
						path="/reports/customer-map-location-details"
						element={<CustomerMapLocationDetails />}
					/>
					<Route path="/reports/activity-log" element={<ActivityLog />} />
					<Route
						path="/reports/delivery-reports"
						element={<ReportDelivery />}
					/>
					<Route
						path="/reports/purchase-reports"
						element={<PurchaseReport />}
					/>
					<Route
						path="/reports/purchase-reports/category"
						element={<PurchaseReportCategory />}
					/>
					<Route
						path="/reports/inventory-report"
						element={<InventoryReport />}
					/>
</Route> */}
					{/* SALES */}
					{/* <Route
						element={<PharmacyProtectedRoutes allowedRoles={["isAdmin", "sales"]} />}>
						<Route path="/sales" element={<Sales />} />
					</Route> */}

					{/* <Route path="/chat" element={<Chat />} /> */}

					{/* INVOICE */}
					{/* <Route
						element={<PharmacyProtectedRoutes allowedRoles={["isAdmin", "invoice"]} />}>
						<Route path="/invoices/add-invoice" element={<AddInvoice />} />
						<Route path="/invoices/invoice-pos" element={<InvoicePOS />} />
						<Route path="/invoices/invoice-list" element={<InvoiceList />} />
						<Route
							path="/invoices/invoice-details"
							element={<InvoiceDetails />}
						/>
						<Route
							path="/invoice-list/invoice-list-id"
							element={<InvoiceListID />}
						/>
						<Route
							path="/invoice-list/invoice-id/email-invoice"
							element={<MailInvoice />}
						/>
					</Route> */}

					{/* CUSTOMERS */}
					{/* <Route
						element={
							<PharmacyProtectedRoutes allowedRoles={["isAdmin", "customers"]} />
						}>
						<Route path="/customers/add-customers" element={<AddCustomers />} />
						<Route
							path="/customers/customers-list"
							element={<CustomerList />}
						/>
						<Route path="/customers/edit-customer" element={<EditCustomer />} />
						<Route
							path="/customers/customer-ledger"
							element={<CustomerLedger />}
						/>
					</Route> */}

					{/* WHOLESALER
					<Route
						element={
							<PharmacyProtectedRoutes allowedRoles={["isAdmin", "wholesalers"]} />
						}>
						<Route
							path="/manufacturer/add-manufacturer"
							element={<AddManufacturer />}
						/>
						<Route
							path="/manufacturer/edit-manufacturer"
							element={<EditManufacturer />}
						/>
						<Route
							path="/manufacturer/manufacturer-list"
							element={<ManufacturerList />}
						/>
						<Route
							path="/manufacturer/manufacturer-ledger"
							element={<ManufacturerLedger />}
						/>
					</Route> */}

					{/* <Route
						element={<PharmacyProtectedRoutes allowedRoles={["isAdmin", "returns"]} />}>
						<Route
							path="/returns/manufacturer-return-list"
							element={<ManufacturerReturnList />}
						/>
						<Route
							path="/returns/invoice-return-list"
							element={<InvoiceListReturn />}
						/>
						<Route
							path="/returns/invoice-return-details"
							element={<InvoiceReturnDetails />}
						/>
						<Route path="/returns/add-return" element={<AddReturn />} />
					</Route> */}
					{/* <Route path="*" element={<Error />} /> */}