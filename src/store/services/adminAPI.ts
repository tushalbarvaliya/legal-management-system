import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { ProfileResponse } from "@/types/types"

type TaskCountResponse = {
  data: { pending: number; overdue: number; completed: number }
  message: string
}

type CaseCountResponse = {
  data: {
    openCases: number
    closedCases: number
    newCasesLast30Days: number
  }
  message: string
}

type caseChangeStatus = {
  data: { casesStatusChangeInLast30Days: number }
  message: "success"
}

type Invoice = {
  id: number
  status: "pending" | "paid" | "failed"
  totalAmount: number
  clientId: number
  companyId: number
  stripePaymentIntentId: string | null
  paymentStatus: "pending" | "paid" | "failed"
  paidAt: string | null
  updatedAt: string
  totalHours: number
  caseId: number
  lawyerId: number
  stripeSessionId: string | null
  paymentMethod: string | null
  createdAt: string
}

type InvoiceResponse = {
  data: {
    invoices: Invoice[]
    total_paid: number
    total_pending: number
  }
  message: string
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
  tagTypes: ["users", "taskCount", "caseCount", "caseStatus", "invoiceStatus"],
  endpoints: (build) => ({
    getUser: build.query<ProfileResponse, void>({
      query: () => "/users/",
      providesTags: ["users"],
    }),

    getTaskCount: build.query<TaskCountResponse, void>({
      query: () => "/admins/dashboard/task_counts",
      providesTags: ["taskCount"],
    }),
    getCaseCount: build.query<CaseCountResponse, void>({
      query: () => "/admins/dashboard/case_counts",
      providesTags: ["caseCount"],
    }),
    getCaseStatus: build.query<caseChangeStatus, void>({
      query: () => "/admins/dashboard/status_counts",
      providesTags: ["caseStatus"],
    }),
    getInvoiceStatus: build.query<InvoiceResponse, void>({
      query: () => "/invoices/invoice/",
      providesTags: ["invoiceStatus"],
    }),
  }),
})

export const {
  useGetUserQuery,
  useGetTaskCountQuery,
  useGetCaseCountQuery,
  useGetCaseStatusQuery,
  useGetInvoiceStatusQuery,
} = adminAPI
