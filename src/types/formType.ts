export type LoginFormState = {
  email: string;
  password: string;
};

export type SignUpFormState = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _confirmPassword: string;
  address: string;
  pinCode: string;
  phoneNumber: string;
  state: string;
  city: string;
};

export type SignUpdata = {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  address: string;
  companyId: number | string;
  isDeleted: boolean;
};

export type ResetPasswordState = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type ForgotPasswordState = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type DocsState = {
  title: string;
  caseID: string;
  description: string;
  fileLink: string;
  clientID: string;
  note: string;
};
