import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { BASE_URL } from "../../private/keys";
import { useSelector } from "react-redux";
import { userInfo } from "../../app/features/authSlice/authSlice";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "auth-token": sessionStorage.getItem("userToken"),
  },
});
                             