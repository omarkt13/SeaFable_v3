import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { businessLoginSchema } from "@/lib/business-validations"

// Helper function to determine if onboarding is needed
const checkBusinessOnboardingStatus = (hostProfile: any): boolean => {
  if (!hostProfile) return true // No profile means onboarding needed
  // Add more checks for essential fields if necessary
  // For example, if bio or phone is missing
  if (!hostProfile.business_name || !hostProfile.name || !hostProfile.phone || !hostProfile.bio) {
    return true
  }
  return false // Profile seems complete enough
}

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

    // Special handling for test credentials in development
    if (
      process.env.NODE_ENV === "development" &&
      email === "test.business@seafable.com" &&
      password === "TestPassword123!"
    ) {
      console.log("[BUSINESS_LOGIN] 🧪 Using test business credentials in development mode")

      // Check if test user exists in auth
      const {
        data: { user: existingAuthUser },
      } = await supabase.auth.admin.getUserByEmail(email)

      // If test user doesn't exist in auth, create it
      if (!existingAuthUser) {
        console.log("[BUSINESS_LOGIN] 🧪 Creating test business user in auth")
        try {
          // Create test user in auth
          const { data: authCreationData, error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
              business_name: "Test Business",
              contact_name: "Test Contact",
            },
          })

          if (createError) {
            console.error("[BUSINESS_LOGIN] ❌ Failed to create test user in auth:", createError.message)
          } else if (authCreationData.user) {
            console.log("[BUSINESS_LOGIN] ✅ Created test auth user:", authCreationData.user.id)

            // Create user in users table
            const { error: userError } = await supabase.from("users").insert({
              id: authCreationData.user.id,
              email: email,
              first_name: "Test",
              last_name: "Contact",
              role: "host",
            })

            if (userError) {
              console.error("[BUSINESS_LOGIN] ❌ Failed to create user record:", userError.message)
            } else {
              console.log("[BUSINESS_LOGIN] ✅ Created user record in users table")

              // Create host profile
              const { error: profileError } = await supabase.from("host_profiles").insert({
                id: authCreationData.user.id,
                user_id: authCreationData.user.id,
                name: "Test Contact",
                business_name: "Test Business",
                phone: "+1234567890",
                host_type: "company",
                bio: "This is a test business account for onboarding.", // Intentionally leave some fields for onboarding
                rating: 0, // New businesses start with 0
                total_reviews: 0,
              })

              if (profileError) {
                console.error("[BUSINESS_LOGIN] ❌ Failed to create test profile:", profileError.message)
              } else {
                console.log("[BUSINESS_LOGIN] ✅ Created test business profile (partially complete for onboarding)")
              }
            }
          }
        } catch (createError) {
          console.error("[BUSINESS_LOGIN] ❌ Error creating test user:", createError)
        }
      }
    }

    // Step 1: Authenticate with Supabase Auth
    console.log("[BUSINESS_LOGIN] 🔐 Attempting Supabase authentication...")
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      console.error("[BUSINESS_LOGIN] ❌ Supabase auth failed:", authError.message)
      return NextResponse.json(
        {
          success: false,
          error: authError.message.includes("Invalid login credentials")
            ? "Invalid email or password."
            : "Authentication failed.",
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

    // Step 2: Check/Create user record in 'users' table
    const { data: userRecord, error: userSelectError } = await supabase
      .from("users")
      .select("id, role")
      .eq("id", authData.user.id)
      .maybeSingle()

    if (userSelectError) {
      console.error("[BUSINESS_LOGIN] ❌ Error fetching user from 'users' table:", userSelectError.message)
      // Decide if this is critical, for now, we'll try to proceed
    }

    if (!userRecord) {
      console.log("[BUSINESS_LOGIN] User not found in 'users' table, creating...")
      const { error: userInsertError } = await supabase.from("users").insert({
        id: authData.user.id,
        email: authData.user.email,
        role: "host", // Business users are hosts
        first_name: authData.user.user_metadata?.contact_name?.split(" ")[0] || "Business",
        last_name: authData.user.user_metadata?.contact_name?.split(" ").slice(1).join(" ") || "User",
      })
      if (userInsertError) {
        console.error("[BUSINESS_LOGIN] ❌ Failed to insert user into 'users' table:", userInsertError.message)
        return NextResponse.json({ success: false, error: "Failed to initialize user account." }, { status: 500 })
      }
    } else if (userRecord.role !== "host") {
      console.warn(
        `[BUSINESS_LOGIN] User ${authData.user.id} exists but has role ${userRecord.role}. Updating to 'host'.`,
      )
      const { error: roleUpdateError } = await supabase
        .from("users")
        .update({ role: "host" })
        .eq("id", authData.user.id)
      if (roleUpdateError) {
        console.error("[BUSINESS_LOGIN] ❌ Failed to update user role to 'host':", roleUpdateError.message)
      }
    }

    // Step 3: Fetch business profile
    console.log("[BUSINESS_LOGIN] 📊 Fetching business profile...")
    let { data: hostProfile, error: profileError } = await supabase
      .from("host_profiles")
      .select(`*`) // Select all for onboarding check
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

    let needsOnboarding = checkBusinessOnboardingStatus(hostProfile)

    // Step 4: Handle missing/incomplete business profile
    if (!hostProfile) {
      console.warn("[BUSINESS_LOGIN] ⚠️ No business profile found for user:", authData.user.id)
      console.log("[BUSINESS_LOGIN] 🔄 Creating minimal host profile for user:", authData.user.id)
      const { data: newHostProfileData, error: createProfileError } = await supabase
        .from("host_profiles")
        .insert({
          id: authData.user.id, // Ensure this ID is unique and typically same as user_id
          user_id: authData.user.id,
          name: authData.user.user_metadata?.contact_name || "Business Contact",
          business_name: authData.user.user_metadata?.business_name || "Business Account",
          host_type: "company", // Default
          // Other fields will be null/default, prompting onboarding
        })
        .select()
        .single() // select the newly created profile

      if (createProfileError) {
        console.error("[BUSINESS_LOGIN] ❌ Failed to create host profile:", createProfileError.message)
        return NextResponse.json(
          {
            success: false,
            error: "Failed to initialize business profile. Please contact support.",
          },
          { status: 500 },
        )
      }
      hostProfile = newHostProfileData // Use the newly created profile
      needsOnboarding = true // Definitely needs onboarding
      console.log("[BUSINESS_LOGIN] ✅ Created minimal host profile for user:", authData.user.id)
    }

    const businessUser = {
      id: authData.user.id,
      email: authData.user.email || email,
      businessName: hostProfile?.business_name || "Business",
      contactName: hostProfile?.name || "Contact",
      phone: hostProfile?.phone,
      businessType: hostProfile?.host_type,
      description: hostProfile?.bio,
      avatarUrl: hostProfile?.avatar_url,
      rating: hostProfile?.rating,
      totalReviews: hostProfile?.total_reviews,
      role: "host" as const,
    }

    const duration = Date.now() - startTime
    console.log(
      `[BUSINESS_LOGIN] ✅ Login successful in ${duration}ms for:`,
      businessUser.businessName,
      `Needs Onboarding: ${needsOnboarding}`,
    )

    return NextResponse.json(
      {
        success: true,
        user: businessUser,
        session: authData.session,
        needsOnboarding: needsOnboarding,
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
