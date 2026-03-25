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