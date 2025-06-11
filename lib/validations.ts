import { z } from "zod"

// User registration schema
export const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
})

// User login schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

// Business registration schema
export const businessRegisterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be less than 100 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be less than 20 characters")
    .optional(),
})

// Business login schema
export const businessLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

// Experience search schema
export const experienceSearchSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  date: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  duration: z.number().optional(),
  category: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
  sortBy: z.enum(["price", "rating", "date", "duration"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
})

// Experience creation schema
export const experienceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must be less than 2000 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  duration: z.number().min(0.5, "Duration must be at least 30 minutes"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
})

// Booking schema
export const bookingSchema = z.object({
  experienceId: z.string().uuid("Invalid experience ID"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  guests: z.number().min(1, "Must have at least 1 guest"),
  specialRequests: z.string().max(500, "Special requests must be less than 500 characters").optional(),
})

// Review schema
export const reviewSchema = z.object({
  experienceId: z.string().uuid("Invalid experience ID"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  comment: z.string().max(1000, "Comment must be less than 1000 characters").optional(),
})

// Profile update schema
export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .optional(),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  phoneNumber: z.string().max(20, "Phone number must be less than 20 characters").optional(),
  avatarUrl: z.string().url("Avatar URL must be a valid URL").optional(),
})

// Password update schema
export const passwordUpdateSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(100, "New password must be less than 100 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
})

// Export all schemas
export default {
  registerSchema,
  loginSchema,
  businessRegisterSchema,
  businessLoginSchema,
  experienceSearchSchema,
  experienceSchema,
  bookingSchema,
  reviewSchema,
  profileUpdateSchema,
  passwordUpdateSchema,
  contactFormSchema,
}
