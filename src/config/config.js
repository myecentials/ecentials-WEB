import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
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

const Config = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/signup/hospital-signup" element={<HospitalSignup />} />
        <Route path="/signup/store-signup" element={<StoreSignup />} />
        <Route path="/signup/ambulance-signup" element={<AmbulanceSignup />} />
        <Route path="/signup/delivery-signup" element={<DeliverySignup />} />
        <Route path="/signup/lab-signup" element={<LabSignup />} />
        <Route path="/signup/id-created" element={<IDCreated />} />
        <Route path="/hrm/staff" element={<Staff />} />
        <Route path="/hrm/staff/name" element={<StaffDetails />} />
        <Route path="/hrm/staff/name/edit" element={<EditProfile />} />
        <Route path="/hrm/staff/add-new-staff" element={<AddNewStaff />} />
        <Route path="/hrm/org-chart" element={<OrgChart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/category" element={<Category />} />
        <Route path="/products/add-categories" element={<AddCategory />} />
        <Route path="/products/add-products" element={<AddProducts />} />
        <Route path="/delivery/orders" element={<Delivery />} />
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
        <Route path="/reports/report-dashboard" element={<ReportDashboard />} />
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
        <Route path="/sales" element={<Sales />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/add-invoice" element={<AddInvoice />} />
        <Route path="/invoice-pos" element={<InvoicePOS />} />
        <Route path="/invoice-list" element={<InvoiceList />} />
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
        <Route path="/customers/customer-ledger" element={<CustomerLedger />} />
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
      </Routes>
    </BrowserRouter>
  );
};

export default Config;
