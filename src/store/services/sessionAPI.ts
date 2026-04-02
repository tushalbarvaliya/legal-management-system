import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { SessionResponse } from "@/types/sessionType"
import type { AddSessionFormSchemaType } from "@/schemas/AddSessionSchema"

export const sessionAPI = createApi({
  reducerPath: "session",
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
  tagTypes: ["session"],
  endpoints: (build) => ({
    getSession: build.query<SessionResponse, void>({
      query: () => "/sessions/",
      providesTags: ["session"],
    }),

    addSession: build.mutation<void, { data: AddSessionFormSchemaType }>({
      query: ({ data }) => {
        return {
          url: `/sessions/session`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["session"],
    }),
  }),
})

export const { useGetSessionQuery, useAddSessionMutation } = sessionAPI
