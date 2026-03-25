type user = {
  lastName: string
  email: string
  password: string
  gender: string | null
  companyId: number
  isBlocked: string
  updatedAt: string
  name: string
  firstName: string
  id: number
  phoneNumber: string
  address: string
  role: string
  isDeleted: boolean
  createdAt: string
}

type lawyer = {
  id: number
  specialization: string
  isDeleted: boolean
  updatedAt: string
  userId: number
  isBlocked: boolean
  createdAt: string
}

export type LawyerDataType = {
  lawyer: lawyer
  user: user
}

