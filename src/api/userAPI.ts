import { profileData } from "@/data/userData"
import axiosInstance from "./axiosInstance"
import type { ProfileFormData } from "@/pages/ProfilePage"

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/users/profile")
    return response.data
  } catch {
    return profileData
  }
}

export const patchProfileUpdate = async (data: ProfileFormData) => {
  try {
    const response = await axiosInstance.patch("/users/updateProfile", data)
    return response.data
  } catch {
    console.log(data)
  }
}

export type putReqDataType = {
  password: string
  new_password: string
}

export const putResetPassword = async (data: putReqDataType) => {
  try {
    const response = await axiosInstance.put("/users/change_password", data)
    return response.data
  } catch {
    console.log(data)
  }
}
