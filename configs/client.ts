import axios from "axios";
import { baseURL } from "./baseUrl";
import { toast } from "react-toastify";

const client = axios.create({
  baseURL: baseURL,
});

client.interceptors.request.use((req) => {
  req.baseURL = req.baseURL?.concat("/api");
  return req;
});

client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      // if (error.response.status === 404) {
      //   toast.error("خطای داخلی");
      // } else
      if (error.response.status === 401) {
        toast.error("لاگین نیستید");
        location.replace("/login-register");
      } else {
        toast.error(
          `${error.response.data.message} - code:${error.response.status}`
        );
      }
      return Promise.reject(error);
    }
  }
);

export default client;
