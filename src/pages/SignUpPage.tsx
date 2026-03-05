import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";

type SignUpState = {
  firstName_error: string;
  lastName_error: string;
  email_error: string;
  password_error: string;
  confirmPassword_error: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
} | null;

const SignUpPage = () => {
  const [state, formAction, isPending] = useActionState<SignUpState, FormData>(
    signUpAction,
    null,
  );
  const navigate = useNavigate();

  function signUpAction(_state: SignUpState, formData: FormData) {
    // Error object
    const error = {
      firstName_error: "",
      lastName_error: "",
      email_error: "",
      password_error: "",
      confirmPassword_error: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    // get all the data
    const firstName = formData.get("firstName")?.toString() ?? "";
    const lastName = formData.get("lastName")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const confirmPassword = formData.get("confirm-password")?.toString() ?? "";
    //set value into error object
    error.firstName = firstName;
    error.lastName = lastName;
    error.email = email;
    error.password = password;
    error.confirmPassword = confirmPassword;

    // validation
    if (!firstName.trim()) {
      error.firstName_error = "Enter valid Input.";
    }
    if (!lastName.trim()) {
      error.lastName_error = "Enter valid Input.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error.email_error = "Please enter a valid email address";
    }
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < 8) {
      error.password_error = "Password must be at least 8 characters";
    } else if (!specialCharRegex.test(password)) {
      error.password_error = "Password must include a special character";
    }
    if (password !== confirmPassword || !password.trim()) {
      error.confirmPassword_error = "Password and confirm Password Not Match.";
    }

    // after validation.
    if (
      error.confirmPassword_error ||
      error.email_error ||
      error.firstName_error ||
      error.lastName_error ||
      error.password_error
    ) {
      return error;
    } else {
      // API Call and Set user as Client
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: error.email,
          firstName: error.firstName,
          lastName: error.lastName,
          password: error.password,
          role: "Client",
        }),
      );
      localStorage.setItem("token", "1234567890");
      alert("sign up success");
      navigate("/");
    }
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-full sm:max-w-md">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="text-2xl">Create An Account</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="flex gap-4 sm:flex-row flex-col">
                <Field>
                  <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter your First Name"
                    defaultValue={state?.firstName}
                  />
                  <FieldError>{state?.firstName_error}</FieldError>
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter your Last Name"
                    defaultValue={state?.lastName}
                  />
                  <FieldError>{state?.lastName_error}</FieldError>
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  defaultValue={state?.email}
                />
                <FieldError>{state?.email_error}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  defaultValue={state?.password}
                />
                <FieldError>{state?.password_error}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="Enter your password"
                  defaultValue={state?.confirmPassword}
                />
                <FieldError>{state?.confirmPassword_error}</FieldError>
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="mt-10">
            <Field orientation="horizontal">
              <Button type="reset" variant="outline">
                Reset
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Sign Up"}
              </Button>
            </Field>
          </CardFooter>
          <CardFooter>
            <CardDescription className="mt-4">
              Already have an Account!{" "}
              <Link to={"/login"} className="underline text-blue-600">
                Log in
              </Link>
              {/* temporary link */}
            </CardDescription>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUpPage;
