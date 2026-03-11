import type {
  LoginFormState,
  SignUpdata,
  SignUpFormState,
} from "@/types/formType";
import axiosInstance from "./axiosInstance";

export const login = async ({ userName, password }: LoginFormState) => {
  const data = { username: userName, password: password };
  const response = await axiosInstance.post("/auth/login", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
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
    name: userName,
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    role: "ADMIN",
    address: useAddress,
    companyId: "1",
    isDeleted: false,
  };

  const response = await axiosInstance.post("/auth/register", data, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return response.data;
};
