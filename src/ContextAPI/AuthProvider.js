import React, { createContext } from "react";
import { useState } from "react";
export const AuthContext = createContext({});
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [hospitalInfo, setHospitalInfo] = useState({});

  return (
    <AuthContext.Provider
      value={{ auth, hospitalInfo, setAuth, setHospitalInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
