import { type LawyerDataType } from "@/data/lawyerData"
import axiosInstance from "./axiosInstance"

export const getLawyer = async () => {
  const response = await axiosInstance.get("/lawyers/")
  return response.data
}

type AddDataMutate = {
  email: string
  password: string
  name: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: string
  address: string
  specialization: string
}

export const postLawyer = async (data: AddDataMutate) => {
  const response = await axiosInstance.post("/lawyers/lawyer", data)
  return response.data
}

export const deleteLawyer = async (data: LawyerDataType) => {
  const response = await axiosInstance.delete(
    `/lawyers/lawyer/${data.lawyer.id}`
  )
  return response.data
}
export const blockLawyer = async (id: number) => {
  const response = await axiosInstance.put(`/lawyers/lawyer/${id}/block`)
  return response.data
}

export const patchLawyer = async (data) => {
  const response = await axiosInstance.patch(`/lawyers/lawyer/${data.id}`, data)
  return response.data
}
