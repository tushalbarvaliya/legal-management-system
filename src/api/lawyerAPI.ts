import type { LawyerData } from "@/components/Lawyer/LawyerCard";
import axiosInstance from "./axiosInstance";

export type lawyerData = {
  userId: string;
  updatedAt: string;
  specialization: string;
  isBlocked: boolean;
  id: string;
  createdAt: string;
};

export type userData = {
  lastName?: string;
  email?: string;
  password: string;
  role: string;
  isDeleted: boolean;
  createdAt: string;
  name: string;
  firstName: string;
  id: string;
  phoneNumber?: string;
  address: string;
  companyId: string;
  isBlocked: string;
  updatedAt: string;
};
export const getLawyer = async () => {
  const lawyerRes = await axiosInstance.get<lawyerData[]>("/lawyers");
  const userRes = await axiosInstance.get<userData[]>("/users");

  const lawyers = lawyerRes.data;
  const users = userRes.data;

  // const matchedUsers = lawyers
  //   .map((lawyer) => users.find((user) => user.id === lawyer.userId))
  //   .filter(Boolean);
  const matchUser = lawyers.map((lawyer) => {
    const user = users.find((user) => user.id === lawyer.userId);
    return ({...user,...lawyer})
  });
  return matchUser;
};

export const deleteLawyer = async (data: LawyerData) => {
  const response = await axiosInstance.delete(`/lawyers/lawyer/${data.id}`);
  return response.data;
};
export const blockLawyer = async (data: LawyerData) => {
  const response = await axiosInstance.put(`/lawyers/lawyer/${data.id}/block`);
  return response.data;
};
export const getLawyerById = async (id: string): Promise<lawyerData> => {
  const lawyerRes = await axiosInstance.get<lawyerData[]>("/lawyers");

  const lawyer = lawyerRes.data.find((item) => item.id === id);

  if (!lawyer) {
    throw new Error("Lawyer not found");
  }

  return lawyer;
};
