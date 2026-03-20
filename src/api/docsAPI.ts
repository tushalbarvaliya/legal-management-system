import type { DocumentData } from "@/types/docsType";
import axiosInstance from "./axiosInstance";
import { docsData } from "@/Data/docsData";

export const getAllDocs = async () => {
  try {
    const response = await axiosInstance.get("/documents/");
    return response.data;
  } catch {
    return docsData;
  }
};

export const createDocs = async (data: DocumentData) => {
  try {
    const response = await axiosInstance.post("/documents/document", data);
    return response.data;
  } catch {
    console.log(data);
  }
};

export const updateDocs = async (data: DocumentData) => {
  try {
    const response = await axiosInstance.patch(
      `/documents/document/${data._id}`,
      data,
    );
    return response.data;
  } catch {
    console.log(data);
  }
};

export const deleteDocs = async (data: DocumentData) => {
  try {
    const response = await axiosInstance.delete(
      `/documents/document/${data._id}`,
    );
    return response.data;
  } catch {
    console.log();
  }
};
