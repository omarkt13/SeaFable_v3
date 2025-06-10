import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, businessName, businessType, phone } = body

    // Simple validation
    if (!email || !password || !firstName || !lastName || !businessName) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    // Simulate business user creation
    const businessUser = {
      id: `business-user-${Date.now()}`,
      email,
      firstName,
      lastName,
      businessId: `business-${Date.now()}`,
      businessName,
      role: "owner",
      permissions: ["manage_bookings", "manage_staff", "view_analytics", "manage_payments"],
      emailVerified: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      user: businessUser,
      token: `business-token-${Date.now()}`,
      refreshToken: `business-refresh-${Date.now()}`,
    })
  } catch (error) {
    console.error("Business registration error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
