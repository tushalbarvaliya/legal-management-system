import type { UserInfo } from "./type"

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


export interface StaffUserMapping {
  staff: Staff
  user: UserInfo
}
