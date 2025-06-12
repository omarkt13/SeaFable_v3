import { NextResponse } from "next/server"
import { signInUser } from "@/lib/auth-utils"
import { loginSchema } from "@/lib/validations"
import { withLogging } from "@/lib/logger"
import { authRateLimiter } from "@/lib/rate-limiter"

export const POST = withLogging(
  authRateLimiter(async (request: Request) => {
    try {
      let body
      try {
        body = await request.json()
        console.log("[SERVER] 📝 Request body received:", body)
      } catch (jsonError) {
        console.error("[SERVER] ❌ Error parsing request body:", jsonError)
        return NextResponse.json({ success: false, error: "Invalid request format" }, { status: 400 })
      }

      // Validate input using Zod
      const validation = loginSchema.safeParse(body)
      if (!validation.success) {
        console.log("[SERVER] ❌ Input validation failed:", validation.error.errors)
        return NextResponse.json({ success: false, error: validation.error.errors[0].message }, { status: 400 })
      }

      const { email, password } = validation.data
      console.log("[SERVER] ✅ Input validation passed")

      console.log("[SERVER] 🔐 Attempting Supabase sign in...")
      const result = await signInUser(email, password)

      if (result.success) {
        console.log(
          "[SERVER] ✅ Supabase auth successful:",
          result.user ? { userId: result.user.id, email: result.user.email, role: result.user.role } : "No user data",
        )
        console.log("[SERVER] ✅ Login successful, returning session data")
        // IMPORTANT: Return the full user object from signInUser, which includes role, firstName, etc.
        return NextResponse.json({ success: true, user: result.user, session: result.session }, { status: 200 })
      } else {
        console.log("[SERVER] ❌ Supabase auth failed:", result.error)
        return NextResponse.json({ success: false, error: result.error }, { status: 401 })
      }
    } catch (error) {
      console.error("[SERVER] 💥 Login API error:", error)
      return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
    }
  }),
)
