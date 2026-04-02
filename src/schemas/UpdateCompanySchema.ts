import { addressRegex, emailRegex, phoneNumberRegex } from "@/utils/regex"
import z from "zod"

export const UpdateCompanyFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .regex(emailRegex, "Enter a valid email (e.g., user@example.com)"),

  name: z.string().trim().min(3, "Name must be at least 3 characters"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneNumberRegex, "Phone number must be exactly 10 digits"),

  Address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .regex(
      addressRegex,
      "Address can contain letters, numbers, and spaces only"
    ),
})

export type UpdateCompanyFormSchemaType = z.infer<
  typeof UpdateCompanyFormSchema
>
