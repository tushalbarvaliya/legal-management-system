import { sessionData, type sessionDataType } from "@/data/sessionData"
import axiosInstance from "./axiosInstance"
import type { SessionAddFormType } from "@/components/session/AddSessionModel"

export const addSession = async (data: SessionAddFormType) => {
  try {
    const response = await axiosInstance.post("/sessions/session", data)
    return response.data
  } catch {
    console.log(data)
  }
}

export const getAllSession = async () => {
  try {
    const response = await axiosInstance.get("/sessions/")
    return response.data
  } catch {
    return sessionData
  }
}

export const deleteSession = async (data: sessionDataType) => {
  try {
    const response = await axiosInstance.delete(`/sessions/session/${data.id}`)
    return response.data
  } catch {
    console.log(`/sessions/session/${data.id}`)
  }
}
