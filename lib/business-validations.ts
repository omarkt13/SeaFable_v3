import { z } from "zod"

// Enhanced business login schema with comprehensive validation
export const businessLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
})

// Enhanced business registration schema
export const businessRegisterSchema = z
  .object({
    businessName: z
      .string()
      .min(2, "Business name must be at least 2 characters")
      .max(255, "Business name must be less than 255 characters")
      .trim(),
    contactName: z
      .string()
      .min(2, "Contact name must be at least 2 characters")
      .max(255, "Contact name must be less than 255 characters")
      .trim(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid business email address")
      .max(255, "Email must be less than 255 characters")
      .toLowerCase()
      .trim(),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || /^\+?[\d\s\-$$$$]{10,}$/.test(val), {
        message: "Please enter a valid phone number",
      }),
    businessType: z.string().optional(),
    location: z.string().optional(),
    description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type BusinessLoginInput = z.infer<typeof businessLoginSchema>
export type BusinessRegisterInput = z.infer<typeof businessRegisterSchema>

// Validation helper functions
export function validateBusinessEmail(email: string): { valid: boolean; error?: string } {
  try {
    businessLoginSchema.pick({ email: true }).parse({ email })
    return { valid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0].message }
    }
    return { valid: false, error: "Invalid email format" }
  }
}

export function validateBusinessPassword(password: string): { valid: boolean; error?: string } {
  try {
    businessLoginSchema.pick({ password: true }).parse({ password })
    return { valid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0].message }
    }
    return { valid: false, error: "Invalid password" }
  }
}
