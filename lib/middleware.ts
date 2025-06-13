import type { z } from "zod"
import { logger } from "@/lib/logger" // Assuming logger is available and correctly typed

// Define a generic return type for validation
type ValidationResult<T> = { success: true; data: T } | { success: false; error: string }

export function validateRequest<T extends z.ZodSchema>(schema: T, data: unknown): ValidationResult<z.infer<T>> {
  const result = schema.safeParse(data)
  if (!result.success) {
    // Log validation errors for debugging/monitoring
    logger.warn("Validation failed", {
      errors: result.error.errors.map((e) => ({ path: e.path, message: e.message })),
      input: data,
    })
    return { success: false, error: result.error.errors.map((e) => e.message).join(", ") }
  }
  return { success: true, data: result.data }
}

// You might also have other middleware functions here, e.g., for authentication or rate limiting.
// Example of a simple authentication middleware (if needed, not directly related to this fix)
export async function authMiddleware(request: Request) {
  // Implement your authentication logic here
  // For example, check for a session token or API key
  // If unauthorized, return new NextResponse("Unauthorized", { status: 401 });
  return null // Return null if request should proceed
}
