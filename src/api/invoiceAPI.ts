import { invoiceData, type invoiceDataType } from "@/data/invoiceData"
import axiosInstance from "./axiosInstance"
import type { AddInvoiceFormDataType } from "@/components/invoice/AddInvoiceModel"

export const addInvoice = async (data: AddInvoiceFormDataType) => {
  try {
    const response = await axiosInstance.post("/invoices/invoice", data)
    return response.data
  } catch {
    console.log(data)
  }
}
export const updateInvoice = async (data) => {
  const response = await axiosInstance.patch(
    `/invoices/invoice/${data.id}`,
    data
  )
  return response.data
}
export const deleteInvoice = async (data: invoiceDataType) => {
  try {
    const response = await axiosInstance.delete(`/invoice/${data.id}`)
    return response.data
  } catch {
    console.log(`/invoice/${data.id}`)
  }
}

export const getAllInvoice = async () => {
  try {
    const response = await axiosInstance.get("/invoices/")
    return response.data
  } catch {
    return invoiceData
  }
}
