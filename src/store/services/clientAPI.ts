import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { ClientResponse } from "@/types/clientType"
import type { AddClientFormSchemaType } from "@/schemas/AddClientSchema"
import type { UpdateClientFormSchemaType } from "@/schemas/UpdateClientSchema"

export const clientAPI = createApi({
  reducerPath: "client",
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
  tagTypes: ["client"],
  endpoints: (build) => ({
    getClient: build.query<ClientResponse, void>({
      query: () => "/clients/",
      providesTags: ["client"],
    }),

    addClient: build.mutation<void, { data: AddClientFormSchemaType }>({
      query: ({ data }) => {
        const { confirmPassword: _, ...FormData } = data
        return {
          url: `/clients/client`,
          method: "POST",
          body: FormData,
        }
      },
      invalidatesTags: ["client"],
    }),

    updateClient: build.mutation<
      void,
      { id: number; data: UpdateClientFormSchemaType }
    >({
      query: ({ id, data }) => ({
        url: `/clients/client/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["client"],
    }),

    deleteClient: build.mutation<void, number>({
      query: (id) => ({
        url: `/clients/client/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["client"],
    }),
    blockClient: build.mutation<void, number>({
      query: (id) => ({
        url: `/clients/client/${id}/block`,
        method: "PUT",
      }),
      invalidatesTags: ["client"],
    }),

    unblockClient: build.mutation<void, number>({
      query: (id) => ({
        url: `/clients/client/${id}`,
        method: "PATCH",
        body: { isBlocked: 0 },
      }),
      invalidatesTags: ["client"],
    }),
  }),
})

export const {
  useGetClientQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useBlockClientMutation,
  useUnblockClientMutation,
} = clientAPI
