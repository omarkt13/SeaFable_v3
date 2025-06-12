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
import { businessLoginSchema } from "@/lib/business-validations" // Assuming this schema exists

interface RegisterFormData {
  businessName: string
  contactName: string
  email: string
  phone: string
  businessType: string
  location: string
  description: string
  password: string
  confirmPassword: string
}

export default function BusinessAuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    location: "",
    description: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log("🔐 Business login form submitted:", { email, hasPassword: !!password })
    // Add this log to confirm the actual values being sent
    console.log("Client-side sending (Business Login):", { email, password })

    try {
      // Client-side validation
      const validation = businessLoginSchema.safeParse({ email, password })
      if (!validation.success) {
        setError(validation.error.errors[0].message)
        setIsLoading(false)
        return
      }

      console.log("📡 Making API call to /api/business/auth/login")

      const response = await fetch("/api/business/auth/login", {
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
        console.log("✅ Business login successful, redirecting to dashboard...")
        localStorage.setItem("isBusinessAuthenticated", "true")
        localStorage.setItem("businessUser", JSON.stringify(data.user)) // Ensure this user object has role
        router.push("/business/dashboard")
      } else {
        console.log("❌ Business login failed:", data.error)
        setError(data.error || "Login failed")
      }
    } catch (error) {
      console.error("💥 Business login error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    // Validation
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (registerData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/business/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
        return
      }

      if (data.success) {
        setSuccess("Registration successful! Please check your email to verify your account.")
        // Reset form
        setRegisterData({
          businessName: "",
          contactName: "",
          email: "",
          phone: "",
          businessType: "",
          location: "",
          description: "",
          password: "",
          confirmPassword: "",
        })
      } else {
        setError(data.error || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in as Business</CardTitle>
          <CardDescription className="text-center">
            Enter your business email and password to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your business email"
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
              Don't have a business account?{" "}
              <Link href="/business/register" className="font-medium text-blue-600 hover:text-blue-500">
                Register here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
