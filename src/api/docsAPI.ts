import { type docsDataType } from "@/data/docsData"
import axiosInstance from "./axiosInstance"
import type { AddDocsFormData } from "@/components/document/AddDocsModal"

export const getAllDocs = async () => {
  const response = await axiosInstance.get("/documents/")
  return response.data
}

export const createDocs = async (data: AddDocsFormData) => {
  const response = await axiosInstance.post("/documents/document", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

export const updateDocs = async (data: docsDataType) => {
  const response = await axiosInstance.patch(
    `/documents/document/${data.id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
  return response.data
}

export const deleteDocs = async (data: docsDataType) => {
  const response = await axiosInstance.delete(`/documents/document/${data.id}`)
  return response.data
}
