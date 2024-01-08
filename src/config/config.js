/* eslint-disable no-lone-blocks */
import React from "react";
import { Route, Routes } from "react-router-dom";
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
// import Home from "../pages/Home";
import Delivery from "../pages/Delivery/Delivery";
import AssignDelivery from "../pages/Delivery/AssignDelivery";
import OrderId from "../pages/Delivery/OrderId";
import OrdersTable from "../pages/Pharmacy/Orders/Orders";
import UnassignedOrderId from "../pages/Delivery/UnassignedOrderId";
import BOL from "../pages/Delivery/BOL";
import OrderDetails from "../pages/Pharmacy/Orders/OrderDetails";
import Chat from "../pages/Chat/Chat";
import OwnerDetails from "../pages/Auth/OwnerDetails";
import PharmacyProtectedRoutes from "./PharmacyProtectedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Prescription from "../pages/Pharmacy/Orders/Prescribtion";
import ProcessPrescription from "../pages/Pharmacy/Orders/ProcessPrescription";
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
import Pharmacy from "../pages/Pharmacy";
import CustomersRoutes from "./Routes/Pharmacy/Customers.routes";
import HrmRoutes from "./Routes/Pharmacy/Hrm.routes.js";
import InvoicesRoutes from "./Routes/Pharmacy/Invoices.routes";
import ProductsRoutes from "./Routes/Pharmacy/Products.routes.js";
import ReportsRoutes from "./Routes/Pharmacy/Reports.routes";
import ReturnsRoutes from "./Routes/Pharmacy/Returns.routes";
import SalesRoutes from "./Routes/Pharmacy/Sales.routes";
import WholesalersRoutes from "./Routes/Pharmacy/Wholesalers.routes";
const Config = () => {
	return (
		<>
			{/* <BrowserRouter> */}
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
							<PharmacyProtectedRoutes
								allowedRoles={["isAdmin", "dashboard"]}
							/>
						}>
						<Route path="dashboard" element={<Dashboard />} />
					</Route>

					{/**HRM */}
					<Route
						element={
							<PharmacyProtectedRoutes allowedRoles={["isAdmin", "hrm"]} />
						}>
						<Route path="hrm/*" element={<HrmRoutes />} />
					</Route>

					{/**Products */}
					<Route
						element={
							<PharmacyProtectedRoutes allowedRoles={["isAdmin", "products"]} />
						}>
						<Route path="products/*" element={<ProductsRoutes />} />
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
						<Route path="delivery/orders/assign" element={<AssignDelivery />} />
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
						element={
							<PharmacyProtectedRoutes allowedRoles={["isAdmin", "sales"]} />
						}>
						<Route path="sales/*" element={<SalesRoutes />} />

						{/* <Route path="sales" element={<Sales />} /> */}
					</Route>

					{/* INVOICE */}
					<Route
						element={
							<PharmacyProtectedRoutes allowedRoles={["isAdmin", "invoice"]} />
						}>
						<Route path="invoices/*" element={<InvoicesRoutes />} />
					</Route>
					{/* CUSTOMERS */}
					<Route
						element={
							<PharmacyProtectedRoutes
								allowedRoles={["isAdmin", "customers"]}
							/>
						}>
						<Route path="customers/*" element={<CustomersRoutes />} />
					</Route>

					{/* WHOLESALER */}
					<Route
						element={
							<PharmacyProtectedRoutes
								allowedRoles={["isAdmin", "wholesalers"]}
							/>
						}>
						<Route path="manufacturer/*" element={<WholesalersRoutes />} />
					</Route>
					{/**Returns */}
					<Route
						element={
							<PharmacyProtectedRoutes allowedRoles={["isAdmin", "returns"]} />
						}>
						<Route path="returns/*" element={<ReturnsRoutes />} />
					</Route>

					{/**Reports */}
					<Route
						element={
							<PharmacyProtectedRoutes allowedRoles={["isAdmin", "reports"]} />
						}>
						<Route path="reports/*" element={<ReportsRoutes />} />
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
				<Route path="/hospital/management/add-staff" element={<HAddStaff />} />
				<Route
					path="/hospital/management/edit-staff"
					element={<EditHospitalStaff />}
				/>

				<Route path="*" element={<Error />} />
				<Route path="/error" element={<Error />} />
			</Routes>
			{/* </BrowserRouter> */}
		</>
	);
};

export default Config;

