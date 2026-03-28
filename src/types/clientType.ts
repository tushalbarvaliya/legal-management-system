// change
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

export type User = {
  id: number
  firstName: string
  lastName: string
  name: string
  email: string
  password: string
  phoneNumber: string
  address: string
  gender: string
  role: "client" | "admin" | "staff"
  companyId: number | null
  isDeleted: boolean
  isBlocked: "\u0000" | "\u0001"
  createdAt: string
  updatedAt: string
}

export type ClientUserMapping = {
  client: Client
  user: User
}
export type ClientResponse = {
  data: ClientUserMapping[]
  message: string
}
