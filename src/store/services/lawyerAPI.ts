import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { LawyerDataType } from "@/types/lawyerType"

export const lawyerAPI = createApi({
  reducerPath: "lawyer",
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
  tagTypes: ["lawyer"],
  endpoints: (build) => ({
    getLawyer: build.query<{ data: LawyerDataType[] }, void>({
      query: () => "/lawyers/",
      providesTags: ["lawyer"],
    }),
  }),
})

export const { useGetLawyerQuery } = lawyerAPI
