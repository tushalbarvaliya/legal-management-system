import axiosInstance from "./axiosInstance"
import type { AddClientFormType } from "@/components/client/AddClientModel"
import type { FormUpdateClient } from "@/components/client/UpdateClientModel"

export const getAllClient = async () => {
  try {
    const response = await axiosInstance.get("/clients")
    return response.data
  } catch {
    return []
  }
}

type postClientProps = {
  userId: number
} & AddClientFormType

export const postClient = async (data: postClientProps) => {
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

export const patchClient = async (data: FormUpdateClient) => {
  try {
    const response = await axiosInstance.patch(
      `/clients/client/${data.id}`,
      data
    )
    return response.data
  } catch {
    console.log(data)
  }
}

export const deleteClient = async (data: ClineDataType) => {
  try {
    const response = await axiosInstance.delete(`/clients/client/${data.id}`)
    return response.data
  } catch {
    console.log(`/clients/client/${data.id}`)
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
