import axiosInstance from "./axiosInstance"
import type { AddTaskType } from "@/schemas/AddTaskSchema"

export const addTask = async (data:AddTaskType) => {
  const response = await axiosInstance.post("/tasks/task", data)
  return response.data
}
export const updateTask = async (data) => {
  const response = await axiosInstance.patch(`/tasks/task/${data.id}`, data)
  return response.data
}

export const getAllTask = async () => {
  const response = await axiosInstance.get("/tasks/")
  return response.data
}

export const deleteTask = async (data) => {
  const response = await axiosInstance.delete(`/tasks/task/${data.id}`)
  return response.data
}