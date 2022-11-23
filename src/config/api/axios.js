import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { BASE_URL } from "../../private/keys";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "auth-token": localStorage.getItem("userToken") },
});
