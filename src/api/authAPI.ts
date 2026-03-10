import axios from "axios";

import type {
  LoginFormState,
  SignUpdata,
  SignUpFormState,
} from "@/types/formType";

export const login = async ({ userName, password }: LoginFormState) => {
  const data = { username: userName, password: password };
  const url = import.meta.env.VITE_BASE_URL + "/auth/login";
  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  console.log(response);

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
  const useAddress = address + city + state + pinCode;
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
  const url = import.meta.env.VITE_BASE_URL + "/auth/register";

  const response = await axios.post(url, data, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return response.data;
};



