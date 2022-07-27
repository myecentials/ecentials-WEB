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
import Database from "../pages/Dashboard/Database";
import Panel from "../pages/Dashboard/Panel";
import Language from "../pages/Dashboard/Language";
import Staff from "../pages/HRM/Staff";
import Home from "../pages/Home";
import activeStaff from "../static/activeStaff";
import StaffDetails from "../pages/HRM/StaffDetails";

const Config = () => {
  let route = "/hrm/staff/";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/settings/import-database" element={<Database />} />
        <Route path="/settings/panel-settings" element={<Panel />} />
        <Route path="/settings/language-settings" element={<Language />} />
        <Route path="/signup/hospital-signup" element={<HospitalSignup />} />
        <Route path="/signup/store-signup" element={<StoreSignup />} />
        <Route path="/signup/ambulance-signup" element={<AmbulanceSignup />} />
        <Route path="/signup/delivery-signup" element={<DeliverySignup />} />
        <Route path="/signup/lab-signup" element={<LabSignup />} />
        <Route path="/signup/id-created" element={<IDCreated />} />
        <Route path="/hrm/staff" element={<Staff />} />
        <Route path="/hrm/staff/:name" element={<StaffDetails />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Config;
