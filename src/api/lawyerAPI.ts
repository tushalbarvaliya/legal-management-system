import axiosInstance from "./axiosInstance";

type lawyerData = {
  userId: string;
  updatedAt: string;
  specialization: string;
  isBlocked: boolean;
  id: string;
  createdAt: string;
};

export type userData = {
  lastName: string;
  email: string;
  password: string;
  role: string;
  isDeleted: boolean;
  createdAt: string;
  name: string;
  firstName: string;
  id: string;
  phoneNumber: string;
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

  const matchedUsers = lawyers
    .map((lawyer) => users.find((user) => user.id === lawyer.userId))
    .filter(Boolean); // remove undefined
  return matchedUsers;
};
