import type { CaseData } from "@/types/caseType";
import axiosInstance from "./axiosInstance";

export const addCase = async (data: CaseData) => {
  const response = await axiosInstance.post("/cases/case", data);
  return response.data;
};

export const updateCase = async (data: CaseData) => {
  const response = await axiosInstance.patch(`/cases/case/${data._id}`, data);
  return response.data;
};

export const getAddCase = async () => {
  const response = await axiosInstance.get("/cases/");
  return response.data;
};

export const softDeleteCase = async (data: CaseData) => {
  const response = await axiosInstance.delete(`/case/${data._id}`);
  return response.data;
};
