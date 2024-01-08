import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import Home from "../pages/Home";
import InvoiceList from "../../../pages/Pharmacy/Invoice/InvoiceList";
import MailInvoice from "../../../pages/Pharmacy/Invoice/MailInvoice";
import AddInvoice from "../../../pages/Pharmacy/Invoice/AddInvoice";
import InvoicePOS from "../../../pages/Pharmacy/Invoice/InvoicePOS";
import InvoiceListID from "../../../pages/Pharmacy/Invoice/InvoiceListID";
import InvoiceDetails from "../../../pages/Pharmacy/Invoice/InvoiceDetails";
const InvoicesRoutes = () => {
	return (
		<Routes>
			<Route path="add-invoice" element={<AddInvoice />} />
			<Route path="invoice-pos" element={<InvoicePOS />} />
			<Route path="invoice-list" element={<InvoiceList />} />
			<Route path="invoice-details" element={<InvoiceDetails />} />
			<Route path="invoice-list/invoice-list-id" element={<InvoiceListID />} />
			<Route
				path="invoice-list/invoice-id/email-invoice"
				element={<MailInvoice />}
			/>
            			<Route path="*" element={<Navigate to="/error" />} />

		</Routes>
	);
};

export default InvoicesRoutes;
