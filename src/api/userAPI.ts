import axiosInstance from "./axiosInstance";

export const getProfile = async () => {
  const response = await axiosInstance.get("/profile");
  return response.data;
};
