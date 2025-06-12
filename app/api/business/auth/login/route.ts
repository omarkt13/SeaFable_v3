import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { businessLoginSchema } from "@/lib/business-validations"

export async function POST(request: Request) {
  const startTime = Date.now()

  try {
    console.log("[BUSINESS_LOGIN] 🚀 Starting business login process")

    // Parse request body
    let body
    try {
      body = await request.json()
      console.log("[BUSINESS_LOGIN] 📝 Request received for:", body.email)
    } catch (jsonError) {
      console.error("[BUSINESS_LOGIN] ❌ Invalid JSON:", jsonError)
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request format",
        },
        { status: 400 },
      )
    }

    // Input validation
    const validation = businessLoginSchema.safeParse(body)
    if (!validation.success) {
      const errors = validation.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`)
      console.log("[BUSINESS_LOGIN] ❌ Validation failed:", errors)
      return NextResponse.json(
        {
          success: false,
          error: `Validation error: ${errors[0]}`,
        },
        { status: 400 },
      )
    }

    const { email, password } = validation.data
    console.log("[BUSINESS_LOGIN] ✅ Input validation passed")

    // Create Supabase client
    const supabase = createClient()

    // Step 1: Authenticate with Supabase Auth
    console.log("[BUSINESS_LOGIN] 🔐 Attempting Supabase authentication...")
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      console.error("[BUSINESS_LOGIN] ❌ Supabase auth failed:", authError.message)

      // Provide specific error messages
      let errorMessage = "Authentication failed"
      if (authError.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please check your credentials."
      } else if (authError.message.includes("Email not confirmed")) {
        errorMessage = "Please confirm your email address before logging in."
      } else if (authError.message.includes("Too many requests")) {
        errorMessage = "Too many login attempts. Please try again later."
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        { status: 401 },
      )
    }

    if (!authData.user) {
      console.error("[BUSINESS_LOGIN] ❌ No user returned from auth")
      return NextResponse.json(
        {
          success: false,
          error: "Authentication failed - no user data",
        },
        { status: 401 },
      )
    }

    console.log("[BUSINESS_LOGIN] ✅ Supabase auth successful for user:", authData.user.id)

    // Step 2: Fetch business profile
    console.log("[BUSINESS_LOGIN] 📊 Fetching business profile...")
    const { data: hostProfile, error: profileError } = await supabase
      .from("host_profiles")
      .select(`
        id,
        user_id,
        name,
        business_name,
        phone,
        host_type,
        bio,
        avatar_url,
        rating,
        total_reviews,
        created_at
      `)
      .eq("user_id", authData.user.id)
      .maybeSingle()

    if (profileError) {
      console.error("[BUSINESS_LOGIN] ❌ Profile fetch error:", profileError.message)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to load business profile",
        },
        { status: 500 },
      )
    }

    // Step 3: Handle missing business profile
    if (!hostProfile) {
      console.warn("[BUSINESS_LOGIN] ⚠️ No business profile found for user:", authData.user.id)

      // Check if this is a regular user trying to access business login
      const { data: regularUser } = await supabase
        .from("users")
        .select("id, role")
        .eq("id", authData.user.id)
        .maybeSingle()

      if (regularUser) {
        return NextResponse.json(
          {
            success: false,
            error: "This account is not registered as a business. Please use the customer login.",
          },
          { status: 403 },
        )
      }

      // Create minimal business user object for fallback
      const fallbackUser = {
        id: authData.user.id,
        email: authData.user.email || email,
        businessName: authData.user.user_metadata?.business_name || "Business Account",
        contactName: authData.user.user_metadata?.contact_name || "Business Contact",
        role: "host" as const,
      }

      console.log("[BUSINESS_LOGIN] 🔄 Using fallback business profile")

      return NextResponse.json(
        {
          success: true,
          user: fallbackUser,
          session: authData.session,
          warning: "Business profile incomplete. Please complete your profile setup.",
        },
        { status: 200 },
      )
    }

    // Step 4: Return successful login with complete profile
    const businessUser = {
      id: authData.user.id,
      email: authData.user.email || email,
      businessName: hostProfile.business_name || "Business",
      contactName: hostProfile.name || "Contact",
      phone: hostProfile.phone,
      businessType: hostProfile.host_type,
      description: hostProfile.bio,
      avatarUrl: hostProfile.avatar_url,
      rating: hostProfile.rating,
      totalReviews: hostProfile.total_reviews,
      role: "host" as const,
    }

    const duration = Date.now() - startTime
    console.log(`[BUSINESS_LOGIN] ✅ Login successful in ${duration}ms for:`, businessUser.businessName)

    return NextResponse.json(
      {
        success: true,
        user: businessUser,
        session: authData.session,
      },
      { status: 200 },
    )
  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[BUSINESS_LOGIN] 💥 Unexpected error after ${duration}ms:`, error)

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again.",
      },
      { status: 500 },
    )
  }
}
