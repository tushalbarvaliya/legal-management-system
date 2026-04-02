import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { CasesResponse } from "@/types/caseType"
import type { AddCaseFormSchemaType } from "@/schemas/AddCaseSchema"
import type { UpdateCaseFormSchemaType } from "@/schemas/UpdateCaseSchema"

export const caseAPI = createApi({
  reducerPath: "case",
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
  tagTypes: ["case"],
  endpoints: (build) => ({
    getCase: build.query<CasesResponse, void>({
      query: () => "/cases/",
      providesTags: ["case"],
    }),

    addCase: build.mutation<void, { data: AddCaseFormSchemaType }>({
      query: ({ data }) => {
        return {
          url: `/cases/case`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["case"],
    }),

    updateCase: build.mutation<
      void,
      { id: number; data: UpdateCaseFormSchemaType }
    >({
      query: ({ id, data }) => ({
        url: `/cases/case/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["case"],
    }),

    deleteCase: build.mutation<void, number>({
      query: (id) => ({
        url: `/cases/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["case"],
    }),
  }),
})

export const { useGetCaseQuery, useAddCaseMutation, useUpdateCaseMutation ,useDeleteCaseMutation} =
  caseAPI
