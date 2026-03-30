import axiosInstance from "./axiosInstance"
import type { FormData as FormDataAddFormData } from "@/components/document/AddDocsModal"
import type { FormData } from "@/components/document/UpdateDocsModel"

export const getAllDocs = async () => {
  const response = await axiosInstance.get("/documents/")
  return response.data
}

export const createDocs = async (data: FormDataAddFormData) => {
  const response = await axiosInstance.post("/documents/document", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

export const updateDocs = async ({
  data,
  id,
}: {
  data: FormData
  id: number
}) => {
  const response = await axiosInstance.patch(
    `/documents/document/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
  return response.data
}

export const deleteDocs = async (id: number) => {
  const response = await axiosInstance.delete(`/documents/document/${id}`)
  return response.data
}
