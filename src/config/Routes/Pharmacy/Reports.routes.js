import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import Home from "../pages/Home";
import ReportDashboard from "../../../pages/Pharmacy/Reports/ReportDashboard";
import UserSalesReport from "../../../pages/Pharmacy/Reports/UserSalesReport";
import ProductsSalesReport from "../../../pages/Pharmacy/Reports/ProductsSalesReport";
import CategorySalesReport from "../../../pages/Pharmacy/Reports/CategorySalesReport";
import ReportCustomerReviews from "../../../pages/Pharmacy/Reports/ReportCustomerReviews";
import CustomerMapLocationDetails from "../../../pages/Pharmacy/Reports/CustomerMapLocationDetails";
import ActivityLog from "../../../pages/Pharmacy/Reports/ActivityLog";
import ReportDelivery from "../../../pages/Pharmacy/Reports/ReportDelivery";
import PurchaseReport from "../../../pages/Pharmacy/Reports/PurchaseReport";
import PurchaseReportCategory from "../../../pages/Pharmacy/Reports/PurchaseReportCategory";
import SalesReport from "../../../pages/Pharmacy/Reports/SalesReport";
import InventoryReport from "../../../pages/Pharmacy/Reports/InventoryReport";
const ReportsRoutes = () => {
	return (
		<Routes>
			<Route
				path="report-dashboard-customer-reviews"
				element={<ReportCustomerReviews />}
			/>
			<Route path="report-dashboard" element={<ReportDashboard />} />
			<Route path="sales-report" element={<SalesReport />} />
			<Route path="sales-report/user" element={<UserSalesReport />} />
			<Route
				path="sales-report/products"
				element={<ProductsSalesReport />}
			/>
			<Route
				path="sales-report/category"
				element={<CategorySalesReport />}
			/>
			<Route
				path="customer-map-location-details"
				element={<CustomerMapLocationDetails />}
			/>
			<Route path="activity-log" element={<ActivityLog />} />
			<Route path="delivery-reports" element={<ReportDelivery />} />
			<Route path="purchase-reports" element={<PurchaseReport />} />
			<Route
				path="purchase-reports/category"
				element={<PurchaseReportCategory />}
			/>
			<Route path="inventory-report" element={<InventoryReport />} />
            <Route path="*" element={<Navigate to="/error" />} />

		</Routes>
	);
};

export default ReportsRoutes;
