import { lawyerData } from "@/data/lawyerData"
import axiosInstance from "./axiosInstance"
import type { AddLawyerFormData } from "@/components/lawyer/AddLawyerModel"

export const getLawyer = async () => {
  try {
    const response = await axiosInstance.get("/lawyers/")
    return response.data
  } catch {
    return lawyerData
  }
}

export const postLawyer = async (data:AddLawyerFormData) => {
  try {
    const response = await axiosInstance.post("/lawyers/lawyer", data)
    return response.data
  } catch {
    console.log(data)
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

