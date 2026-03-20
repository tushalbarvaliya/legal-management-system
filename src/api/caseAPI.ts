import axiosInstance from "./axiosInstance";
import { caseData,type caseDataType } from "@/Data/caseData";

export const addCase = async (data: caseDataType) => {
  try {
    const response = await axiosInstance.post("/cases/case/", data);
    return response.data;
  } catch {
    console.log(data);
  }
};

export const updateCase = async (data: caseDataType) => {
  try {
    const response = await axiosInstance.patch(`/cases/case/${data.id}`, data);
    return response.data;
  } catch {
    console.log(data);
  }
};

export const getAddCase = async () => {
  try {
    const response = await axiosInstance.get("/cases/");
    return response.data;
  } catch {
    console.log("/cases/");
    return caseData
  }
};

export const softDeleteCase = async (data: caseDataType) => {
  try {
    const response = await axiosInstance.delete(`/cases/${data.id}`);
    return response.data;
  } catch {
    console.log(`/cases/${data.id}`);
  }
};
