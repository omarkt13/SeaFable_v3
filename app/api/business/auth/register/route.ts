import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { businessRegisterSchema } from "@/lib/business-validations"
import { logger } from "@/lib/logger"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = businessRegisterSchema.parse(body)
    const { email, password, businessName, firstName, lastName, hostType } = validatedData

    // Check if user already exists
    const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).single()

    if (existingUser) {
      logger.logSecurityEvent({
        eventType: "registration-attempt",
        outcome: "failed",
        reason: "email-exists",
        metadata: {
          email,
          businessName,
          timestamp: new Date().toISOString(),
        },
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`,
          business_name: businessName,
        },
        emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL
          ? `${process.env.NEXT_PUBLIC_APP_URL}/business/auth/callback`
          : `${request.headers.get("origin") || "http://localhost:3000"}/business/auth/callback`,
      },
    })

    if (error) {
      logger.warn("Business registration attempt failed", {
        email,
        businessName,
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
          error: "Failed to create business account",
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
      role: "host",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      logger.error("Failed to create business user profile", {
        userId: data.user.id,
        error: profileError.message,
        timestamp: new Date().toISOString(),
      })
    }

    // Create host profile
    const { error: hostProfileError } = await supabase.from("host_profiles").insert({
      user_id: data.user.id,
      name: businessName,
      host_type: hostType || "company",
      business_name: businessName,
      rating: 0,
      total_reviews: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (hostProfileError) {
      logger.error("Failed to create host profile", {
        userId: data.user.id,
        error: hostProfileError.message,
        timestamp: new Date().toISOString(),
      })
    }

    logger.info("Business registered successfully", {
      userId: data.user.id,
      email: data.user.email,
      businessName,
      timestamp: new Date().toISOString(),
    })

    // Return success
    return NextResponse.json({
      success: true,
      message: "Business account created successfully. Please check your email to verify your account.",
      user: {
        id: data.user.id,
        email: data.user.email,
        businessName,
        emailVerified: false,
      },
      requiresVerification: !data.session, // If no session, email verification required
    })
  } catch (error) {
    logger.error("Business registration API error", {
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
