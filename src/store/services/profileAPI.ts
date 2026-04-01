import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { ProfileData } from "@/types/types"
import type { ProfileFormData } from "@/schemas/EditProfileSchema"

type ProfileResponse = {
  data: ProfileData
  message: string
}

export const profileAPI = createApi({
  reducerPath: "profile",
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
  tagTypes: ["profile"],
  endpoints: (build) => ({
    getProfile: build.query<ProfileResponse, void>({
      query: () => "/users/profile",
      providesTags: ["profile"],
    }),

    updateProfile: build.mutation<void, { data: ProfileFormData }>({
      query: ({ data }) => ({
        url: `/users/updateProfile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
})

export const { useGetProfileQuery,useUpdateProfileMutation } = profileAPI
