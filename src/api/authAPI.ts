import type { LoginFormState, SignUpFormState } from "@/types/formType";

export const login = async ({ email, password }: LoginFormState) => {
  console.log(email, password);
  // const response = await fetch("url", {
  //   headers: { "Content-Type": "application/json" },
  //   method: "POST",
  //   body: JSON.stringify({ email, password }),
  // });
  const response = await new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve(
        new Response(JSON.stringify({ token: "123456798" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    }, 2000);
  });
  if (!response.ok) {
    throw new Error("Login Failed");
  }
  const data = response.json();
  return data;
};

export const signUp = async ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  address,
  pinCode,
  phoneNumber,
  state,
  city,
}: SignUpFormState) => {
  console.log(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    address,
    pinCode,
    phoneNumber,
    state,
    city,
  );

  // const response = await fetch("url", {
  //   headers: { "Content-Type": "application/json" },
  //   method: "POST",
  //   body: JSON.stringify({
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //     confirmPassword,
  //     address,
  //     pinCode,
  //     phoneNumber,
  //     state,
  //     city,
  //   }),
  // });
  const response = await new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve(
        new Response(JSON.stringify({ token: "123456798" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    }, 2000);
  });
  if (!response.ok) {
    throw new Error("Login Failed");
  }
  const data = response.json();
  return data;
};
