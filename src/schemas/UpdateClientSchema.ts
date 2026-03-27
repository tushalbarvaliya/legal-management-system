import { addressRegex, nameRegex, phoneNumberRegex } from "@/utils/regex"
import z from "zod"

export const UpdateClientSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters")
    .regex(nameRegex, "First name should contain only letters"),

  lastName: z
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters")
    .regex(nameRegex, "Last name should contain only letters"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneNumberRegex, "Phone number must be exactly 10 digits"),

  gender: z.string().min(1, "Gender is required"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .regex(
      addressRegex,
      "Address can contain letters, numbers, and spaces only"
    ),

  occupation: z
    .string()
    .trim()
    .min(3, "occupation must be at least 3 characters"),

  crNumber: z
    .number()
    .refine((val) => !isNaN(val), {
      message: "CR Number is required",
    })
    .min(0, "CR Number cannot be negative"),

  vatNumber: z
    .number()
    .refine((val) => !isNaN(val), {
      message: "Vat Number is required",
    })
    .min(0, "Var Number cannot be negative"),
  vatPercentage: z
    .number()
    .refine((val) => !isNaN(val), {
      message: "Vat Percentage is required",
    })
    .min(0, "Vat Percentage cannot be negative"),
})

export type UpdateClientFormSchemaType = z.infer<typeof UpdateClientSchema>
