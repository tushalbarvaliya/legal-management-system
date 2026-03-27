import { z } from "zod"

export const UpdateTaskSchema = z.object({
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
    
  assignedTo: z.coerce
    .number<number>()
    .refine((val) => !isNaN(val), {
      message: "Case ID is required",
    })
    .min(1, "Case ID must be greater than 0"),

  priority: z.enum(["low", "medium", "high"]),
})

export type UpdateTaskType = z.input<typeof UpdateTaskSchema>
