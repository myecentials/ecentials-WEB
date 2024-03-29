import React, { useEffect } from "react";
import { useState } from "react";
import {
  // Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import { Modal, ModalBody } from "reactstrap";
// import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { userInfo,getOwnerPrivileges } from "../app/features/authSlice/authSlice";

const ProtectedRoutes = ({ allowedRoles = ["dashboard", "isAdmin"] }) => {
  const priviledges = useSelector(getOwnerPrivileges);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTime, setActiveTime] = useState(Date.now());
  const TIMEOUT_DURATION = 15 * 60 * 1000;

 
 

  useEffect(() => {
    const logout = () => {
      navigate("/login");
    };
    const timeout = setTimeout(() => {
      const timeSinceLastActive = Date.now() - activeTime;
      if (timeSinceLastActive >= TIMEOUT_DURATION) {
        logout();
        // return;
      }
    }, TIMEOUT_DURATION);
  
    const updateActiveTime = () => {
      setActiveTime(Date.now());
    };
  
    document.removeEventListener("mouseover", updateActiveTime);
    document.removeEventListener("keydown", updateActiveTime);
  
    document.addEventListener("mouseover", updateActiveTime);
    document.addEventListener("keydown", updateActiveTime);
  
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseover", updateActiveTime);
      document.removeEventListener("keydown", updateActiveTime);
    };
  }, [TIMEOUT_DURATION, activeTime, navigate]);
  
  
  const { results } = useSelector(userInfo);
  
    const hasRequiredRole = allowedRoles.some((role) =>
      priviledges?.includes(role)
    );

   
  
    if (!results?.token) {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  
    if (!hasRequiredRole) {
      return <Navigate to="/pharmacy/unauthorized" />;
    }
    if(hasRequiredRole){
      return <Outlet />;

    }
  

    // return (
    //   <>
    //     {  (hasRequiredRole  ) ? (
    //       <Outlet />
    //     ) : results?.token ? (
    //       <Navigate to="/pharmacy/unauthorized"  />
    //     ) : (
    //       <Navigate to="/login" replace state={{ from: location }} />
    //     )}
    //   </>
    // );
};

export default ProtectedRoutes;

// const roles = [];
// for (let role in allowedRoles) {
//   roles.push(allowedRoles[role]);
// }
// const privileges = [];
// for (let role in priviledges) {
//   privileges.push(priviledges[role]);
// }

// const { results } = useSelector(userInfo);
// // const location = useLocation();

// return (
//   <>
//     {results?.data?.owner_privileges ||
//       results?.data?.owner_privileges?.find((role) =>
//         allowedRoles?.includes(role)
//       ) ? (
//       <Outlet />
//     ) : results?.token ? (
//       <Navigate to="/unauthorized" replace state={{ from: location }} />
//     ) : (
  //       <Navigate to="/login" replace state={{ from: location }} />
//     )}
//   </>
// );


  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     const timeSinceLastActive = Date.now() - activeTime;
  //     if (timeSinceLastActive >= TIMEOUT_DURATION) {
  //       logout();
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