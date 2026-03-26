import type { AddClientFormType } from "@/components/client/AddClientModel"
import axiosInstance from "./axiosInstance"
import type { EditClientType } from "@/components/client/UpdateClientModel"
import type { ClientDataType } from "@/data/clientData"

export const getAllClient = async () => {
  const response = await axiosInstance.get("/clients")
  return response.data
}

export const postClient = async (data: AddClientFormType) => {
  const clientData = {
    ...data,
    crNumber: 0,
    vatNumber: 0,
    vatPercentage: 0,
    isDeleted: false,
    isBlocked: false,
  }
  const response = await axiosInstance.post("/clients/client", clientData)
  return response.data
}

export const patchClient = async ({
  data,
  id,
}: {
  data: EditClientType
  id: number
}) => {
  const response = await axiosInstance.patch(`/clients/client/${id}`, data)
  return response.data
}

export const deleteClient = async (id: number) => {
  const response = await axiosInstance.delete(`/clients/client/${id}`)
  return response.data
}

export const putBlockClient = async (id: number) => {
  const response = await axiosInstance.put(`/clients/client/${id}/block`)
  return response.data
}
