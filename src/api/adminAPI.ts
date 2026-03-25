import type { AddLawyerFormData } from "@/components/lawyer/AddLawyerModel"
import axiosInstance from "./axiosInstance"

export const getAllUser = async () => {
    const response = await axiosInstance.get("/users/")
    return response.data
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
