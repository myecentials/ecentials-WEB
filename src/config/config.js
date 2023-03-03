import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login, { LoggedInContext } from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Error from "../pages/Error";
import HospitalSignup from "../pages/signupscreens/Hospital";
import StoreSignup from "../pages/signupscreens/Store";
import AmbulanceSignup from "../pages/signupscreens/Ambulance";
import DeliverySignup from "../pages/signupscreens/Delivery";
import LabSignup from "../pages/signupscreens/Lab";
import IDCreated from "../pages/Auth/IDCreated";
import Settings from "../pages/Dashboard/Settings";
import Staff from "../pages/HRM/Staff";
import Home from "../pages/Home";
import StaffDetails from "../pages/HRM/StaffDetails";
import EditProfile from "../pages/HRM/EditProfile";
import AddNewStaff from "../pages/HRM/AddNewStaff";
import OrgChart from "../pages/HRM/OrgChart";
import Products from "../pages/Products/Products";
import AddCategory from "../pages/Products/AddCategory";
import AddProducts from "../pages/Products/AddProducts";
import Category from "../pages/Products/Category";
import Delivery from "../pages/Delivery/Delivery";
import AssignDelivery from "../pages/Delivery/AssignDelivery";
import OrderId from "../pages/Delivery/OrderId";
import OrdersTable from "../pages/Orders/Orders";
import UnassignedOrderId from "../pages/Delivery/UnassignedOrderId";
import BOL from "../pages/Delivery/BOL";
import OrderDetails from "../pages/Orders/OrderDetails";
import ReportDashboard from "../pages/Reports/ReportDashboard";
import Sales from "../pages/Sales/Sales";
import Chat from "../pages/Chat/Chat";
import InvoiceList from "../pages/Invoice/InvoiceList";
import MailInvoice from "../pages/Invoice/MailInvoice";
import AddCustomers from "../pages/Customers/AddCustomer";
import CustomerList from "../pages/Customers/CustomerList";
import AddInvoice from "../pages/Invoice/AddInvoice";
import InvoicePOS from "../pages/Invoice/InvoicePOS";
import CustomerLedger from "../pages/Customers/CustomerLedger";
import AddManufacturer from "../pages/Manufacturer/AddManufacturer";
import ManufacturerList from "../pages/Manufacturer/ManufacturerList";
import ManufacturerLedger from "../pages/Manufacturer/ManufacturerLedger";
import ManufacturerReturnList from "../pages/Returns/ManufacturerReturnList";
import InvoiceListReturn from "../pages/Returns/InvoiceListReturn";
import InvoiceListID from "../pages/Invoice/InvoiceListID";
import AddReturn from "../pages/Returns/AddReturn";
import UserSalesReport from "../pages/Reports/UserSalesReport";
import ProductsSalesReport from "../pages/Reports/ProductsSalesReport";
import CategorySalesReport from "../pages/Reports/CategorySalesReport";
import ReportCustomerReviews from "../pages/Reports/ReportCustomerReviews";
import CustomerMapLocationDetails from "../pages/Reports/CustomerMapLocationDetails";
import ActivityLog from "../pages/Reports/ActivityLog";
import ReportDelivery from "../pages/Reports/ReportDelivery";
import PurchaseReport from "../pages/Reports/PurchaseReport";
import PurchaseReportCategory from "../pages/Reports/PurchaseReportCategory";
import SalesReport from "../pages/Reports/SalesReport";
import InventoryReport from "../pages/Reports/InventoryReport";
import StaffLogin from "../pages/Auth/StaffLogin";
import StaffDashboard from "../pages/StaffPages/StaffDashboard";
import StaffDelivery from "../pages/StaffPages/StaffDelivery";
import StaffProfile from "../pages/StaffPages/StaffProfile";
import StaffAssignDelivery from "../pages/StaffPages/StaffAssignDelivery";
import StaffOrderID from "../pages/StaffPages/StaffOrderID";
import StaffBOL from "../pages/StaffPages/StaffBOL";
import StaffSales from "../pages/StaffPages/StaffSales";
import StaffMailInvoice from "../pages/StaffPages/StaffMailInvoice";
import StaffInvoiceList from "../pages/StaffPages/StaffInvoiceList";
import StaffInvoiceListID from "../pages/StaffPages/StaffInvoiceListId";
import StaffOrderDetails from "../pages/StaffPages/StaffOrderDetails";
import StaffAddInvoice from "../pages/StaffPages/StaffAddInvoice";
import StaffInvoicePOS from "../pages/StaffPages/StaffInvoicePOS";
import StaffAddReturn from "../pages/StaffPages/StaffAddReturn";
import StaffInvoiceListReturn from "../pages/StaffPages/StaffInvoiceListReturn";
import StaffManufacturerReturnList from "../pages/StaffPages/StaffManufacturerReturnList";
import StaffProducts from "../pages/StaffPages/StaffProducts";
import StaffAddCategory from "../pages/StaffPages/StaffAddCategory";
import StaffCategory from "../pages/StaffPages/StaffCategory";
import StaffAddProducts from "../pages/StaffPages/StaffAddProduct";
import StaffOrdersTable from "../pages/StaffPages/StaffOrders";
import StaffChat from "../pages/StaffPages/StaffChat";
import StaffAddCustomers from "../pages/StaffPages/StaffAddCustomers";
import StaffCustomerList from "../pages/StaffPages/StaffCustomerList";
import StaffCustomerLedger from "../pages/StaffPages/StaffCustomerLedger";
import OwnerDetails from "../pages/Auth/OwnerDetails";
import ProtectedRoutes from "./ProtectedRoutes";
import { useContext } from "react";
import EditProduct from "../pages/Products/EditProduct";
import Prescription from "../pages/Orders/Prescribtion";
import ProcessPrescription from "../pages/Orders/ProcessPrescription";
import InvoiceDetails from "../pages/Invoice/InvoiceDetails";
import { useEffect } from "react";
const Config = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* FREE ROUTES */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<OwnerDetails />} />
        <Route path="login" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoutes />}>
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/signup/store-signup" element={<StoreSignup />} />

          <Route path="admin-login" element={<StaffLogin />} />

          <Route path="staff-dashboard" element={<StaffDashboard />} />
          <Route path="staff-profile" element={<StaffProfile />} />
          <Route path="staff-delivery/orders" element={<StaffDelivery />} />
          <Route
            path="staff-delivery/orders/assign"
            element={<StaffAssignDelivery />}
          />
          <Route
            path="staff-delivery/orders/order-id"
            element={<StaffOrderID />}
          />
          <Route
            path="staff-delivery/orders/assign/bol"
            element={<StaffBOL />}
          />
          <Route
            path="staff-invoice-list/invoice-id/email-invoice"
            element={<StaffMailInvoice />}
          />
          <Route
            path="staff-invoice-list/invoice-id/invoice-list"
            element={<StaffInvoiceList />}
          />
          <Route
            path="staff-invoice-list/invoice-list-id"
            element={<StaffInvoiceListID />}
          />
          <Route
            path="/staff-orders/order-details"
            element={<StaffOrderDetails />}
          />
          <Route
            path="/staff-orders/order-details"
            element={<StaffOrderDetails />}
          />
          <Route
            path="/staff-returns/invoice-return-list"
            element={<StaffInvoiceListReturn />}
          />
          <Route
            path="/staff-returns/manufacturer-return-list"
            element={<StaffManufacturerReturnList />}
          />
          <Route path="/staff-products/category" element={<StaffCategory />} />
          <Route
            path="/staff-products/add-categories"
            element={<StaffAddCategory />}
          />
          <Route
            path="/staff-products/add-categories"
            element={<StaffAddCategory />}
          />
          <Route
            path="/staff-products/add-products"
            element={<StaffAddProducts />}
          />
          <Route
            path="/staff-orders/order-details"
            element={<StaffOrderDetails />}
          />
          <Route
            path="/staff-customers/add-customers"
            element={<StaffAddCustomers />}
          />
          <Route
            path="/staff-customers/customers-list"
            element={<StaffCustomerList />}
          />
          <Route
            path="/staff-customers/customer-ledger"
            element={<StaffCustomerLedger />}
          />
          <Route path="/staff-chat" element={<StaffChat />} />
          <Route path="/staff-products" element={<StaffProducts />} />
          <Route path="/staff-orders" element={<StaffOrdersTable />} />
          <Route
            path="/staff-returns/add-return"
            element={<StaffAddReturn />}
          />
          <Route path="/staff-invoice-pos" element={<StaffInvoicePOS />} />
          <Route path="staff-add-invoice" element={<StaffAddInvoice />} />
          <Route path="staff-sales" element={<StaffSales />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/signup/hospital-signup" element={<HospitalSignup />} />
          <Route
            path="/signup/ambulance-signup"
            element={<AmbulanceSignup />}
          />
          <Route path="/signup/delivery-signup" element={<DeliverySignup />} />
          <Route path="/signup/lab-signup" element={<LabSignup />} />
          <Route path="/signup/id-created" element={<IDCreated />} />
          <Route path="/hrm/staff" element={<Staff />} />
          <Route path="/hrm/staff/:name" element={<StaffDetails />} />
          <Route path="/hrm/staff/:name/edit" element={<EditProfile />} />
          <Route path="/hrm/staff/add-new-staff" element={<AddNewStaff />} />
          <Route path="/hrm/org-chart" element={<OrgChart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/category" element={<Category />} />
          <Route path="/products/add-categories" element={<AddCategory />} />
          <Route path="/products/add-products" element={<AddProducts />} />
          <Route path="/products/edit-product" element={<EditProduct />} />
          <Route path="/delivery/orders" element={<Delivery />} />
          <Route path="/orders/prescription" element={<Prescription />} />
          <Route
            path="/orders/prescription/process"
            element={<ProcessPrescription />}
          />
          <Route path="/delivery/orders/assign" element={<AssignDelivery />} />
          <Route path="/delivery/orders/order-id" element={<OrderId />} />
          <Route
            path="/delivery/orders/assign/order-id"
            element={<UnassignedOrderId />}
          />
          <Route path="/delivery/orders/assign/bol" element={<BOL />} />
          <Route path="/orders" element={<OrdersTable />} />
          <Route path="/orders/order-details" element={<OrderDetails />} />
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
          <Route path="/sales" element={<Sales />} />
          <Route path="/chat" element={<Chat />} />
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
          <Route path="/customers/add-customers" element={<AddCustomers />} />
          <Route path="/customers/customers-list" element={<CustomerList />} />
          <Route
            path="/customers/customer-ledger"
            element={<CustomerLedger />}
          />
          <Route
            path="/manufacturer/add-manufacturer"
            element={<AddManufacturer />}
          />
          <Route
            path="/manufacturer/manufacturer-list"
            element={<ManufacturerList />}
          />
          <Route
            path="/manufacturer/manufacturer-ledger"
            element={<ManufacturerLedger />}
          />
          <Route
            path="/returns/manufacturer-return-list"
            element={<ManufacturerReturnList />}
          />
          <Route
            path="/returns/invoice-return-list"
            element={<InvoiceListReturn />}
          />
          <Route path="/returns/add-return" element={<AddReturn />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Config;
