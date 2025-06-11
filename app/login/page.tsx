"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Anchor, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for success message from registration
    const message = searchParams.get("message")
    if (message) {
      setSuccess(message)
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear errors when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    console.log("🔐 Login form submitted:", { email: formData.email, hasPassword: !!formData.password })

    try {
      console.log("📡 Making API call to /api/auth/login")

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      console.log("📡 API response status:", response.status)

      const result = await response.json()
      console.log("📡 API response data:", { success: result.success, error: result.error })

      if (!result.success) {
        console.error("❌ Login failed:", result.error)
        setError(result.error || "Login failed")
        return
      }

      console.log("✅ Login successful, setting session...")

      // Store session in Supabase client
      if (result.session) {
        console.log("💾 Setting Supabase session...")
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: result.session.accessToken,
          refresh_token: result.session.refreshToken,
        })

        if (sessionError) {
          console.error("❌ Session error:", sessionError)
          setError("Failed to establish session")
          return
        }

        console.log("✅ Session set successfully")
      }

      console.log("🔄 Redirecting to dashboard...")
      // Redirect to dashboard
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("💥 Login error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Anchor className="h-8 w-8 text-teal-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Sign in to SeaFable</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-teal-600 hover:text-teal-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Debug info in development */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
              <p>Debug: Check browser console for detailed logs</p>
              <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}</p>
              <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
