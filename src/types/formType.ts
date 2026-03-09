export type LoginFormState = {
  email: string;
  password: string;
};

export type LoginFormErrors = {
  email: string;
  password: string;
};

export type SignUpFormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  pinCode: string;
  phoneNumber: string;
  state: string;
  city: string;
};

export type SignupFormErrors = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  pinCode: string;
  phoneNumber: string;
  state: string;
  city: string;
};
