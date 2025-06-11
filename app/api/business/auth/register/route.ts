import { type NextRequest, NextResponse } from "next/server"
import { registerBusinessUser } from "@/lib/business-auth-utils"
import { businessRegisterSchema } from "@/lib/business-validations"
import { validateRequest } from "@/lib/middleware"
import { withRateLimit, authRateLimiter } from "@/lib/rate-limiter"
import { withSecurity } from "@/lib/security"
import { withLogging, logger } from "@/lib/logger"

async function businessRegisterHandler(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request data
    const validation = validateRequest(businessRegisterSchema, body)
    if (!validation.success) {
      logger.logSecurityEvent("Invalid business registration data", {
        error: validation.error,
        ip: request.ip,
      })
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    const result = await registerBusinessUser(validation.data)

    if (!result.success) {
      logger.logAuthEvent("Business registration failed", undefined, {
        email: validation.data.email,
        error: result.error,
        ip: request.ip,
      })
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    logger.logAuthEvent("Business registration successful", result.user?.id, {
      email: validation.data.email,
    })

    return NextResponse.json({
      success: true,
      message: result.needsEmailConfirmation
        ? "Registration successful! Please check your email to verify your account."
        : "Registration successful!",
    })
  } catch (error) {
    logger.logError(error as Error, {
      endpoint: "business-register",
      ip: request.ip,
    })
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return withRateLimit(request, authRateLimiter, () => withSecurity(withLogging(businessRegisterHandler))(request))
}
