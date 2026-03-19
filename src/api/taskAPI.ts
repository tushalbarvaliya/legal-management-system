import type { TaskData } from "@/types/taskType";
import axiosInstance from "./axiosInstance";

export const addTask = async (data: TaskData) => {
  const response = await axiosInstance.post("/tasks/task", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const updateTask = async (data: TaskData) => {
  const response = await axiosInstance.patch(`/tasks/task/${data._id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getAllTask = async () => {
  const response = await axiosInstance.get("/tasks/");
  return response.data;
};

export const deleteTask = async (data:TaskData) => {
  const response = await axiosInstance.delete(`/tasks/task/${data._id}`);
  return response.data;
};
