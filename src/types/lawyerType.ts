type user = {
  firstName: string
  name: string
  id: number
  lastName: string
  phoneNumber: string
  address: string
  role: string
  isDeleted: boolean
  createdAt: string
  email: string
  password: string
  gender: string | null
  companyId: number
  isBlocked: string
  updatedAt: string
}

type lawyer = {
  isDeleted: 0 | 1
  userId: number
  specialization: string
  createdAt: string
  id: number
  isBlocked: 0 | 1
  updatedAt: string
}

export type LawyerDataType = {
  lawyer: lawyer
  user: user
}
