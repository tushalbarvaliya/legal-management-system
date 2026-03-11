import axiosInstance from "@/api/axiosInstance";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  address: string;
  updatedAt: string;
  phoneNumber: string;
  createdAt: string;
  loading: boolean;
  error: unknown;
}

const initialState: UserState = {
  email: "",
  firstName: "",
  lastName: "",
  role: "",
  address: "",
  createdAt: "",
  phoneNumber: "",
  username: "",
  updatedAt: "",
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.username = action.payload.name;
        state.address = action.payload.address;
        state.phoneNumber = action.payload.phoneNumber;
        state.role = action.payload.role;
        state.createdAt = action.payload.createdAt;
        state.updatedAt = action.payload.updatedAt;
      });
  },
});

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axiosInstance.get("/users/profile");
  console.log("fetchUser", response.data);
  return response.data;
});

export default userSlice.reducer;
