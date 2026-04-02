import { z } from "zod"

export const AddTaskSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters"),

  caseId: z.coerce
    .number<number>()
    .refine((val) => !isNaN(val), {
      message: "Case ID is required",
    })
    .min(1, "Case ID must be greater than 0"),

  priority: z.enum(["low", "medium", "high"]),

  dueDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
    })
    .refine(
      (val) => {
        const inputDate = new Date(val)
        const today = new Date()
        inputDate.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)
        return inputDate >= today
      },
      {
        message: "Due date must be today or in the future",
      }
    ),
})

export type AddTaskType = z.input<typeof AddTaskSchema>
