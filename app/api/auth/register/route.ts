import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName } = body

    // Simple validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    // Simulate user creation
    const user = {
      id: `user-${Date.now()}`,
      email,
      firstName,
      lastName,
      role: "customer",
      emailVerified: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      user,
      token: `token-${Date.now()}`,
      refreshToken: `refresh-${Date.now()}`,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
