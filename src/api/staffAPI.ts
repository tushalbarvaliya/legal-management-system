import {  type StaffUserMapping } from "@/data/satffData"
import axiosInstance from "./axiosInstance"
import type { AddStaffFormType } from "@/components/staff/AddStaffModel"

export const getAllStaff = async () => {
    const response = await axiosInstance.get("/staff/")
    return response.data
}

export const postStaff = async (data:AddStaffFormType) => {
  const response = await axiosInstance.post("/staff/staff", data)
  return response.data
}


export const deleteStaff=async(data:StaffUserMapping)=>{
  const response = await axiosInstance.delete(`/staff/staff/${data.staff.id}`)
  return response.data
}