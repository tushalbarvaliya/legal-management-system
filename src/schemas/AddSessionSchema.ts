import z from "zod"

export const AddSessionFormSchema = z.object({
  courtName: z.string().min(3, "Court Name is required"),
  sessionDate: z.string().refine(
    (date) => {
      const inputDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return inputDate > today
    },
    {
      message: "caseClosedDate must be a future date",
    }
  ),
  sessionTime: z
    .string()
    .regex(/^\d{2}:\d{2}:\d{2}(\.\d+)?Z$/, "Invalid time format"),
  clientId: z.coerce
    .number<number>()
    .refine((val) => !isNaN(val), {
      message: "client ID is required",
    })
    .min(0, "client ID cannot be negative"),

  caseId: z.coerce
    .number<number>()
    .refine((val) => !isNaN(val), {
      message: "Case ID is required",
    })
    .min(0, "Case ID cannot be negative"),
})

export type AddSessionFormSchemaType = z.input<typeof AddSessionFormSchema>
