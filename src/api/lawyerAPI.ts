import { type LawyerDataType } from "@/data/lawyerData"
import axiosInstance from "./axiosInstance"
import type { AddLawyerFormData } from "@/components/lawyer/AddLawyerModel"

export const getLawyer = async () => {
    const response = await axiosInstance.get("/lawyers/")
    return response.data
}

export const postLawyer = async (data: AddLawyerFormData) => {
    const response = await axiosInstance.post("/lawyers/lawyer", data)
    return response.data
}

export const deleteLawyer = async (data: LawyerDataType) => {
    const response = await axiosInstance.delete(
      `/lawyers/lawyer/${data.lawyer.id}`
    )
    return response.data
}
export const blockLawyer = async (data: LawyerDataType) => {
    const response = await axiosInstance.put(
      `/lawyers/lawyer/${data.lawyer.id}/block`
    )
    return response.data
}

export const patchLawyer = async (data: AddLawyerFormData) => {
    const response = await axiosInstance.patch(`/lawyers/lawyer/${data}`, data)
    return response.data
}
