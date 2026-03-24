import axios from "axios"
import axiosInstance from "./axiosInstance"
import { userData } from "@/data/userData"

export const getAllUser = async () => {
  try {
    const response = await axiosInstance.get("/users/")
    return response.data
  } catch {
    return userData
  }
}

export const getCaseCount = async () => {
  const response = await axiosInstance.get("/admins/dashboard/case_counts")
  return response.data
}

export const getTaskCount = async () => {
  const response = await axiosInstance.get("/admins/dashboard/task_counts")
  return response.data
}
export const getCompony = async () => {
  const response = await axiosInstance.get("/admins/dashboard/employees/1")
  return response.data
}

export const makeItLawyer = async (data: AddLawyerFormData) => {
  const response = await axiosInstance.post("/lawyers/lawyer", {
    ...data,
    isBlocked: 0,
  })
  return response.data
}

export const company = async () => {
  const response = await axiosInstance.get("/companies/")
  return response.data
}
