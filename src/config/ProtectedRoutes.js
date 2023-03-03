import React, { useEffect } from "react";
import { useState } from "react";
import {
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTime, setActiveTime] = useState(Date.now());
  const TIMEOUT_DURATION = 1 * 60 * 1000;

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
  // const res = auth.token ? <Outlet /> : <Navigate to="/login" replace />;
  return (
    <>
      {sessionStorage.getItem("userToken") ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoutes;
