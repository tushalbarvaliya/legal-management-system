import axiosInstance from "./axiosInstance"
import type { EditClientType } from "@/components/client/UpdateClient"

export const getAllClient = async () => {
  const response = await axiosInstance.get("/clients")
  return response.data
}

type AddClientDataType = {
  email: string
  password: string
  name: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: string
  address: string
  occupation: string
  crNumber: unknown
  vatNumber: unknown
  vatPercentage: unknown
}
export const postClient = async (data: AddClientDataType) => {
  const response = await axiosInstance.post("/clients/client", data)
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
export const putUnblockClient = async (id: number) => {
  const response = await axiosInstance.patch(`/clients/client/${id}`, {
    isBlocked: 0,
  })
  return response.data
}
