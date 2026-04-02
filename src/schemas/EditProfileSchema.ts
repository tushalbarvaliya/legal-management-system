import { addressRegex, nameRegex, phoneNumberRegex } from "@/utils/regex"
import { z } from "zod"

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "Min 2 characters")
    .max(50, "Max 50 characters")
    .regex(nameRegex, "Only letters allowed")
    .nonempty("Cannot be empty"),
  lastName: z
    .string()
    .min(2, "Min 2 characters")
    .max(50, "Max 50 characters")
    .regex(nameRegex, "Only letters allowed")
    .nonempty("Cannot be empty"),
  address: z
    .string()
    .min(5, "Too short")
    .max(200, "Too long")
    .regex(addressRegex, "Invalid address"),
  phoneNumber: z.string().regex(phoneNumberRegex, "Invalid phone number"),
  gender: z.string(),
  role: z.string().optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>
