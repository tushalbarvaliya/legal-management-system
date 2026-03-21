import { loginAdminResponse, loginLawyerResponse, loginStaffResponse } from "@/data/loginData"
import axiosInstance from "./axiosInstance"
import { data } from "react-router-dom"

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
    console.log(data);
    return loginAdminResponse
    return loginLawyerResponse
    return loginStaffResponse
  }
}
