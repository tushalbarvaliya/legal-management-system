import type { UserInfo } from "./type"

export type Client = {
  id: number
  userId: number
  lawyerId: number

  crNumber: number
  vatNumber: number
  vatPercentage: number
  occupation: string
  isBlocked: "\u0000" | "\u0001"
  isDeleted: "\u0000" | "\u0001"
  createdAt: string
  updatedAt: string
}

export type ClientUserMapping = {
  client: Client
  user: UserInfo
}
export type ClientResponse = {
  data: ClientUserMapping[]
  message: string
}
