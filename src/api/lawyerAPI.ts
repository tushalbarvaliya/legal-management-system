import { lawyerData } from "@/data/lawyerData"
import axiosInstance from "./axiosInstance"

export const getLawyer = async () => {
  try {
    const response = await axiosInstance.get("/lawyers/")
    return response.data
  } catch {
    return lawyerData
  }
}

export const deleteLawyer = async (data) => {
  const response = await axiosInstance.delete(`/lawyers/lawyer/${data.id}`)
  return response.data
}
export const blockLawyer = async (data) => {
  const response = await axiosInstance.put(`/lawyers/lawyer/${data.id}/block`)
  return response.data
}
export const getLawyerById = async () => {
  try {
    const lawyerRes = await axiosInstance.get("/lawyers")
    return lawyerRes.data
  } catch {
    return lawyerData
  }
}
