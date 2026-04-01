import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { UpdateCompanyFormSchemaType } from "@/schemas/UpdateCompanySchema"
import type { CompanyData } from "@/types/companyType"

type CompanyResponse = {
  data: { company: CompanyData[] }
  message: string
}

type CompanyUpdateResponse = {
  data: { company: CompanyData }
  message: string
}

export const companyAPI = createApi({
  reducerPath: "companyAPI",
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
  tagTypes: ["Company"],
  endpoints: (build) => ({
    getCompanyData: build.query<CompanyResponse, void>({
      query: () => `/companies/`,
      providesTags: ["Company"],
    }),
    updateCompany: build.mutation<
      CompanyUpdateResponse,
      { id: number; data: Partial<UpdateCompanyFormSchemaType> }
    >({
      query: ({ id, data }) => ({
        url: `/companies/company/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
  }),
})

export const { useGetCompanyDataQuery, useUpdateCompanyMutation } = companyAPI
