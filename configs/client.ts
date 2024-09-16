import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "./baseUrl";

const client = axios.create({
  baseURL,
});

client.interceptors.request.use((req) => {
  req.baseURL = req.baseURL?.concat("/api");
  return req;
});

client.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const res = await axios.get("/api/auth/refresh");
        toast.success(res.data.message);
        return client(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        toast.error("لاگین نیستید");
        location.replace("/login-register");
        return Promise.reject(refreshError);
      }
    }
    toast.error(
      `${error.response.data.message} - code:${error.response.status}`
    );
    return Promise.reject(error);
  }
);

export default client;
