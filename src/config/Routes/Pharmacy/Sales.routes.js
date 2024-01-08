import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sales from "../../../pages/Pharmacy/Sales/Sales";
const SalesRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Sales />} />
        <Route path="*" element={<Navigate to="/error" />} />

    </Routes>
  )
}

export default SalesRoutes