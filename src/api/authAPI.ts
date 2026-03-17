import type {
  ForgotPasswordState,
  LoginFormState,
  ResetPasswordState,
  SignUpdata,
  SignUpFormState,
} from "@/types/formType";
import axiosInstance from "./axiosInstance";

// local api done
export const login = async ({ email, password }: LoginFormState) => {
  const data = { email: email, password: password };
  const response = await axiosInstance.post("/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const signUp = async ({
  userName,
  firstName,
  lastName,
  email,
  password,
  _confirmPassword,
  address,
  pinCode,
  phoneNumber,
  state,
  city,
}: SignUpFormState) => {
  const useAddress = address + "$" + city + "$" + state + "$" + pinCode;
  const data: SignUpdata = {
    username: userName,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    address: useAddress,
    companyId: "1",
    isDeleted: false,
  };
  const response = await axiosInstance.post("/signup", data, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return response.data;
};











export const resetPasswordAPI = async ({
  confirmNewPassword: _confirmPassword,
  newPassword,
  oldPassword,
}: ResetPasswordState) => {
  const data = { password: oldPassword, new_password: newPassword };
  const response = await axiosInstance.put("/users/change_password", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// api not se
export const forgetPasswordAPI = async ({
  confirmPassword: _confirmPassword,
  email,
  password,
}: ForgotPasswordState) => {
  const data = { email: email, new_password: password };
  const response = await axiosInstance.put("/users/forgot_password", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
