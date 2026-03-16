import type { task } from "@/components/Model/Task/TaskCard";
import axiosInstance from "./axiosInstance";

export const getAllTask = async () => {
  const response = await axiosInstance.get("/task");
  return response.data;
};

export const addTask = async (data: task) => {
  const response = await axiosInstance.post("/task", data);
  return response.data;
};

export const updateTask = async (data: task) => {
  const response = await axiosInstance.patch(`/task/${data._id}`, data);
  return response.data;
};
export const deleteTask = async (data: task) => {
  const response = await axiosInstance.delete(`/task/${data._id}`);
  return response.data;
};
export const taskAnalysis = async () => {
  const response = await axiosInstance.get(`/tasks/analysis`);
  return response.data;
};
