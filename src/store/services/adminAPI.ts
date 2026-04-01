import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { ProfileResponse } from "@/types/types"

export const adminAPI = createApi({
  reducerPath: "admin",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      headers.set("Content-Type", "application/json")
      return headers
    },
  }),
  tagTypes:['users','taskCOunt'],
  endpoints: (build) => ({
    getUser:build.query<ProfileResponse,void>({
      query:()=>"/users/",
      providesTags:['users']
    }),
  }),
})

export const {useGetUserQuery} = adminAPI