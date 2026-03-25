import axiosInstance from "./axiosInstance"

type loginProps = {
  email: string
  password: string
}

export const login = async ({ email, password }: loginProps) => {
  const data = { username: email, password: password }
  const response = await axiosInstance.post("/auth/login", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  return response.data
}

type forgotPasswordProps = {
  email: string
  new_password: string
}
export const forgetPasswordAPI = async ({
  email,
  new_password,
}: forgotPasswordProps) => {
  const data: forgotPasswordProps = {
    email: email,
    new_password: new_password,
  }
  const response = await axiosInstance.put("/users/forgot_password", data)
  return response.data
}

export type SignUpFormdata = {
  name: string
  first_name: string
  last_name: string
  email: string
  phoneNumber: string
  password: string
  role: string
  gender: string
  address: string
  companyId: number
}

export const signUp = async (signUpData: {
  email: string
  password: string
  companyId: number
}) => {
  const response = await axiosInstance.post("/auth/register", signUpData)
  return response.data
}
