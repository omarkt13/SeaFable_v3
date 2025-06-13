import { type NextRequest, NextResponse } from "next/server"
import { businessRegisterSchema } from "@/lib/business-validations"
import { validateRequest } from "@/lib/middleware"
import { logger } from "@/lib/logger"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
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
    const validation = validateRequest(businessRegisterSchema, body)
    if (!validation.success) {
      logger.logSecurityEvent("validation", "Invalid business registration data", {
        error: validation.error,
        ip: request.ip,
      })
      return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
    }

    // ✅ FIXED: Use contactName instead of firstName/lastName
    const {
      email,
      password,
      contactName, // ✅ Using contactName as in the schema
      businessName,
      businessType,
      phone,
      location,
      description,
    } = validation.data

    // Check if user already exists
    const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).maybeSingle()

    if (existingUser) {
      logger.logAuthEvent("Business registration attempt with existing email", undefined, {
        email,
        ip,
      })
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 409 })
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: contactName, // ✅ Using contactName
          businessName,
          businessType,
          userType: "business",
        },
        emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL
          ? `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
          : `${request.headers.get("origin") || "http://localhost:3000"}/auth/callback`,
      },
    })

    if (authError) {
      logger.logAuthEvent("Business registration auth failed", undefined, {
        email,
        error: authError.message,
        ip,
      })
      return NextResponse.json({ success: false, error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      logger.logError(new Error("No user returned from Supabase auth signup"), {
        email,
        ip,
      })
      return NextResponse.json({ success: false, error: "Failed to create user account" }, { status: 500 })
    }

    // Create user profile in database
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email: authData.user.email,
      name: contactName, // ✅ Using contactName as name
      role: "host", // Business users are hosts
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      logger.logError(new Error("Failed to create user profile"), {
        userId: authData.user.id,
        error: profileError.message,
        ip,
      })
    }

    // Create business profile
    const { error: businessError } = await supabase.from("host_profiles").insert({
      user_id: authData.user.id,
      business_name: businessName,
      business_type: businessType || "other",
      contact_phone: phone || "",
      contact_email: email,
      contact_name: contactName, // ✅ Using contactName
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (businessError) {
      logger.logError(new Error("Failed to create business profile"), {
        userId: authData.user.id,
        error: businessError.message,
        ip,
      })
    }

    logger.logAuthEvent("Business registration successful", authData.user.id, {
      email: authData.user.email,
      businessName,
      ip,
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
    logger.logError(error as Error, {
      endpoint: "business-register",
      ip: request.ip,
    })
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
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
