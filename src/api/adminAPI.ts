import axios from "axios"
import axiosInstance from "./axiosInstance"
import { userData } from "@/data/userData"

export const getAllUser = async () => {
  try {
    const response = await axios.get("/users/", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0dXNoYWwxMjNAZ21haWwuY29tIiwiaWQiOjM0LCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzY5MjYyODJ9.Ko-C1XyWBuy3HQRmQAN-xhApo_LhDuxAbJ6Pusaxms8",
      },
    })
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
