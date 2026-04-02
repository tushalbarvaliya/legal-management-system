import type { UserInfo } from "./type"

type lawyer = {
  isDeleted: "\u0001"|"\u0000"
  userId: number
  specialization: string
  createdAt: string
  id: number
  isBlocked: "\u0001"|"\u0000"
  updatedAt: string
}

export type LawyerDataType = {
  lawyer: lawyer
  user: UserInfo
}
