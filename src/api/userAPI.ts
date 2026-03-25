import axiosInstance from "./axiosInstance"
import type { ProfileFormData } from "@/pages/ProfilePage"

export const getProfile = async () => {
  const response = await axiosInstance.get("/users/profile")
  return response.data
}

export const patchProfileUpdate = async (data: ProfileFormData) => {
  const response = await axiosInstance.patch("/users/updateProfile", data)
  return response.data
}

export type putReqDataType = {
  password: string
  new_password: string
}

export const putResetPassword = async (data: putReqDataType) => {
  const response = await axiosInstance.put("/users/change_password", data)
  return response.data
}
