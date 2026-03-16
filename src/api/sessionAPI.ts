import type { SessionData } from "react-router";
import axiosInstance from "./axiosInstance";

export const getSession = async () => {
  const response = await axiosInstance.get("/session");
  return response.data;
};

export const addSession = async (data: SessionData) => {
  const response = await axiosInstance.post("/session", {
    ...data,
    caseId: "45687615",
    clientId: "98419879817",
  });
  return response.data;
};

export const deleteSession = async (data: SessionData) => {
  const response = await axiosInstance.delete(`/session/${data._id}`);
  return response.data;
};
