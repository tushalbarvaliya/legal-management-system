import type { AddCaseFormSchemaType } from "@/schemas/AddCaseSchema"
import axiosInstance from "./axiosInstance"
import type { UpdateCaseFormSchemaType } from "@/schemas/UpdateCaseSchema"

export const getAllCases = async () => {
    const response = await axiosInstance.get("/cases/")
    return response.data
}

export const postCase = async (data: AddCaseFormSchemaType) => {
    const response = await axiosInstance.post("/cases/case/", data)
    return response.data
}

export const patchCase = async ({data,id}:{data: UpdateCaseFormSchemaType,id:number}) => {
    const response = await axiosInstance.patch(`/cases/case/${id}`, data)
    return response.data
}

export const deleteCase = async (id:number) => {
    const response = await axiosInstance.delete(`/cases/${id}`)
    return response.data
}
