import React from "react";
import { useState } from "react";
import { Route, Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { auth } = useAuth();
  const location = useLocation();

  // const res = auth.token ? <Outlet /> : <Navigate to="/login" replace />;
  return (
    <>
      {localStorage.getItem("userToken") ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoutes;
