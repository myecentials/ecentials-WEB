import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ auth, children }) => {
  return !auth ? <Navigate to="/login" replace /> : children;
};

export default ProtectedRoutes;
