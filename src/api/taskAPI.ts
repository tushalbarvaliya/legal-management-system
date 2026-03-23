import { taskData } from "@/data/taskData"
import axiosInstance from "./axiosInstance"
import type { AddDocsFormData } from "@/components/document/AddDocsModal"
import type { docsDataType } from "@/data/docsData"

export const addTask = async (data: AddDocsFormData) => {
  try {
    const response = await axiosInstance.post("/tasks/task", data)
    return response.data
  } catch {
    console.log(data)
  }
}
export const updateTask = async (data: docsDataType) => {
  try {
    const response = await axiosInstance.patch(`/tasks/task/${data.id}`, data)
    return response.data
  } catch {
    console.log(data)
  }
}

export const getAllTask = async () => {
  try {
    const response = await axiosInstance.get("/tasks/")
    return response.data
  } catch {
    return taskData
  }
}

export const deleteTask = async (data:docsDataType) => {
  try {
    const response = await axiosInstance.delete(`/tasks/task/${data.id}`)
    return response.data
  } catch {
    console.log(`/tasks/task/${data.id}`)
  }
}
