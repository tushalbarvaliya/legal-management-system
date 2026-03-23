import {
  loginAdminResponse,
  loginLawyerResponse,
  loginStaffResponse,
} from "@/data/loginData"
import axiosInstance from "./axiosInstance"

type loginProps = {
  email: string
  password: string
}

export const login = async ({ email, password }: loginProps) => {
  try {
    const data = { username: email, password: password }
    const response = await axiosInstance.post("/auth/login", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    return response.data
  } catch {
    return loginLawyerResponse
    return loginStaffResponse
    return loginAdminResponse
  }
}

type forgotPasswordProps = {
  email: string
  new_password: string
}
export const forgetPasswordAPI = async ({
  email,
  new_password,
}: forgotPasswordProps) => {
  try {
    const data: forgotPasswordProps = {
      email: email,
      new_password: new_password,
    }
    const response = await axiosInstance.put("/users/forgot_password", data)
    return response.data
  } catch {
    console.log({ email, new_password })
    return {
      message: "Password changed successfully",
    }
  }
}

type SignupProps = {
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

export const signUp = async (signUpData: SignUpFormdata) => {
  const data: SignupProps = signUpData
  data.companyId = 1
  try {
    const response = await axiosInstance.post("/auth/register", data)
    return response.data
  } catch {
    console.log(data)
    return null
  }
}
