import { type NextRequest, NextResponse } from "next/server"
import { registerUser } from "@/lib/auth-utils"
import { registerSchema } from "@/lib/validations"
import { validateRequest } from "@/lib/middleware"
import { withRateLimit, authRateLimiter } from "@/lib/rate-limiter"
import { withSecurity } from "@/lib/security"
import { withLogging, logger } from "@/lib/logger"

async function registerHandler(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request data
    const validation = validateRequest(registerSchema, body)
    if (!validation.success) {
      logger.logSecurityEvent("Invalid registration data", {
        error: validation.error,
        ip: request.ip,
      })
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    const { firstName, lastName, email, password } = validation.data

    logger.logAuthEvent("Registration attempt", undefined, { email })

    // Register the user
    const result = await registerUser({
      firstName,
      lastName,
      email,
      password,
    })

    if (!result.success) {
      logger.logAuthEvent("Registration failed", undefined, {
        email,
        error: result.error,
      })
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    logger.logAuthEvent("Registration successful", result.user?.id, { email })

    return NextResponse.json({
      success: true,
      message: result.needsEmailConfirmation
        ? "Registration successful! Please check your email to confirm your account."
        : "Registration successful!",
      needsEmailConfirmation: result.needsEmailConfirmation,
    })
  } catch (error) {
    logger.logError(error as Error, {
      endpoint: "register",
      ip: request.ip,
    })
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return withRateLimit(request, authRateLimiter, () => withSecurity(withLogging(registerHandler))(request))
}
