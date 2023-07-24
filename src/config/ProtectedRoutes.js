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
import { userInfo } from "../app/features/authSlice/authSlice";

const ProtectedRoutes = ({ allowedRoles = ["dashboard", "isAdmin"] }) => {
  const priviledges = JSON.parse(sessionStorage.getItem("priviledges"));
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTime, setActiveTime] = useState(Date.now());
  const TIMEOUT_DURATION = 15 * 60 * 1000;

  const logout = () => {
    navigate("/login");
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      const timeSinceLastActive = Date.now() - activeTime;
      if (timeSinceLastActive >= TIMEOUT_DURATION) {
        logout();
      }
    }, TIMEOUT_DURATION);

    document.addEventListener("mouseover", () => {
      setActiveTime(Date.now());
    });
    document.addEventListener("keydown", () => {
      setActiveTime(Date.now());
    });

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousedown", () => {
        setActiveTime(Date.now());
      });
      document.removeEventListener("keydown", () => {
        setActiveTime(Date.now());
      });
    };
  }, [activeTime, logout]);

  const roles = [];
  for (let role in allowedRoles) {
    roles.push(allowedRoles[role]);
  }
  const privileges = [];
  for (let role in priviledges) {
    privileges.push(priviledges[role]);
  }

  const { results } = useSelector(userInfo);
  console.log(results);

  return (
    <>
      {results?.data?.owner_privileges ||
      results?.data?.owner_privileges?.find((role) =>
        allowedRoles?.includes(role)
      ) ? (
        <Outlet />
      ) : results.token ? (
        <Navigate to="/unauthorized" replace />
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoutes;
