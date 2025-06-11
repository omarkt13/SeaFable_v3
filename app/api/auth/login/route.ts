import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { loginSchema } from "@/lib/validations"
import { logger } from "@/lib/logger"

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Login API called")

    const body = await request.json()
    console.log("📝 Request body received:", { email: body.email, hasPassword: !!body.password })

    // Validate input
    const validatedData = loginSchema.parse(body)
    const { email, password } = validatedData
    console.log("✅ Input validation passed")

    // Attempt to sign in with Supabase
    console.log("🔐 Attempting Supabase sign in...")
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("❌ Supabase auth error:", error)
      logger.warn("Login attempt failed", {
        email,
        error: error.message,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        {
          success: false,
          error: error.message || "Invalid email or password",
        },
        { status: 401 },
      )
    }

    if (!data.user) {
      console.error("❌ No user returned from Supabase")
      return NextResponse.json(
        {
          success: false,
          error: "Authentication failed - no user data",
        },
        { status: 401 },
      )
    }

    console.log("✅ Supabase auth successful:", {
      userId: data.user.id,
      email: data.user.email,
      emailConfirmed: data.user.email_confirmed_at !== null,
    })

    // Check if user is confirmed
    if (!data.user.email_confirmed_at) {
      console.warn("⚠️ User email not confirmed")
      return NextResponse.json(
        {
          success: false,
          error: "Please confirm your email address before signing in",
        },
        { status: 401 },
      )
    }

    logger.info("User logged in successfully", {
      userId: data.user.id,
      email: data.user.email,
      timestamp: new Date().toISOString(),
    })

    console.log("✅ Login successful, returning session data")

    // Return success with user data
    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        emailVerified: data.user.email_confirmed_at !== null,
      },
      session: {
        accessToken: data.session?.access_token,
        refreshToken: data.session?.refresh_token,
        expiresAt: data.session?.expires_at,
      },
    })
  } catch (error) {
    console.error("💥 Login API error:", error)

    logger.error("Login API error", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    })

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input data",
          details: error.message,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
