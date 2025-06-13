import { z } from "zod"

// Define environment schema with fallbacks for development
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_URL is required")
    .url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url("NEXT_PUBLIC_APP_URL must be a valid URL")
    .optional()
    .default(process.env.NODE_ENV === "production" ? "https://your-production-app-url.com" : "http://localhost:3000"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
})

// Function to safely parse environment variables with helpful error messages
function parseEnv() {
  const result = envSchema.safeParse(process.env)
  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.flatten().fieldErrors)
    throw new Error("Invalid environment variables. Check server logs for more details.")
  }
  return result.data
}

export const env = parseEnv()
