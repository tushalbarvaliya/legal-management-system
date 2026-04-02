export type PolicyType = {
  title: string
  paragraph: string
}

export type motivationalQuotesType = {
  quote: string
  author: string
}

export type loginResponseType = {
  access_token: string
  token_type: string
}

export type ProfileData = {
  id: number
  email: string
  password: string

  firstName: string | null
  lastName: string | null
  name: string | null

  gender: string | null

  phoneNumber: string | null
  address: string | null

  role: string | null

  companyId: number | null

  isBlocked: string
  isDeleted: boolean

  createdAt: string
  updatedAt: string
}

export type ProfileResponse = {
  data: ProfileData[]
  message: string
}
