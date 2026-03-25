export type StaffDetailsType = {
  staff: {
    id: number;
    lawyerId: number;
    caseId: number;
    taskId: number | null;
    user_id: number;
    isBlocked: string;
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


export type UpdateStaffFormData = {
  name: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  address: string;

  userId: number;
  lawyerId: number;
  caseId: number;
  taskId: number | null;

  isBlocked: number;
  id: number;
};