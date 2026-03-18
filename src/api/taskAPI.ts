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
