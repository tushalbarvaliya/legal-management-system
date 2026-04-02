import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { RootState } from "../store"
import type { TaskType } from "@/types/taskType"
import type { AddTaskType } from "@/schemas/AddTaskSchema"
import type { UpdateTaskType } from "@/schemas/UpdateTaskSchema"

export const taskAPI = createApi({
  reducerPath: "task",
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
  tagTypes: ["task"],
  endpoints: (build) => ({
    getTask: build.query<TaskType, void>({
      query: () => "/tasks/",
      providesTags: ["task"],
    }),

    addTask: build.mutation<void, { data: AddTaskType }>({
      query: ({ data }) => {
        return {
          url: `/tasks/task`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["task"],
    }),

    updateTask: build.mutation<void, { id: number; data: UpdateTaskType }>({
      query: ({ id, data }) => ({
        url: `/tasks/task/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["task"],
    }),
    marksAsDone: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/tasks/task/${id}/markAsDone`,
        method: "PATCH",
      }),
      invalidatesTags: ["task"],
    }),

    deleteTask: build.mutation<void, number>({
      query: (id) => ({
        url: `/tasks/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["task"],
    }),
  }),
})

export const { useGetTaskQuery, useAddTaskMutation, useUpdateTaskMutation,useMarksAsDoneMutation,useDeleteTaskMutation } =
  taskAPI
