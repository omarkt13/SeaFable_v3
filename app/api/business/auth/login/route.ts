import { type NextRequest, NextResponse } from "next/server"
import { signInBusinessUser } from "@/lib/business-auth-utils"
import { businessLoginSchema } from "@/lib/business-validations"
import { validateRequest } from "@/lib/middleware"
import { withRateLimit, authRateLimiter } from "@/lib/rate-limiter"
import { withSecurity } from "@/lib/security"
import { withLogging, logger } from "@/lib/logger"

async function businessLoginHandler(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request data
    const validation = validateRequest(businessLoginSchema, body)
    if (!validation.success) {
      logger.logSecurityEvent("Invalid business login data", {
        error: validation.error,
        ip: request.ip,
      })
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    const { email, password } = validation.data

    logger.logAuthEvent("Business login attempt", undefined, { email })

    // Sign in the business user
    const result = await signInBusinessUser(email, password)

    if (!result.success) {
      logger.logAuthEvent("Business login failed", undefined, {
        email,
        error: result.error,
        ip: request.ip,
      })
      return NextResponse.json({ success: false, error: result.error }, { status: 401 })
    }

    logger.logAuthEvent("Business login successful", result.user?.id, { email })

    return NextResponse.json({
      success: true,
      user: result.user,
      session: result.session,
    })
  } catch (error) {
    logger.logError(error as Error, {
      endpoint: "business-login",
      ip: request.ip,
    })
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return withRateLimit(request, authRateLimiter, () => withSecurity(withLogging(businessLoginHandler))(request))
}
