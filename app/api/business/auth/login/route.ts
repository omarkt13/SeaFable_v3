import { NextResponse } from "next/server"
import { signInBusinessUser } from "@/lib/business-auth-utils"
import { businessLoginSchema } from "@/lib/business-validations"
import { withLogging } from "@/lib/logger"
import { authRateLimiter } from "@/lib/rate-limiter"

export const POST = withLogging(
  authRateLimiter(async (request: Request) => {
    try {
      let body
      try {
        body = await request.json()
        console.log("[SERVER] 📝 Business login request body received:", body)
      } catch (jsonError) {
        console.error("[SERVER] ❌ Error parsing business login request body:", jsonError)
        return NextResponse.json({ success: false, error: "Invalid request format" }, { status: 400 })
      }

      // Validate input using Zod
      const validation = businessLoginSchema.safeParse(body)
      if (!validation.success) {
        console.log("[SERVER] ❌ Business login input validation failed:", validation.error.errors)
        return NextResponse.json({ success: false, error: validation.error.errors[0].message }, { status: 400 })
      }

      const { email, password } = validation.data
      console.log("[SERVER] ✅ Business login input validation passed")

      console.log("[SERVER] 🔐 Attempting Supabase business sign in...")
      const result = await signInBusinessUser(email, password)

      if (result.success) {
        console.log(
          "[SERVER] ✅ Business login successful:",
          result.user
            ? { userId: result.user.id, email: result.user.email, businessName: result.user.businessName }
            : "No user data",
        )
        return NextResponse.json({ success: true, user: result.user, session: result.session }, { status: 200 })
      } else {
        console.log("[SERVER] ❌ Business login failed:", result.error)
        return NextResponse.json({ success: false, error: result.error }, { status: 401 })
      }
    } catch (error) {
      console.error("[SERVER] 💥 Business login API error:", error)
      return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
    }
  }),
)
