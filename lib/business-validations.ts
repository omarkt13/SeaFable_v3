import { z } from "zod"

export const businessLoginSchema = z.object({
  email: z.string().email("Please enter a valid business email address"),
  password: z.string().min(1, "Password is required"),
})

export const businessRegisterSchema = z
  .object({
    businessName: z
      .string()
      .min(2, "Business name must be at least 2 characters")
      .max(255, "Business name must be less than 255 characters"),
    contactName: z
      .string()
      .min(2, "Contact name must be at least 2 characters")
      .max(255, "Contact name must be less than 255 characters"),
    email: z.string().email("Please enter a valid business email address"),
    phone: z.string().optional(), // Optional based on your form, adjust if required
    businessType: z.string().optional(), // Optional based on your form, adjust if required
    location: z.string().optional(), // Optional based on your form, adjust if required
    description: z.string().optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type BusinessLoginInput = z.infer<typeof businessLoginSchema>
export type BusinessRegisterInput = z.infer<typeof businessRegisterSchema>
