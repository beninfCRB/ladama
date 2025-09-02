import axios from "axios";
import { toast } from "react-toastify";

const useAxios = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    id: import.meta.env.VITE_PUBLIC_ID_CLIENT,
    secret: import.meta.env.VITE_PUBLIC_SECRET_CLIENT,
  },
});

useAxios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    if (error.response && error.response.status === 429) {
      toast.error(error.response.data.message);
      return;
    } else if (!error.response || error.response.status === 503) {
      window.location.replace("/under-maintenance");
      return;
    } else if (!error.response || error.response.status === 401) {
      window.location.replace("/login");
      return;
    }

    return Promise.reject(error);
  }
);

export { useAxios };
