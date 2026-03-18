import type {
  ForgotPasswordState,
  LoginFormState,
  ResetPasswordState,
  SignUpdata,
  SignUpFormState,
} from "@/types/formType";
import axiosInstance from "./axiosInstance";

export const login = async ({ email, password }: LoginFormState) => {
  const data = { email: email, password: password };
  const response = await axiosInstance.post("/auth/login", data, {
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
  const data: SignUpdata = {
    username: userName,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    role: "guest",
    address: address,
    companyId: "1",
    isDeleted: false,
    isBlock: false,
    pinCode: pinCode,
    state: state,
    city: city,
  };

  const response = await axiosInstance.post("/auth/register", data, {
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
  const data = { oldPassword: oldPassword, newPassword: newPassword };
  const response = await axiosInstance.put("/users/change_password", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const forgetPasswordAPI = async ({
  confirmPassword: _confirmPassword,
  email,
  password,
}: ForgotPasswordState) => {
  const data = { email: email, newPassword: password };
  const response = await axiosInstance.put("/users/forgot_password", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const profileUpdate = async (data: SignUpFormState) => {
  const response = await axiosInstance.patch("/users/updateProfile", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
