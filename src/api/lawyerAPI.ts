import { lawyerData, type LawyerDataType } from "@/data/lawyerData"
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

export const postLawyer = async (data: AddLawyerFormData) => {
  try {
    const response = await axiosInstance.post("/lawyers/lawyer", data)
    return response.data
  } catch {
    console.log(data)
  }
}

export const deleteLawyer = async (data: LawyerDataType) => {
  try {
    const response = await axiosInstance.delete(
      `/lawyers/lawyer/${data.lawyer.id}`
    )
    return response.data
  } catch {
    console.log(`/lawyers/lawyer/${data.lawyer.id}`)
  }
}
export const blockLawyer = async (data: LawyerDataType) => {
  try {
    const response = await axiosInstance.put(
      `/lawyers/lawyer/${data.lawyer.id}/block`
    )
    return response.data
  } catch {
    console.log(`/lawyers/lawyer/${data.lawyer.id}/block`)
  }
}

export const patchLawyer = async (data: AddLawyerFormData) => {
  try {
    const response = await axiosInstance.patch(
      `/lawyers/lawyer/${data.userId}`,
      data
    )
    return response.data
  } catch {
    console.log(data)
  }
}
