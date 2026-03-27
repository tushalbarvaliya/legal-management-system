import {
  addressRegex,
  emailRegex,
  nameRegex,
  passwordRegex,
  phoneNumberRegex,
  userNameRegex,
} from "@/utils/regex"
import z from "zod"

export const AddClientFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .regex(emailRegex, "Enter a valid email (e.g., user@example.com)"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Must include uppercase, lowercase, number, and special character"
      ),

    confirmPassword: z.string().min(1, "Confirm password is required"),

    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .regex(userNameRegex, "Username must contain letters and numbers only"),

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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type AddStaffFormSchemaType = z.infer<typeof AddClientFormSchema>
