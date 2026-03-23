import { staffData } from "@/data/satffData"
import axiosInstance from "./axiosInstance"

export const getAllStaff = async () => {
  try {
    const response = await axiosInstance.get("/staff/")
    return response.data
  } catch {
    return staffData
  }
}
