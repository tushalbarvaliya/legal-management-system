import { type CaseDataType } from "@/types/caseType"
import axiosInstance from "./axiosInstance"
import type { caseAddFormDataType } from "@/components/cases/AddCaseModel"

export const getAllCases = async () => {
    const response = await axiosInstance.get("/cases/")
    return response.data
}

export const postCase = async (data: caseAddFormDataType) => {
    const response = await axiosInstance.post("/cases/case/", data)
    return response.data
}

export const patchCase = async (data: CaseDataType) => {
    const response = await axiosInstance.patch(`/cases/case/${data.id}`, data)
    return response.data
}

export const deleteCase = async (data: CaseDataType) => {
    const response = await axiosInstance.delete(`/cases/${data.id}`)
    return response.data
}
