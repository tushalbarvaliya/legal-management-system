import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

type LoginState = {
  email: string;
  password: string;
} | null;

function loginAction(_state: LoginState, formData: FormData): LoginState {
  const error = { email: "", password: "" };

  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    error.email = "Please enter a valid email address";
  }

  // Password validation
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (password.length < 8) {
    error.password = "Password must be at least 8 characters";
  } else if (!specialCharRegex.test(password)) {
    error.password = "Password must include a special character";
  }

  if (error.email || error.password) {
    return error;
  }

  return null;
}

const LoginPage = () => {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    loginAction,
    null,
  );

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
                />
                <FieldError>{state?.email}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
                <FieldError>{state?.password}</FieldError>
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
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
