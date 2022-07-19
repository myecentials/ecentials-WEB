import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Home from "../pages/Home";
import Error from "../pages/Error";
import HospitalSignup from "../pages/signupscreens/Hospital";
import StoreSignup from "../pages/signupscreens/Store";
import AmbulanceSignup from "../pages/signupscreens/Ambulance";
import DeliverySignup from "../pages/signupscreens/Delivery";
import LabSignup from "../pages/signupscreens/Lab";
import IDCreated from "../pages/Auth/IDCreated";

const Config = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="/signup/hospital-signup" element={<HospitalSignup />} />
        <Route path="/signup/store-signup" element={<StoreSignup />} />
        <Route path="/signup/ambulance-signup" element={<AmbulanceSignup />} />
        <Route path="/signup/delivery-signup" element={<DeliverySignup />} />
        <Route path="/signup/lab-signup" element={<LabSignup />} />
        <Route
          path="/signup/hospital-signup/id-created"
          element={<IDCreated />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Config;
