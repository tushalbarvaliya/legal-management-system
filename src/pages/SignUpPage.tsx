import { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "@/store/slices/userSlice";
import type { RootState } from "@/store/store";
import { emailRegex, specialCharRegex } from "@/const/const";

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
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, formAction, isPending] = useActionState<SignUpState, FormData>(
    signUpAction,
    null,
  );
  const navigate = useNavigate();

  // Protect route
  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  }, [user.token, navigate]);
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
    if (!emailRegex.test(email)) {
      error.email_error = "Please enter a valid email address";
    }
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
      // API Call and POst user as Client
      dispatch(
        setUser({
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
        }),
      );
      dispatch(setToken({ token: "1234567890" }));
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
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    defaultValue={state?.password}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <FieldError>{state?.password_error}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    defaultValue={state?.confirmPassword}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                    aria-label={
                      showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
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
