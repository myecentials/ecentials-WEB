import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import Home from "../pages/Home";
import InvoiceReturnDetails from "../../../pages/Pharmacy/Returns/InvoiceReturnDetails";
import ManufacturerReturnList from "../../../pages/Pharmacy/Returns/ManufacturerReturnList";
import InvoiceListReturn from "../../../pages/Pharmacy/Returns/InvoiceListReturn";
import AddReturn from "../../../pages/Pharmacy/Returns/AddReturn";
const ReturnsRoutes = () => {
	return (
		<Routes>
			<Route
				path="manufacturer-return-list"
				element={<ManufacturerReturnList />}
			/>
			<Route
				path="invoice-return-list"
				element={<InvoiceListReturn />}
			/>
			<Route
				path="invoice-return-details"
				element={<InvoiceReturnDetails />}
			/>
			<Route path="add-return" element={<AddReturn />} />
            <Route path="*" element={<Navigate to="/error" />} />

		</Routes>
	);
};

export default ReturnsRoutes;
