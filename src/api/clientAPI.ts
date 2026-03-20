import type { ClientData } from "@/types/clientType";
import axiosInstance from "./axiosInstance";
import { clientData } from "@/Data/clientData";

export const getAllClient = async () => {
  try {
    const response = await axiosInstance.get("/clients");
    return response.data;
  } catch {
    return clientData;
  }
};

export const createClient = async (data: ClientData) => {
  try {
    const response = await axiosInstance.post("/clients/client", data);
    return response.data;
  } catch {
    console.log(data);
  }
};

export const updateClient = async (data: ClientData) => {
  try {
    const response = await axiosInstance.patch(
      `/clients/client/${data.id}`,
      data,
    );
    return response.data;
  } catch {
    console.log(data);
  }
};

export const softDeleteClient = async (data: ClientData) => {
  try {
    const response = await axiosInstance.delete(`/clients/client/${data.id}`);
    return response.data;
  } catch {
    console.log(`/clients/client/${data.id}`);
  }
};

export const blockClient = async (data: ClientData) => {
  try {
    const response = await axiosInstance.put(
      `/clients/client/${data.id}/block`,
    );
    return response.data;
  } catch {
    console.log(`/clients/client/${data.id}/block`);
  }
};
