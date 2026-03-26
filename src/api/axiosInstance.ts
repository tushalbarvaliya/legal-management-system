import axios from "axios"
import { store } from "@/store/store"
import { removeAuth } from "@/store/slice/authSlice"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token 

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       store.dispatch(removeAuth()) 
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   }
// )
