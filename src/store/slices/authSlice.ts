import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface authState {
  token: string | null;
  role: string;
}

const initialState: authState = {
  token: null,
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string ,role:string}>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    
    removeToken: (state) => {
      state.token = null;
      state.role = "";
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
