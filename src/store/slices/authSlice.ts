import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  role: string;
  exp: number;
}

interface AuthState {
  token: string | null;
  role: string;
  id: string;
}

const initialState: AuthState = {
  token: null,
  role: "",
  id: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      try {
        const decoded = jwtDecode<JwtPayload>(action.payload.token);
        state.role = decoded.role || "";
        state.id = decoded.id;
      } catch (error) {
        console.error(`Invalid token ${error}`);
        state.role = "";
        state.id = "";
      }
    },

    removeToken: (state) => {
      state.token = null;
      state.role = "";
      state.id = "";
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
