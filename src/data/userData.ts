export type UserProfileType = {
  id: number
  firstName: string
  lastName: string
  email: string
  gender: string
  role: string
  phoneNumber: string
  address: string
  name: string
  companyId: number
  password: string
  updatedAt: string
  isDeleted: boolean
  isBlocked: string
  createdAt: string
}

export const profileData:UserProfileType = {
  email: "jaxa@gmail.com",
  lastName: "shah",
  password: "$2b$12$uaG3xqUAHsISQHkYbmJub.7FvMFvQVQsdya3CHMG7OyNm7/g3P0l6",
  gender: "female",
  companyId: 1,
  isBlocked: "\u0000",
  updatedAt: "2026-03-19T10:43:12",
  name: "Jaxa",
  firstName: "jaxa",
  id: 25,
  phoneNumber: "5688147552",
  address: "string",
  role: "lawyer",
  isDeleted: true,
  createdAt: "2026-03-16T05:50:19",
}
