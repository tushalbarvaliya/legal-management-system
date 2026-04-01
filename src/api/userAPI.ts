import axiosInstance from "./axiosInstance"

export type putReqDataType = {
  password: string
  new_password: string
}

export const putResetPassword = async (data: putReqDataType) => {
  const response = await axiosInstance.put("/users/change_password", data)
  return response.data
}
