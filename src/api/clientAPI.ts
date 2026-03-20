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
  console.log(data);

  // const response = await axiosInstance.post("/clients/client", data);
  // return response.data;
};

export const updateClient = async (data: ClientData) => {
  console.log(data);
  // const response = await axiosInstance.patch(
  //   `/clients/client/${data.id}`,
  //   data,
  // );
  // return response.data;
};

export const softDeleteClient = async (data: ClientData) => {
  console.log(`/clients/client/${data.id}`);
  // const response = await axiosInstance.delete(`/clients/client/${data.id}`);
  // return response.data;
};

export const blockClient = async (data: ClientData) => {
  console.log(`/clients/client/${data.id}/block`);
  // const response = await axiosInstance.put(`/clients/client/${data.id}/block`);
  // return response.data;
};
