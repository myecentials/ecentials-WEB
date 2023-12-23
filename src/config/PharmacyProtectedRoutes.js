import React, { useEffect } from "react";
import { useState } from "react";
import {
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { userInfo,getOwnerPrivileges } from "../app/features/authSlice/authSlice";

const ProtectedRoutes = ({ allowedRoles }) => {
  const priviledges = useSelector(getOwnerPrivileges);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTime, setActiveTime] = useState(Date.now());
  const TIMEOUT_DURATION = 15 * 60 * 1000;

  const logout = () => {
    navigate("/login");
  };
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     const timeSinceLastActive = Date.now() - activeTime;
  //     if (timeSinceLastActive >= TIMEOUT_DURATION) {
  //       logout();
  //       // return;
  //     }
  //   }, TIMEOUT_DURATION);
  
  //   const updateActiveTime = () => {
  //     setActiveTime(Date.now());
  //   };
  
  //   document.removeEventListener("mouseover", updateActiveTime);
  //   document.removeEventListener("keydown", updateActiveTime);
  
  //   document.addEventListener("mouseover", updateActiveTime);
  //   document.addEventListener("keydown", updateActiveTime);
  
  //   return () => {
  //     clearTimeout(timeout);
  //     document.removeEventListener("mouseover", updateActiveTime);
  //     document.removeEventListener("keydown", updateActiveTime);
  //   };
  // }, [activeTime, logout]);
  
  
  const { results } = useSelector(userInfo);
  
    const hasRequiredRole = allowedRoles.some((role) =>
      priviledges?.includes(role)
    );
  
    return (
      <>
        {  hasRequiredRole ? (
          <Outlet />
        ) : (
          <Navigate to="/unauthorized"  />
        )}
      </>
    );
};
