import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";

import { useDebounce } from "@/hooks/useDebounce";
import type { LoginFormState } from "@/types/formType";
import { LoginValidation } from "@/utils/formValidation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/authAPI";
import { setToken } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const debouncedFormState = useDebounce(formState, 500);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(setToken(data));
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const validateForm = useCallback(
    (data: LoginFormState) => LoginValidation(data),
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
      !formState.email.trim() ||
      !formState.password.trim() ||
      errors.email ||
      errors.password
    ) {
      setFormError("SomeThing Is not Right Please Try Again.");
      return;
    } else {
      mutate({ email: formState.email, password: formState.password });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <header className="mb-6 flex flex-col gap-3 text-center">
          <div className="mx-auto grid h-12 w-12 items-center rounded-xl border border-zinc-300 bg-zinc-900 text-lg font-semibold text-zinc-100">
            AD
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Sign in
          </h1>

          <p className="text-sm text-zinc-500">
            Enter your credentials to continue.
          </p>
        </header>

        <form
          id="loginForm"
          noValidate
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-800"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="off"
              value={formState.email}
              onChange={handleChange}
              className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />

            <p className="min-h-5 text-xs text-red-600">{errors.email}</p>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-800"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={passwordShow ? "text" : "password"}
                autoComplete="off"
                placeholder="Enter your password"
                value={formState.password}
                onChange={handleChange}
                className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 grid w-10 place-items-center text-zinc-500 hover:text-zinc-700"
                onClick={() => setPasswordShow((prev) => !prev)}
              >
                <img
                  src={passwordShow ? "/closeEye.svg" : "/openEye.svg"}
                  alt="button"
                  className="scale-70 opacity-50"
                />
              </button>
            </div>

            <p className="min-h-5 text-xs text-red-600">{errors.password}</p>

            <div className="flex justify-end">
              <Link
                to="#"
                className="text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <p className="min-h-5 text-xs text-red-600">{formError}</p>
          {/* Submit */}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            disabled={isPending}
          >
            {isPending ? "Logging.." : "Login"}
          </button>

          <p className="text-center text-sm text-zinc-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-zinc-900 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
