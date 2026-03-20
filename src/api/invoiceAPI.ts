import axiosInstance from "./axiosInstance";
import { invoiceData, type InvoiceDataType } from "@/Data/invoiceData";

export const addInvoice = async (data: InvoiceDataType) => {
  try {
    const response = await axiosInstance.post("/invoices/invoice", data);
    return response.data;
  } catch {
    console.log(data);
    ;
  }
};
export const updateInvoice = async (data: InvoiceDataType) => {
  const response = await axiosInstance.patch(
    `/invoices/invoice/${data.id}`,
    data,
  );
  return response.data;
};
export const deleteInvoice = async (data: InvoiceDataType) => {
  const response = await axiosInstance.delete(`/invoice/${data.id}`);
  return response.data;
};

export const getAllInvoice = async () => {
  try {
    const response = await axiosInstance.get("/invoices/");
    return response.data;
  } catch {
    return invoiceData;
  }
};
