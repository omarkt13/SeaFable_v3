import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Simple demo authentication
    if (email === "demo@seafable.com" && password === "password123") {
      const user = {
        id: "demo-user-1",
        email: "demo@seafable.com",
        firstName: "Demo",
        lastName: "User",
        role: "customer",
        emailVerified: true,
        createdAt: "2024-01-01T00:00:00Z",
        lastLoginAt: new Date().toISOString(),
      }

      return NextResponse.json({
        success: true,
        user,
        token: "demo-token-123",
        refreshToken: "demo-refresh-123",
      })
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
