export type staffDataType = {
  caseId: number
  taskId: number
  user_id: number
  createdAt: string
  id: number
  lawyerId: number
  isBlocked: string
  updatedAt: string
}

export const staffData: staffDataType[] = [
  {
    caseId: 4,
    taskId: 1,
    user_id: 39,
    createdAt: "2026-03-19T10:51:58",
    id: 5,
    lawyerId: 2,
    isBlocked: "\u0000",
    updatedAt: "2026-03-19T10:51:58",
  },
]



export interface Staff {
  user_id: number;
  caseId: number;
  taskId: number | null;
  createdAt: string; // ISO date string
  lawyerId: number;
  id: number;
  isBlocked: string; // "\u0000"
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  password: string;
  gender: string;
  phoneNumber: string;
  address: string;
  role: string;
  companyId: number;
  isBlocked: string; // "\u0000"
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StaffUserMapping {
  staff: Staff;
  user: User;
}