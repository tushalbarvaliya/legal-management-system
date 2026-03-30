import z from "zod"

export const AddCaseFormSchema = z.object({
  caseNumber: z.coerce
    .number<number>()
    .refine((val) => !isNaN(val), {
      message: "Case Number is required",
    })
    .min(0, "Case Number cannot be negative"),

  title: z.string().min(3, "Title is required"),
  description: z.string().min(3, "Description is required"),
  type: z.enum([
    "civil",
    "criminal",
    "family",
    "corporate",
    "labor",
    "property",
    "tax",
    "consumer",
    "immigration",
    "intellectual_property",
    "bankruptcy",
    "environmental",
    "other",
  ]),
  status: z.enum(["open", "closed"]),
  caseClosedDate: z.string().refine(
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
  caseStage: z.string().min(3, "Stage is required"),
  caseCity: z.string().min(3, "City is required"),
  clientId: z.coerce
    .number<number>()
    .refine((val) => !isNaN(val), {
      message: "client ID is required",
    })
    .min(0, "client ID cannot be negative"),
})

export type AddCaseFormSchemaType = z.input<typeof AddCaseFormSchema>
