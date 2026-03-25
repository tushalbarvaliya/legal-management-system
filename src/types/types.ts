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

export type ProfileResponse = {
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


