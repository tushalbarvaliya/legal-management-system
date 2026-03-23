import { taskData } from "@/data/taskData"
import axiosInstance from "./axiosInstance"

export const addTask = async (data) => {
  try {
    const response = await axiosInstance.post("/tasks/task", data)
    return response.data
  } catch {
    console.log(data)
  }
}
export const updateTask = async (data) => {
  try {
    const response = await axiosInstance.patch(
      `/tasks/task/${data._id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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

export const deleteTask = async (data) => {
  try {
    const response = await axiosInstance.delete(`/tasks/task/${data.id}`)
    return response.data
  } catch {
    console.log(`/tasks/task/${data.id}`)
  }
}
