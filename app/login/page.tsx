"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff, User, AlertCircle, CheckCircle } from "lucide-react"
import { loginSchema } from "@/lib/validations"
import { logAuthEvent } from "@/lib/auth-logger"
import { useToast } from "@/hooks/use-toast" // Import useToast

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [loginAttempts, setLoginAttempts] = useState(0)
  const router = useRouter()
  const { toast } = useToast() // Initialize useToast

  // Real-time validation
  useEffect(() => {
    if (email) {
      try {
        loginSchema.pick({ email: true }).parse({ email })
        setFieldErrors((prev) => ({ ...prev, email: undefined }))
      } catch (error) {
        setFieldErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }))
      }
    }
  }, [email])

  useEffect(() => {
    if (password) {
      try {
        loginSchema.pick({ password: true }).parse({ password })
        setFieldErrors((prev) => ({ ...prev, password: undefined }))
      } catch (error) {
        setFieldErrors((prev) => ({ ...prev, password: "Password is required" }))
      }
    }
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const userAgent = navigator.userAgent
    logAuthEvent.loginAttempt(email, userAgent)

    // Client-side validation
    const validation = loginSchema.safeParse({ email, password })
    if (!validation.success) {
      const firstError = validation.error.errors[0]
      setError(firstError.message)
      setIsLoading(false)
      logAuthEvent.loginFailure(email, `Validation: ${firstError.message}`, userAgent)
      return
    }

    try {
      console.log("🔐 Customer login attempt for:", email)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      console.log("📡 Customer login response:", { success: data.success, status: response.status, user: data.user })

      if (data.success && data.user) {
        console.log("✅ Customer login successful")

        // Store user data
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("userType", "customer")

        logAuthEvent.loginSuccess(data.user.id, data.user.email, "customer")

        toast({
          title: "Login Successful",
          description: `Welcome back, ${data.user.firstName || "User"}!`,
        })

        // For regular users, always redirect to dashboard.
        // The dashboard can handle prompting for profile completion if data.user.profileComplete is false.
        router.push("/dashboard")
        router.refresh()
      } else {
        console.log("❌ Customer login failed:", data.error)
        setError(data.error || "Login failed. Please check your credentials.")
        setLoginAttempts((prev) => prev + 1)

        logAuthEvent.loginFailure(email, data.error || "Unknown error", userAgent)

        // Clear password on failed attempt
        setPassword("")
      }
    } catch (error) {
      console.error("💥 Customer login error:", error)
      const errorMessage = "Network error. Please check your connection and try again."
      setError(errorMessage)
      setLoginAttempts((prev) => prev + 1)

      logAuthEvent.authError("Network error during customer login", { email, error })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = email && password && !fieldErrors.email && !fieldErrors.password

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600">Sign in to your SeaFable account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className={fieldErrors.email ? "border-red-500" : ""}
                />
                {email && !fieldErrors.email && (
                  <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                )}
              </div>
              {fieldErrors.email && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className={fieldErrors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loginAttempts >= 3 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Multiple failed attempts detected. Please double-check your credentials or{" "}
                  <Link href="/forgot-password" className="underline">
                    reset your password
                  </Link>
                  .
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || !isFormValid}>
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

          <div className="mt-6 space-y-4">
            <div className="text-center text-sm">
              <Link href="/forgot-password" className="text-blue-600 hover:text-blue-500 underline">
                Forgot your password?
              </Link>
            </div>

            <div className="text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="text-center text-sm">
              <p className="text-gray-600">
                Business owner?{" "}
                <Link href="/business/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Business Login
                </Link>
              </p>
            </div>
          </div>

          {/* Development helper */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 p-3 bg-blue-50 rounded-md border">
              <p className="text-sm text-blue-800 font-medium">🧪 Test Credentials:</p>
              <p className="text-sm text-blue-700">Email: test.customer@seafable.com</p>
              <p className="text-sm text-blue-700">Password: TestPassword123!</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={() => {
                  setEmail("test.customer@seafable.com")
                  setPassword("TestPassword123!")
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
