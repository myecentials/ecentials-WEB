import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import Home from "../pages/Home";
import AddCustomers from "../../../pages/Pharmacy/Customers/AddCustomer";
import CustomerList from "../../../pages/Pharmacy/Customers/CustomerList";
import CustomerLedger from "../../../pages/Pharmacy/Customers/CustomerLedger";
import EditCustomer from "../../../pages/Pharmacy/Customers/EditCustomer";
const CustomersRoutes = () => {
	return (
		<Routes>
			<Route path="add-customers" element={<AddCustomers />} />
			<Route path="customers-list" element={<CustomerList />} />
			<Route path="edit-customer" element={<EditCustomer />} />
			<Route path="customer-ledger" element={<CustomerLedger />} />
            <Route path="*" element={<Navigate to="/error" />} />

		</Routes>
	);
};

export default CustomersRoutes;
