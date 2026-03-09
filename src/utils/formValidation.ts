import {
  emailRegex,
  passwordRegex,
  PhoneNumberRegex,
  pinCodeRegex,
} from "@/utils/constant";
import type {
  LoginFormErrors,
  LoginFormState,
  SignupFormErrors,
  SignUpFormState,
} from "@/types/formType";

function LoginValidation(data: LoginFormState): LoginFormErrors {
  const newErrors: LoginFormErrors = { email: "", password: "" };

  if (data.email && !emailRegex.test(data.email)) {
    newErrors.email =
      "Email must be a valid address and contain only one domain.";
  }

  if (
    data.password &&
    (data.password.length < 8 || !passwordRegex.test(data.password))
  ) {
    newErrors.password =
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
  }

  return newErrors;
}

function SingUpValidation(data: SignUpFormState): SignupFormErrors {
  const newErrors: SignupFormErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    pinCode: "",
    phoneNumber: "",
    state: "",
    city: "",
  };
  if (data.firstName && data.firstName.length < 3) {
    newErrors.firstName = "Please Enter Valid Name";
  }
  if (data.lastName && data.lastName.length < 3) {
    newErrors.lastName = "Please Enter Valid Name";
  }
  if (data.address && data.address.length < 3) {
    newErrors.address = "Please Enter Valid address";
  }
  if (data.state && data.state.length < 3) {
    newErrors.state = "Please Enter Valid state";
  }
  if (data.city && data.city.length < 3) {
    newErrors.city = "Please Enter Valid city";
  }
  if (data.pinCode && !pinCodeRegex.test(data.pinCode)) {
    newErrors.pinCode = "pin code must be exactly 6 digits.";
  }

  if (data.phoneNumber && !PhoneNumberRegex.test(data.phoneNumber)) {
    newErrors.phoneNumber =
      "Phone number must start with +91 and contain 10 digits.";
  }
  if (data.email && !emailRegex.test(data.email)) {
    newErrors.email =
      "Email must be a valid address and contain only one domain.";
  }

  if (
    data.password &&
    (data.password.length < 8 || !passwordRegex.test(data.password))
  ) {
    newErrors.password =
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
  }

  if (data.confirmPassword && data.confirmPassword !== data.password) {
    newErrors.confirmPassword = "Confirm password and password should be same";
  }

  return newErrors;
}

export { LoginValidation, SingUpValidation };
