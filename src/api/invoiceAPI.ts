import type { Invoice } from "@/types/invoiceType";
import axiosInstance from "./axiosInstance";

export const addInvoice = async (data: Invoice) => {
  const response = await axiosInstance.post("/invoices/invoice", data);
  return response.data;
};
export const updateInvoice = async (data: Invoice) => {
  const response = await axiosInstance.patch(
    `/invoices/invoice/${data._id}`,
    data,
  );
  return response.data;
};
export const deleteInvoice = async (data: Invoice) => {
  const response = await axiosInstance.delete(`/invoice/${data._id}`);
  return response.data;
};

export const getAllInvoice = async () => {
  const response = await axiosInstance.get("/invoices/");
  return response.data;
};
