import axiosInstance from "./axiosInstance";

export const getProfile = async () => {
  const response = await axiosInstance.get("/users/profile");
  return response.data;
};

