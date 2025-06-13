import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { handleApiError, corsHeaders } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const service = searchParams.get("service")
    const location = searchParams.get("location")
    const date = searchParams.get("date")

    const supabase = createServerSupabaseClient()

    let query = supabase.from("experiences").select("*").eq("status", "active")

    if (service) {
      query = query.ilike("activity_type", `%${service}%`)
    }

    if (location) {
      query = query.ilike("location", `%${location}%`)
    }

    const { data, error } = await query.limit(20)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500, headers: corsHeaders() })
    }

    return NextResponse.json({ experiences: data }, { headers: corsHeaders() })
  } catch (error) {
    return handleApiError(error)
  }
}
