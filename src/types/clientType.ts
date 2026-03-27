export type ClientType = {
  id: number
  vatNumber: number
  crNumber: number
  vatPercentage: number
  occupation: string
  userId: number
  lawyerId: number
  isBlocked: string
  isDeleted: string
  createdAt: string
  updatedAt: string
}

export type ClientUserType = {
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  name: string
  gender: string | null
  phoneNumber: string
  address: string
  role: string
  companyId: number
  isBlocked: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export type ClientDataType = {
  client: ClientType
  user: ClientUserType
}
