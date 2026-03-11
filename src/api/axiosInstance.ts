import axios from "axios";
import { store } from "@/store/store";
import { removeToken } from "@/store/slices/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(removeToken());
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;