import axiosInstance from "./axiosInstance"
import type { AddSessionFormSchemaType } from "@/schemas/AddSessionSchema"

export const addSession = async (data: AddSessionFormSchemaType) => {
    const response = await axiosInstance.post("/sessions/session", data)
    return response.data
}

export const getAllSession = async () => {
    const response = await axiosInstance.get("/sessions/")
    return response.data
}