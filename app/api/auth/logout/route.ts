import { type NextRequest, NextResponse } from "next/server"
import { signOutUser } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const result = await signOutUser()

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Successfully signed out",
    })
  } catch (error) {
    console.error("Logout API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
