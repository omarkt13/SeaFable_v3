import { NextResponse } from "next/server"
import { createAdminSupabaseClient } from "@/lib/supabase"

export async function POST() {
  try {
    const adminClient = createAdminSupabaseClient()

    // Create a test user in Supabase Auth
    const { data, error } = await adminClient.auth.admin.createUser({
      email: "test@example.com",
      password: "password123",
      email_confirm: true, // Auto-confirm the email
      user_metadata: {
        first_name: "Test",
        last_name: "User",
      },
    })

    if (error) {
      console.error("Error creating test user:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    // Also create user in our users table
    const { error: dbError } = await adminClient.from("users").insert({
      id: data.user.id,
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      role: "user",
    })

    if (dbError) {
      console.warn("User created in auth but not in users table:", dbError)
    }

    return NextResponse.json({
      success: true,
      message: "Test user created successfully",
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    })
  } catch (error) {
    console.error("Create test user error:", error)
    return NextResponse.json({ success: false, error: "Failed to create test user" }, { status: 500 })
  }
}
