import axiosInstance from "./axiosInstance"

export const getAllStaff = async () => {
  const response = await axiosInstance.get("/staff/")
  return response.data
}

type AddStaffData = {
  email: string
  password: string
  name: string
  firstName: string
  lastName: string
  phoneNumber: string
  gender: string
  address: string
}

export const postStaff = async (data: AddStaffData) => {
  const response = await axiosInstance.post("/staff/staff/", data)
  return response.data
}

export const deleteStaff = async (id: number) => {
  const response = await axiosInstance.delete(`/staff/staff/${id}`)
  return response.data
}

export const blockStaff = async (id: number) => {
  const response = await axiosInstance.put(`/staff/staff/${id}/block`)
  return response.data
}

export const patchStaff = async (data) => {
  const response = await axiosInstance.patch(`/staff/staff/${data.id}`, data)
  return response.data
}
