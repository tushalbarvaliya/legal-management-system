import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { ProfileResponse } from "@/types/types"

type TaskCountResponse = {
  data: { pending: number; overdue: number; completed: number }
  message: "success"
}

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
  tagTypes: ["users", "taskCount"],
  endpoints: (build) => ({
    getUser: build.query<ProfileResponse, void>({
      query: () => "/users/",
      providesTags: ["users"],
    }),

    getTaskCount: build.query<TaskCountResponse, void>({
      query: () => "/admins/dashboard/task_counts",
      providesTags: ["taskCount"],
    }),
  }),
})

export const { useGetUserQuery, useGetTaskCountQuery } = adminAPI
