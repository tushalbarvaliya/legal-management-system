import type { AddClientFormType } from "@/components/client/AddClientModel"
import axiosInstance from "./axiosInstance"
import type { EditClientType } from "@/components/client/UpdateClientModel"
import type { ClientDataType } from "@/data/clientData"

export const getAllClient = async () => {
  try {
    const response = await axiosInstance.get("/clients")
    return response.data
  } catch {
    return []
  }
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
  try {
    const response = await axiosInstance.post("/clients/client", clientData)
    return response.data
  } catch {
    console.log(clientData)
  }
}

export const patchClient = async ({
  data,
  id,
}: {
  data: EditClientType
  id: number
}) => {
  try {
    const response = await axiosInstance.patch(`/clients/client/${id}`, data)
    return response.data
  } catch {
    console.log(data)
  }
}

export const deleteClient = async (data: ClientDataType) => {
  try {
    const response = await axiosInstance.delete(
      `/clients/client/${data.client.id}`
    )
    return response.data
  } catch {
    console.log(`/clients/client/${data.client.id}`)
  }
}

export const putBlockClient = async (id: number) => {
  try {
    const response = await axiosInstance.put(`/clients/client/${id}/block`)
    return response.data
  } catch {
    console.log(`/clients/client/${id}/block`)
  }
}
