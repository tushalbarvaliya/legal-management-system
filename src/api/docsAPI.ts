import type { DocumentData } from "@/types/docsType";
import axiosInstance from "./axiosInstance";

export const getAllDocs = async () => {
  const response = await axiosInstance.get("/documents/");
  return response.data;
};

export const createDocs=async(data:DocumentData)=>{
  const response = await axiosInstance.post('/documents/document',data)
  return response.data
}


export const updateDocs=async(data:DocumentData)=>{
  const response = await axiosInstance.patch(`/documents/document/${data._id}`,data)
  return response.data
}

export const deleteDocs=async(data:DocumentData)=>{
  const response = await axiosInstance.delete(`/documents/document/${data._id}`)
  return response.data
}