import axiosInstance from "./axiosInstance"
import type { UpdateLawyerFormSchemaType } from "@/schemas/UpdateLawyerSchema"

export const getLawyer = async () => {
  const response = await axiosInstance.get("/lawyers/")
  return response.data
}

type AddDataMutate = {
  email: string
  password: string
  name: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: string
  address: string
  specialization: string
}

export const postLawyer = async (data: AddDataMutate) => {
  const response = await axiosInstance.post("/lawyers/lawyer", data)
  return response.data
}

export const deleteLawyer = async (id: number) => {
  const response = await axiosInstance.delete(`/lawyers/lawyer/${id}`)
  return response.data
}
export const blockLawyer = async (id: number) => {
  const response = await axiosInstance.put(`/lawyers/lawyer/${id}/block`)
  return response.data
}

export const patchLawyer = async ({
  data,
  id,
}: {
  data: UpdateLawyerFormSchemaType
  id: number
}) => {
  const response = await axiosInstance.patch(`/lawyers/lawyer/${id}`, data)
  return response.data
}
export const patchUnblockLawyer = async ({ id }: { id: number }) => {
  const response = await axiosInstance.patch(`/lawyers/lawyer/${id}`, {
    isBlocked: 0,
  })
  return response.data
}
