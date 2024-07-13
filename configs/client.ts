import axios from "axios";
import { baseURL } from "./baseUrl";
import { toast } from "react-toastify";

const client = axios.create({
  baseURL: baseURL,
});

client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        toast.error("خطای داخلی");
      } else {
        toast.error(error.response.data.message);
      }
      return Promise.reject(error);
    }
  }
);

export default client;
