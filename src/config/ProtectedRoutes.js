import React from "react";
import { useState } from "react";
import { Route, Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth);
  // const res = auth.token ? <Outlet /> : <Navigate to="/login" replace />;
  return <>{auth.token ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default ProtectedRoutes;
