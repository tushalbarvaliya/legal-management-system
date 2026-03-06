import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: "Client" | "Lawyer" | "Admin" | "Staff";
  token: null | string;
}

const initialState: UserState = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  role: "Staff",
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        email: string;
        firstName: string;
        lastName: string;
        password: string;
      }>,
    ) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.password = action.payload.password;
      state.token = "1234567890";
      state.role = initialState.role;
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.password = "";
      state.token = null;
      state.role = "Client";
    },
    updateUser: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
      }>,
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
  },
});

export const { setUser, setToken, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
