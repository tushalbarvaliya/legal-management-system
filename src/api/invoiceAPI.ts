import type { EditInvoiceFormDataType } from "@/components/invoice/EditInvoiceModel"
import axiosInstance from "./axiosInstance"
import type { AddInvoiceFormDataType } from "@/components/invoice/AddInvoiceModel"

export const addInvoice = async (data: AddInvoiceFormDataType) => {
  const response = await axiosInstance.post("/invoices/invoice", data)
  return response.data
}
export const updateInvoice = async ({
  data,
  id,
}: {
  data: EditInvoiceFormDataType
  id: number
}) => {
  const response = await axiosInstance.patch(`/invoices/invoice/${id}`, data)
  return response.data
}
export const deleteInvoice = async (id: number) => {
  const response = await axiosInstance.delete(`/invoices/invoice/${id}`)
  return response.data
}

export const getAllInvoice = async () => {
  const response = await axiosInstance.get("/invoices/")
  return response.data
}

export const pay = async (id:number) => {
  const response = await axiosInstance.post(`/invoices/${id}/pay`, null)
  return response.data
}
