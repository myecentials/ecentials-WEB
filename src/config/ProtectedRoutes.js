import React from "react";
import { useState } from "react";
import { Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { loggedIn } from "../hooks/useAuthentication";
export const LoggedInContext = React.createContext();
const ProtectedRoutes = ({ auth = true, children }) => {
  return (
    <>
      auth ? <Outlet /> : <Navigate to="/login" replace />;
    </>
  );
};

export default ProtectedRoutes;
