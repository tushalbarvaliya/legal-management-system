import { type invoiceDataType } from "@/data/invoiceData"
import axiosInstance from "./axiosInstance"
import type { AddInvoiceFormDataType } from "@/components/invoice/AddInvoiceModel"

export const addInvoice = async (data: AddInvoiceFormDataType) => {
  const response = await axiosInstance.post("/invoices/invoice", data)
  return response.data
}
export const updateInvoice = async (data) => {
  const response = await axiosInstance.patch(
    `/invoices/invoice/${data.id}`,
    data
  )
  return response.data
}
export const deleteInvoice = async (data: invoiceDataType) => {
  const response = await axiosInstance.delete(`/invoices/invoice/${data.id}`)
  return response.data
}

export const getAllInvoice = async () => {
  const response = await axiosInstance.get("/invoices/")
  return response.data
}
