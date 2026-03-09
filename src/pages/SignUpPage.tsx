import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

import { useDebounce } from "@/hooks/useDebounce";
import type { SignUpFormState } from "@/types/formType";
import { SingUpValidation } from "@/utils/formValidation";
import TextInput from "@/components/TextInput";
import PasswordInput from "@/components/PasswordInput";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/authAPI";
import { setToken } from "@/store/slices/authSlice";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState<SignUpFormState>({
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
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      dispatch(setToken(data));
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const debouncedFormState = useDebounce(formState, 500);

  const validateForm = useCallback(
    (data: SignUpFormState) => SingUpValidation(data),
    [],
  );

  const errors = useMemo(() => {
    return validateForm(debouncedFormState);
  }, [debouncedFormState, validateForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formState.firstName.trim() ||
      !formState.lastName.trim() ||
      !formState.email.trim() ||
      !formState.password.trim() ||
      !formState.confirmPassword.trim() ||
      !formState.phoneNumber.trim() ||
      !formState.address.trim() ||
      !formState.city.trim() ||
      !formState.state.trim() ||
      !formState.pinCode.trim() ||
      errors.firstName ||
      errors.lastName ||
      errors.email ||
      errors.password ||
      errors.confirmPassword ||
      errors.phoneNumber ||
      errors.address ||
      errors.city ||
      errors.state ||
      errors.pinCode
    ) {
      setFormError("SomeThing Is not Right Please Try Again.");
      return;
    } else {
      mutate(formState)
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <header className="mb-6 space-y-3 text-center">
          <div className="mx-auto inline-flex">
            <div className="group grid h-14 w-14 place-items-center rounded-xl border border-zinc-300 bg-zinc-900 text-xl font-semibold text-zinc-100 transition duration-200 hover:scale-105 hover:bg-zinc-800">
              <span className="transition-transform duration-200 group-hover:scale-110">
                AD
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Create your account
          </h1>
          <p className="text-sm text-zinc-500">
            Fill in your details to get started.
          </p>
        </header>

        <form id="signupForm" noValidate onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput
              handleChange={handleChange}
              error={errors.firstName}
              value={formState.firstName}
              label="firstName"
              title="First Name"
              type="text"
              placeholder="john"
            />
            <TextInput
              handleChange={handleChange}
              error={errors.lastName}
              value={formState.lastName}
              label="lastName"
              title="Last Name"
              type="text"
              placeholder="Deo"
            />
            <TextInput
              handleChange={handleChange}
              error={errors.email}
              value={formState.email}
              label="email"
              title="Email"
              type="email"
              placeholder="test@gmail.com"
            />
            <PasswordInput
              handleChange={handleChange}
              value={formState.password}
              error={errors.password}
              label="password"
              title="Password"
            />
            <PasswordInput
              handleChange={handleChange}
              value={formState.confirmPassword}
              error={errors.confirmPassword}
              label="confirmPassword"
              title="Confirm Password"
            />

            <TextInput
              handleChange={handleChange}
              error={errors.address}
              value={formState.address}
              label="address"
              title="Address"
              type="text"
              placeholder="Enter an Address"
            />
            <TextInput
              handleChange={handleChange}
              error={errors.pinCode}
              value={formState.pinCode}
              label="pinCode"
              title="Pin Code"
              type="number"
              placeholder="121232"
            />
            <TextInput
              handleChange={handleChange}
              error={errors.phoneNumber}
              value={formState.phoneNumber}
              label="phoneNumber"
              title="Phone Number"
              type="tel"
              placeholder="+91xxxxxxxxxx"
            />
            <TextInput
              handleChange={handleChange}
              error={errors.state}
              value={formState.state}
              label="state"
              title=" State"
              type="text"
              placeholder="Karnataka"
            />
            <TextInput
              handleChange={handleChange}
              error={errors.city}
              value={formState.city}
              label="city"
              title="City"
              type="text"
              placeholder="Bengaluru"
            />
          </div>
          <p className="min-h-5 text-xs text-red-600">{formError}</p>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 transition duration-200 hover:scale-[1.01] hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
          >
            {isPending ? "Creating...":'Create Account'}
          </button>

          <p className="text-center  mt-4 text-sm text-zinc-600">
            Already have an account?
            <Link
              to="/login"
              className="font-medium text-zinc-900 underline-offset-4 transition hover:text-zinc-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default SignUpPage;
