import type { SessionData } from "@/types/sessionType";
import axiosInstance from "./axiosInstance";

export const addSession = async (data: SessionData) => {
  const response = await axiosInstance.post("/sessions/session", data);
  return response.data;
};

export const getAllSession = async () => {
  const response = await axiosInstance.get("/sessions/");
  return response.data;
};

export const deleteSession = async (data: SessionData) => {
  const response = await axiosInstance.delete(`/sessions/session/${data._id}`);
  return response.data;
};
