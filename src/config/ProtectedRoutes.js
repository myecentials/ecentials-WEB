import React from "react";
import { Route, Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ auth, children }) => {
  const location = useLocation();
  return auth ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
