import { type NextRequest, NextResponse } from "next/server"
import { signInUser } from "@/lib/auth-utils"
import { loginSchema } from "@/lib/validations"
import { validateRequest } from "@/lib/middleware"
import { withRateLimit, authRateLimiter } from "@/lib/rate-limiter"
import { withSecurity } from "@/lib/security"
import { withLogging, logger } from "@/lib/logger"

async function loginHandler(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request data
    const validation = validateRequest(loginSchema, body)
    if (!validation.success) {
      logger.logSecurityEvent("Invalid login data", {
        error: validation.error,
        ip: request.ip,
      })
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    const { email, password } = validation.data

    logger.logAuthEvent("Login attempt", undefined, { email })

    // Sign in the user
    const result = await signInUser(email, password)

    if (!result.success) {
      logger.logAuthEvent("Login failed", undefined, {
        email,
        error: result.error,
        ip: request.ip,
      })
      return NextResponse.json({ success: false, error: result.error }, { status: 401 })
    }

    logger.logAuthEvent("Login successful", result.user?.id, { email })

    return NextResponse.json({
      success: true,
      user: result.user,
      session: result.session,
    })
  } catch (error) {
    logger.logError(error as Error, {
      endpoint: "login",
      ip: request.ip,
    })
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return withRateLimit(request, authRateLimiter, () => withSecurity(withLogging(loginHandler))(request))
}
