import { staffData } from "@/Data/staffData";
import axiosInstance from "./axiosInstance";

export const getAllStaff = async () => {
  try {
    const response = await axiosInstance.get("/staff/");
    return response.data;
  } catch {
    console.log(staffData);
    
    return staffData;
  }
};
