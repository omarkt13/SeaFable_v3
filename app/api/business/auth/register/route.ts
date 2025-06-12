import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { businessRegisterSchema } from "@/lib/business-validations"
import { logger } from "@/lib/logger"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check (simplified for direct export)
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

    // Parse request body
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      logger.error("Failed to parse request body", {
        error: parseError instanceof Error ? parseError.message : "Unknown parse error",
        ip,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
    }

    // Validate request data
    const validation = businessRegisterSchema.safeParse(body)
    if (!validation.success) {
      logger.warn("Invalid business registration data", {
        error: validation.error.errors,
        ip,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input data",
          details: validation.error.errors,
        },
        { status: 400 },
      )
    }

    const { email, password, firstName, lastName, businessName, businessType, phone } = validation.data

    // Check if user already exists
    const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).single()

    if (existingUser) {
      logger.warn("Business registration attempt with existing email", {
        email,
        ip,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json(
        {
          success: false,
          error: "User with this email already exists",
        },
        { status: 409 },
      )
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          user_type: "business",
        },
        emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL
          ? `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
          : `${request.headers.get("origin") || "http://localhost:3000"}/auth/callback`,
      },
    })

    if (authError) {
      logger.warn("Business registration auth failed", {
        email,
        error: authError.message,
        ip,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json(
        {
          success: false,
          error: authError.message,
        },
        { status: 400 },
      )
    }

    if (!authData.user) {
      logger.error("No user returned from Supabase auth signup", {
        email,
        ip,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json(
        {
          success: false,
          error: "Failed to create user account",
        },
        { status: 500 },
      )
    }

    // Create user profile in database
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email: authData.user.email,
      first_name: firstName,
      last_name: lastName,
      role: "host", // Business users are hosts
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      logger.error("Failed to create user profile", {
        userId: authData.user.id,
        error: profileError.message,
        ip,
        timestamp: new Date().toISOString(),
      })
    }

    // Create business profile
    const { error: businessError } = await supabase.from("host_profiles").insert({
      id: authData.user.id,
      business_name: businessName,
      business_type: businessType,
      contact_phone: phone,
      contact_email: email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (businessError) {
      logger.error("Failed to create business profile", {
        userId: authData.user.id,
        error: businessError.message,
        ip,
        timestamp: new Date().toISOString(),
      })
    }

    logger.info("Business user registered successfully", {
      userId: authData.user.id,
      email: authData.user.email,
      businessName,
      ip,
      timestamp: new Date().toISOString(),
    })

    // Return success
    return NextResponse.json({
      success: true,
      message: authData.session
        ? "Business account created successfully!"
        : "Business account created! Please check your email to verify your account.",
      user: {
        id: authData.user.id,
        email: authData.user.email,
        emailVerified: !!authData.session,
      },
      requiresVerification: !authData.session,
    })
  } catch (error) {
    logger.error("Business registration API error", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      ip: request.ip || "unknown",
      timestamp: new Date().toISOString(),
    })

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
