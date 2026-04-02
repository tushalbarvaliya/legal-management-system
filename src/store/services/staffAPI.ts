import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { StaffUserMapping } from "@/types/staffType"
import type { AddStaffFormSchemaType } from "@/schemas/AddStaffSchema"
import type { UpdateStaffFormSchemaType } from "@/schemas/updateStaffSchema"

export const staffAPI = createApi({
  reducerPath: "staff",
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
  tagTypes: ["staff"],
  endpoints: (build) => ({
    getStaff: build.query<StaffUserMapping[], void>({
      query: () => "/staff/",
      providesTags: ["staff"],
    }),

    addStaff: build.mutation<void, { data: AddStaffFormSchemaType }>({
      query: ({ data }) => {
        const { confirmPassword: _, ...FormData } = data
        return {
          url: `/staff/staff`,
          method: "POST",
          body: FormData,
        }
      },
      invalidatesTags: ["staff"],
    }),

    updateStaff: build.mutation<
      void,
      { id: number; data: UpdateStaffFormSchemaType }
    >({
      query: ({ id, data }) => ({
        url: `/staff/staff/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["staff"],
    }),

    deleteStaff: build.mutation<void, number>({
      query: (id) => ({
        url: `/staff/staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["staff"],
    }),
    blockStaff: build.mutation<void, number>({
      query: (id) => ({
        url: `/staff/staff/${id}/block`,
        method: "PUT",
      }),
      invalidatesTags: ["staff"],
    }),

    unblockStaff: build.mutation<void, number>({
      query: (id) => ({
        url: `/staff/staff/${id}`,
        method: "PATCH",
        body: { isBlocked: 0 },
      }),
      invalidatesTags: ["staff"],
    }),
  }),
})

export const {
  useGetStaffQuery,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useBlockStaffMutation,
  useUnblockStaffMutation,
} = staffAPI
