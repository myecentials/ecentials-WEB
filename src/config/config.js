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

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Config;
