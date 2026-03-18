import type { ClientProps } from "@/types/clientType";
import axiosInstance from "./axiosInstance";

export const getAllClient = async () => {
  const response = await axiosInstance.get("/clients");
  return response.data;
};

export const createClient = async (data: ClientProps) => {
  const response = await axiosInstance.post("/clients/client", data);
  return response.data;
};

export const updateClient = async (data: ClientProps) => {
  const response = await axiosInstance.patch(`/clients/client/${data._id}`, data);
  return response.data;
};

export const deletePermanentClient = async (data: ClientProps) => {
  const response = await axiosInstance.delete(`/client/${data._id}`);
  return response.data;
};

export const blockClient = async (data: ClientProps) => {
  const response = await axiosInstance.put(`/clients/client/${data._id}/block`);
  return response.data;
};
export const softDeleteClient = async (data: ClientProps) => {
  const response = await axiosInstance.delete(`/clients/client/${data._id}`);
  return response.data;
};
export const undoDeleteClient = async (data: ClientProps) => {
  const response = await axiosInstance.delete(`/client/unDelete/${data._id}`);
  return response.data;
};
export const unBlockClient = async (data: ClientProps) => {
  const response = await axiosInstance.delete(`/client/unblock/${data._id}`);
  return response.data;
};
