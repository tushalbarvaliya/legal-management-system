import { docsData } from "@/data/docsData"
import axiosInstance from "./axiosInstance"
import type { AddDocsFormData } from "@/components/document/AddDocsModal"

export const getAllDocs = async () => {
  try {
    const response = await axiosInstance.get("/documents/")
    return response.data
  } catch {
    return docsData
  }
}

export const createDocs = async (data: AddDocsFormData) => {
  try {
    const response = await axiosInstance.post("/documents/document", data)
    return response.data
  } catch {
    console.log(data)
  }
}

export const updateDocs = async (data) => {
  try {
    const response = await axiosInstance.patch(
      `/documents/document/${data.id}`,
      data
    )
    return response.data
  } catch {
    console.log(data)
  }
}

export const deleteDocs = async (data) => {
  try {
    const response = await axiosInstance.delete(
      `/documents/document/${data.id}`
    )
    return response.data
  } catch {
    console.log()
  }
}
