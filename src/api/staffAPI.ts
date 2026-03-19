import axiosInstance from "./axiosInstance";

export const getAllStaff = async() => {
  const response = await axiosInstance.get('/staff/');
  return response.data
};
