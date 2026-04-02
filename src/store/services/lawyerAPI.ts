import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { LawyerDataType } from "@/types/lawyerType"
import type { AddLawyerFormSchemaType } from "@/schemas/AddLawyerSchema"
import type { UpdateLawyerFormSchemaType } from "@/schemas/UpdateLawyerSchema"

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

    addLawyer: build.mutation<void, { data: AddLawyerFormSchemaType }>({
      query: ({ data }) => {
        const { confirmPassword: _, ...FormData } = data
        return {
          url: `/lawyers/lawyer`,
          method: "POST",
          body: FormData,
        }
      },
      invalidatesTags: ["lawyer"],
    }),
    updateLawyer: build.mutation<
      void,
      { id: number; data: UpdateLawyerFormSchemaType }
    >({
      query: ({ id, data }) => ({
        url: `/staff/staff/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["lawyer"],
    }),

    deleteLawyer: build.mutation<void, number>({
      query: (id) => ({
        url: `/lawyers/lawyer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lawyer"],
    }),
    blockLawyer: build.mutation<void, number>({
      query: (id) => ({
        url: `/lawyers/lawyer/${id}/block`,
        method: "PUT",
      }),
      invalidatesTags: ["lawyer"],
    }),

    unblockLawyer: build.mutation<void, number>({
      query: (id) => ({
        url: `/lawyers/lawyer/${id}`,
        method: "PATCH",
        body: { isBlocked: 0 },
      }),
      invalidatesTags: ["lawyer"],
    }),
  }),
})

export const {
  useGetLawyerQuery,
  useAddLawyerMutation,
  useUpdateLawyerMutation,
  useDeleteLawyerMutation,
  useUnblockLawyerMutation,
  useBlockLawyerMutation,
} = lawyerAPI
