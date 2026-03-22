import { clientData, type ClineDataType } from "@/data/clientData"
import axiosInstance from "./axiosInstance"

export const getAllClient = async () => {
  try {
    const response = await axiosInstance.get("/clients")
    return response.data
  } catch {
    return clientData
  }
}

export const postClient = async (data) => {
  try {
    const response = await axiosInstance.post("/clients/client", data)
    return response.data
  } catch {
    console.log(data)
  }
}

export const patchClient = async (data) => {
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

export const deleteClient = async (data) => {
  try {
    const response = await axiosInstance.delete(`/clients/client/${data.id}`)
    return response.data
  } catch {
    console.log(`/clients/client/${data.id}`)
  }
}

export const putBlockClient = async (data) => {
  try {
    const response = await axiosInstance.put(`/clients/client/${data.id}/block`)
    return response.data
  } catch {
    console.log(`/clients/client/${data.id}/block`)
  }
}
