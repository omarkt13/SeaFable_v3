import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

/**
 * API endpoint to verify demo credentials and database setup
 * This endpoint checks if the demo users exist and can be authenticated
 */
export async function GET() {
  try {
    // Initialize Supabase client with admin privileges
    const supabaseAdmin = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "")

    // Check if demo users exist in auth.users
    const { data: authUsers, error: authError } = await supabaseAdmin
      .from("auth.users")
      .select("id, email")
      .in("email", ["demo@seafable.com", "captain@seafable.com", "marina@seafable.com"])

    if (authError) {
      console.error("Error checking auth users:", authError)
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to verify auth users",
          error: authError.message,
        },
        { status: 500 },
      )
    }

    // Check if user profiles exist
    const { data: userProfiles, error: profilesError } = await supabaseAdmin.from("user_profiles").select("*").limit(1)

    // Check if businesses exist
    const { data: businesses, error: businessesError } = await supabaseAdmin.from("businesses").select("*").limit(1)

    // Check if business users exist
    const { data: businessUsers, error: businessUsersError } = await supabaseAdmin
      .from("business_users")
      .select("*")
      .limit(1)

    // Check if experiences exist
    const { data: experiences, error: experiencesError } = await supabaseAdmin.from("experiences").select("*").limit(1)

    // Attempt to sign in with demo credentials
    const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email: "demo@seafable.com",
      password: "password123",
    })

    // Compile verification results
    const verificationResults = {
      authUsers: {
        status: authError ? "error" : "success",
        count: authUsers?.length || 0,
        error: authError?.message,
      },
      userProfiles: {
        status: profilesError ? "error" : "success",
        exists: userProfiles && userProfiles.length > 0,
        error: profilesError?.message,
      },
      businesses: {
        status: businessesError ? "error" : "success",
        exists: businesses && businesses.length > 0,
        error: businessesError?.message,
      },
      businessUsers: {
        status: businessUsersError ? "error" : "success",
        exists: businessUsers && businessUsers.length > 0,
        error: businessUsersError?.message,
      },
      experiences: {
        status: experiencesError ? "error" : "success",
        exists: experiences && experiences.length > 0,
        error: experiencesError?.message,
      },
      authentication: {
        status: signInError ? "error" : "success",
        authenticated: !!signInData?.session,
        error: signInError?.message,
      },
    }

    // Determine overall status
    const overallStatus =
      verificationResults.authUsers.status === "error" ||
      verificationResults.userProfiles.status === "error" ||
      verificationResults.businesses.status === "error" ||
      verificationResults.businessUsers.status === "error" ||
      verificationResults.experiences.status === "error" ||
      verificationResults.authentication.status === "error"
        ? "error"
        : "success"

    return NextResponse.json({
      status: overallStatus,
      message:
        overallStatus === "success"
          ? "Demo credentials and database setup verified successfully"
          : "Issues found with demo credentials or database setup",
      results: verificationResults,
      demoCredentials: {
        customer: { email: "demo@seafable.com", password: "password123" },
        business: { email: "captain@seafable.com", password: "password123" },
        manager: { email: "marina@seafable.com", password: "password123" },
      },
    })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to verify demo credentials",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
