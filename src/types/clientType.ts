export type Client = {
  id: number
  userId: number
  lawyerId: number

  crNumber: number
  vatNumber: number
  vatPercentage: number
  occupation: string
  isBlocked: 0 | 1
  isDeleted: 0 | 1
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
  gender: "male" | "female" | "other"
  role: "client" | "admin" | "staff" | "lawyer"
  companyId: number | null
  isDeleted: 0 | 1
  isBlocked: 0 | 1
  createdAt: string
  updatedAt: string
}

export type ClientUserMapping = {
  client: Client
  user: User
}
export type ClientResponse = {
  data: ClientUserMapping[]
}
