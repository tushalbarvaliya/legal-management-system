import { casesData, type caseDataType } from "@/data/caseData"
import axiosInstance from "./axiosInstance"
import type { caseAddFormDataType } from "@/components/cases/AddCaseModel"

export const getAllCases = async () => {
  try {
    const response = await axiosInstance.get("/cases/")
    return response.data
  } catch {
    console.log("/cases/")
    return casesData
  }
}

export const postCase = async (data: caseAddFormDataType) => {
  try {
    const response = await axiosInstance.post("/cases/case/", data)
    return response.data
  } catch {
    console.log(data)
  }
}

export const patchCase = async (data: caseDataType) => {
  try {
    const response = await axiosInstance.patch(`/cases/case/${data.id}`, data)
    return response.data
  } catch {
    console.log(data)
  }
}

export const deleteCase = async (data: caseDataType) => {
  try {
    const response = await axiosInstance.delete(`/cases/${data.id}`)
    return response.data
  } catch {
    console.log(`/cases/${data.id}`)
  }
}
