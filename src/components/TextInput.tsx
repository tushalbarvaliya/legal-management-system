type InputType = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: string;
  label: string;
  title: string;
  type: string;
  placeholder:string;
};

const TextInput = ({
  handleChange,
  value,
  error,
  label,
  title,
  type,
  placeholder,
}: InputType) => {
  return (
    <div
      className={`${label == "email" || label == "address" ? "sm:col-span-2" : null}`}
    >
      <label htmlFor={label} className="text-sm font-medium text-zinc-800">
        {title}
      </label>
      <input
        id={label}
        name={label}
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        className="field block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
        onChange={handleChange}
        value={value}
        required
      />
      <p id="firstNameError" className="min-h-5 text-xs text-red-600">
        {error}
      </p>
    </div>
  );
};

export default TextInput;
