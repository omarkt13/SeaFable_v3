"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log("🔐 Login form submitted:", { email, hasPassword: !!password })

    try {
      console.log("📡 Making API call to /api/auth/login")

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      console.log("📡 API response status:", response.status)

      const data = await response.json()
      console.log("📡 API response data:", data)

      if (data.success) {
        console.log("✅ Login successful, redirecting to dashboard...")
        router.push("/dashboard")
      } else {
        console.log("❌ Login failed:", data.error)
        setError(data.error || "Login failed")
      }
    } catch (error) {
      console.error("💥 Login error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>

          {/* Development helper */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800 font-medium">🧪 Test Credentials:</p>
              <p className="text-sm text-blue-700">Email: test@example.com</p>
              <p className="text-sm text-blue-700">Password: password123</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={() => {
                  setEmail("test@example.com")
                  setPassword("password123")
                }}
              >
                Fill Test Credentials
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
