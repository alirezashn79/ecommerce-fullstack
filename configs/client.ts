import axios from "axios";
import { baseURL } from "./baseUrl";
import { toast } from "react-toastify";

const client = axios.create({
  baseURL: baseURL,
});

client.interceptors.response.use(
  (res) => res,
  (error) => {
    toast.error("خطایی رخ داده است");
  }
);

export default client;
