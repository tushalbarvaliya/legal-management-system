import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface authState {
  token: null | string;
}

const initialState: authState = {
  token: "null",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
