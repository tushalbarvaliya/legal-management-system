import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { removeAuth } from "@/store/slice/authSlice"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAppSelector((state) => state.auth.token)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const { status } = error.response

      if (status === 401) {
        const dispatch = useAppDispatch()
        dispatch(removeAuth())
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)
