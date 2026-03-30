import type { UserInfo } from "./type"

export interface Staff {
  id: number
  lawyerId: number
  user_id: number

  caseId: number | null
  taskId: number | null

  isBlocked: "\u0000" | "\u0001"

  createdAt: string
  updatedAt: string
}

export interface StaffUserMapping {
  staff: Staff
  user: UserInfo
}
