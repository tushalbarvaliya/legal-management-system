export type LawyerDetailsType = {
  lawyer: {
    id: number;
    specialization: string;
    isDeleted: string;
    isBlocked: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    name: string | null;
    email: string;
    password: string;
    gender: string | null;
    phoneNumber: string | null;
    address: string | null;
    role: string | null;
    companyId: number | null;
    isBlocked: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
};