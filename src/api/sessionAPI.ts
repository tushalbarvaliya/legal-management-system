import {  type sessionDataType } from "@/data/sessionData"
import axiosInstance from "./axiosInstance"
import type { SessionAddFormType } from "@/components/session/AddSessionModel"

export const addSession = async (data: SessionAddFormType) => {
    const response = await axiosInstance.post("/sessions/session", data)
    return response.data
}

export const getAllSession = async () => {
    const response = await axiosInstance.get("/sessions/")
    return response.data
}

export const deleteSession = async (data: sessionDataType) => {
    const response = await axiosInstance.delete(`/sessions/session/${data.id}`)
    return response.data
}
