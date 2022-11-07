import axios from "axios";
import { BASE_URL } from "../../private/keys";

export default axios.create({
  baseURL: BASE_URL,
});
