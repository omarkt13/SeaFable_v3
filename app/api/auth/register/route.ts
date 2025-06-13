import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { registerSchema } from "@/lib/validations"
import { logger } from "@/lib/logger"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = registerSchema.parse(body)
    const { email, password, firstName, lastName } = validatedData

    // Check if user already exists
    const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).single()

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User with this email already exists",
        },
        { status: 409 },
      )
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`,
        },
        emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL
          ? `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
          : `${request.headers.get("origin") || "http://localhost:3000"}/auth/callback`,
      },
    })

    if (error) {
      logger.warn("Registration attempt failed", {
        email,
        error: error.message,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 },
      )
    }

    if (!data.user) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to create user account",
        },
        { status: 500 },
      )
    }

    // Create user profile in database - updated to match schema
    const { error: profileError } = await supabase.from("users").insert({
      id: data.user.id,
      email: data.user.email || email,
      full_name: `${firstName} ${lastName}`,
      avatar_url: null,
      role: "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      logger.error("Failed to create user profile", {
        userId: data.user.id,
        error: profileError.message,
        timestamp: new Date().toISOString(),
      })

      // Note: User is created in auth but profile creation failed
      // This should be handled by a background job or retry mechanism
    }

    logger.info("User registered successfully", {
      userId: data.user.id,
      email: data.user.email,
      timestamp: new Date().toISOString(),
    })

    // Return success
    return NextResponse.json({
      success: true,
      message: "Account created successfully. Please check your email to verify your account.",
      user: {
        id: data.user.id,
        email: data.user.email,
        emailVerified: false,
      },
      requiresVerification: !data.session, // If no session, email verification required
    })
  } catch (error) {
    logger.error("Registration API error", {
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
