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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type SignUpState = {
  email: string;
  password: string;
} | null;

function signUpAction(_state: SignUpState, formData: FormData) {
  formData.get("email");
  return null;
}

const SignUpPage = () => {
  const [state, formAction, isPending] = useActionState<SignUpState, FormData>(
    signUpAction,
    null,
  );
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-full sm:max-w-md">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
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
                  />
                  <FieldError>{state?.email}</FieldError>
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter your Last Name"
                  />
                  <FieldError>{state?.email}</FieldError>
                </Field>
              </div>
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
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="Enter your password"
                />
                <FieldError>{state?.password}</FieldError>
              </Field>
              <Field>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="lawyer">Lawyer</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
        </form>
      </Card>
    </div>
  );
};

export default SignUpPage;
