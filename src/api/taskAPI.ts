import type { TaskData } from "@/types/taskType";
import axiosInstance from "./axiosInstance";
import { taskData } from "@/Data/taskData";

export const addTask = async (data: TaskData) => {
  try {
    const response = await axiosInstance.post("/tasks/task", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch {
    console.log(data);
  }
};
export const updateTask = async (data: TaskData) => {
  try {
    const response = await axiosInstance.patch(
      `/tasks/task/${data._id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch {
    console.log(data);
  }
};

export const getAllTask = async () => {
  try {
    const response = await axiosInstance.get("/tasks/");
    return response.data;
  } catch {
    return taskData;
  }
};

export const deleteTask = async (data: TaskData) => {
  try {
    const response = await axiosInstance.delete(`/tasks/task/${data._id}`);
    return response.data;
  } catch {
    console.log(`/tasks/task/${data._id}`);
  }
};
