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

type LoginState = {
  email: string;
  password: string;
  email_error: string;
  password_error: string;
} | null;

const LoginPage = () => {
  const navigate=useNavigate()
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    null,
  );

  function loginAction(_state: LoginState, formData: FormData): LoginState {
    const error = {
      email_error: "",
      password_error: "",
      email: "",
      password: "",
    };
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    error.email = email;
    error.password = password;
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error.email_error = "Please enter a valid email address";
    }
    // Password validation
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < 8) {
      error.password_error = "Password must be at least 8 characters";
    } else if (!specialCharRegex.test(password)) {
      error.password_error = "Password must include a special character";
    }
    if (error.email_error || error.password_error) {
      return error;
    }
    if (!error.email_error && !error.password_error) {
      // API Call To Get To Token
      alert("Login success!");
      localStorage.setItem("token", "1234567890");
      navigate('/')
    }
    return null;
  }
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-full sm:max-w-md">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
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
            </FieldGroup>
          </CardContent>
          <CardFooter className="mt-10">
            <Field orientation="horizontal">
              <Button type="reset" variant="outline">
                Reset
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </Field>
          </CardFooter>
          <CardFooter>
            <CardDescription className="mt-4">
              Haven't Register yet!{" "}
              <Link to={"/signup"} className="underline text-blue-600">
                Sign Up
              </Link>
            </CardDescription>
          </CardFooter>
        </form>
        <Link to="/" className="ml-auto pr-4 text-sm text-blue-600 underline">
          Forget Password
        </Link>
      </Card>
    </div>
  );
};

export default LoginPage;