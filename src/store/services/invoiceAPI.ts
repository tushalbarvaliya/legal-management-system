import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { invoiceDataType } from "@/types/invoiceType"
import type { AddInvoiceFormDataType } from "@/components/invoice/AddInvoiceModel"
import type { EditInvoiceFormDataType } from "@/components/invoice/EditInvoiceModel"

export const invoiceAPI = createApi({
  reducerPath: "invoice",
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
  tagTypes: ["invoice"],
  endpoints: (build) => ({
    getInvoice: build.query<invoiceDataType, void>({
      query: () => "/invoices/",
      providesTags: ["invoice"],
    }),

    addInvoice: build.mutation<void, { data: AddInvoiceFormDataType }>({
      query: ({ data }) => {
        return {
          url: `/invoices/invoice`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["invoice"],
    }),

    updateInvoice: build.mutation<
      void,
      { id: number; data: EditInvoiceFormDataType }
    >({
      query: ({ id, data }) => ({
        url: `/invoices/invoice/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["invoice"],
    }),

    deleteInvoice: build.mutation<void, number>({
      query: (id) => ({
        url: `/invoices/invoice/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoice"],
    }),
  }),
})

export const {
  useGetInvoiceQuery,
  useAddInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation
} = invoiceAPI
