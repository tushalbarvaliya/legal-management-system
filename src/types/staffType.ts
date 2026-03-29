export interface Staff {
  id: number
  lawyerId: number
  user_id: number

  caseId: number | null
  taskId: number | null

  isBlocked: 0 | 1

  createdAt: string
  updatedAt: string
}

export interface User {
  id: number
  name: string
  firstName: string
  lastName: string

  email: string
  password: string
  phoneNumber: string
  address: string
  gender: string

  role: "staff" | "admin" | "lawyer" | "client"
  companyId: number | null

  isBlocked: 0|1
  isDeleted: 0|1
  
  createdAt: string
  updatedAt: string
}

export interface StaffUserMapping {
  staff: Staff
  user: User
}
