import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  id?: number
  role?: string
  exp?: number
}

interface AuthState {
  token: string
  id: number | null
  role: string
}

const initialState: AuthState = {
  token: "",
  id: null,
  role: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token

      try {
        const decoded = jwtDecode<JwtPayload>(action.payload.token)
        state.role = decoded.role ?? ""
        state.id = decoded.id ?? null
      } catch (error) {
        console.error("Invalid token", error)
        state.token = ""   
        state.role = ""
        state.id = null
      }
    },

    removeAuth: (state) => {
      state.token = ""
      state.role = ""
      state.id = null
    },
  },
})

export const { setAuth, removeAuth } = authSlice.actions
export default authSlice.reducer