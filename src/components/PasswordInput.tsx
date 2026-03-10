import { useState } from "react";

type PasswordInput = {
  value?: string;
  error: string;
  label: string;
  title: string;
};

const PasswordInput = ({
  value,
  error,
  label,
  title,
}: PasswordInput) => {
  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <div>
      <label htmlFor={label} className="text-sm font-medium text-zinc-800">
        {title}
      </label>
      <div className="relative">
        <input
          id={label}
          name={label}
          type={passwordShow ? "text" : "password"}
          autoComplete="off"
          placeholder="Create a password"
          className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
          value={value}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 grid w-10 place-items-center text-zinc-500 transition hover:text-zinc-700"
          onClick={() => {
            setPasswordShow((prev) => !prev);
          }}
        >
          <img
            src={passwordShow ? "/closeEye.svg" : "/openEye.svg"}
            alt="button"
            className="scale-70 opacity-50"
          />
        </button>
      </div>
      <p className="min-h-5 text-xs text-red-600">{error}</p>
    </div>
  );
};

export default PasswordInput;
