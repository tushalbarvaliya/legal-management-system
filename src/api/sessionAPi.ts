import type { SessionData } from "@/types/sessionType";
import axiosInstance from "./axiosInstance";

export const addSession = async (data: SessionData) => {
  try {
    const response = await axiosInstance.post("/sessions/session", data);
    return response.data;
  } catch {
    console.log(data);
  }
};

export const getAllSession = async () => {
  try {
    const response = await axiosInstance.get("/sessions/");
    return response.data;
  } catch {
    console.log("no data");
  }
};

export const deleteSession = async (data: SessionData) => {
  try {
    const response = await axiosInstance.delete(
      `/sessions/session/${data._id}`,
    );
    return response.data;
  } catch {
    console.log(`/sessions/session/${data._id}`);
  }
};
