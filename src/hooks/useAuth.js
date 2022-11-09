import { useContext } from "react";
import { AuthContext } from "../ContextAPI/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
