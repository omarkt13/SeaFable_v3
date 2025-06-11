import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "./supabase"

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse>,
) {
  try {
    const supabase = createServerSupabaseClient()

    // Get the authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "Missing or invalid authorization header" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // Verify the JWT token
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)

    if (error || !user) {
      return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 401 })
    }

    // Get user data from our users table
    const { data: userData, error: userError } = await supabase.from("users").select("*").eq("id", user.id).single()

    if (userError || !userData) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    return handler(request, userData)
  } catch (error) {
    console.error("Auth middleware error:", error)
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 })
  }
}

export function validateRequest<T>(
  schema: any,
  data: any,
): { success: true; data: T } | { success: false; error: string } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error: any) {
    const errorMessage = error.errors?.[0]?.message || "Invalid request data"
    return { success: false, error: errorMessage }
  }
}
