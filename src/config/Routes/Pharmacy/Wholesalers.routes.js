import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import Home from "../pages/Home";
import AddManufacturer from "../../../pages/Pharmacy/Manufacturer/AddManufacturer";
import EditManufacturer from "../../../pages/Pharmacy/Manufacturer/EditManufacturer";
import ManufacturerList from "../../../pages/Pharmacy/Manufacturer/ManufacturerList";
import ManufacturerLedger from "../../../pages/Pharmacy/Manufacturer/ManufacturerLedger";
const WholesalersRoutes = () => {
	return (
		<Routes>
			<Route
				path="add-manufacturer"
				element={<AddManufacturer />}
			/>
			<Route
				path="edit-manufacturer"
				element={<EditManufacturer />}
			/>
			<Route
				path="manufacturer-list"
				element={<ManufacturerList />}
			/>
			<Route
				path="manufacturer-ledger"
				element={<ManufacturerLedger />}
			/>
            			<Route path="*" element={<Navigate to="/error" />} />

		</Routes>
	);
};

export default WholesalersRoutes;
