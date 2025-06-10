"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Waves, Building2, Users, ArrowRight, Calendar, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"

/**
 * Unified Business Portal Landing Page
 *
 * This component serves as the central hub for all business-related activities.
 * It provides both login functionality and business registration options in a
 * single, consolidated interface.
 *
 * Features:
 * - Unified login/registration interface
 * - Tab-based navigation between login and setup
 * - Comprehensive form validation
 * - Responsive design for all devices
 * - Clear call-to-actions and demo credentials
 */
export default function BusinessPortalPage() {
  // Authentication hook for business operations
  const { businessLogin, businessRegister, isLoading } = useAuth()
  const router = useRouter()

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Registration form state
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    businessName: "",
    businessType: "sailing",
    phone: "",
  })
  const [registerError, setRegisterError] = useState("")

  // UI state
  const [activeTab, setActiveTab] = useState("login")

  /**
   * Handle business login form submission
   * Validates input and attempts authentication
   *
   * @param e - Form submission event
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    // Client-side validation
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError("Please fill in all fields")
      return
    }

    try {
      const result = await businessLogin(loginEmail, loginPassword)

      if (result.success) {
        router.push("/business/dashboard")
      } else {
        setLoginError(result.error || "Login failed")
      }
    } catch (error) {
      setLoginError("An unexpected error occurred. Please try again.")
    }
  }

  /**
   * Handle business registration form submission
   * Validates all inputs and creates new business account
   *
   * @param e - Form submission event
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError("")

    // Client-side validation
    const validation = validateRegistrationForm()
    if (!validation.isValid) {
      setRegisterError(validation.error!)
      return
    }

    try {
      const result = await businessRegister({
        email: registerData.email,
        password: registerData.password,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        businessName: registerData.businessName,
        businessType: registerData.businessType,
        phone: registerData.phone,
      })

      if (result.success) {
        router.push("/business/dashboard")
      } else {
        setRegisterError(result.error || "Registration failed")
      }
    } catch (error) {
      setRegisterError("An unexpected error occurred. Please try again.")
    }
  }

  /**
   * Validate registration form data
   * Performs comprehensive client-side validation
   *
   * @returns Validation result with isValid flag and error message
   */
  const validateRegistrationForm = (): { isValid: boolean; error?: string } => {
    const { email, password, confirmPassword, firstName, lastName, businessName, phone } = registerData

    // Required field validation
    if (!email.trim()) return { isValid: false, error: "Email is required" }
    if (!password) return { isValid: false, error: "Password is required" }
    if (!confirmPassword) return { isValid: false, error: "Please confirm your password" }
    if (!firstName.trim()) return { isValid: false, error: "First name is required" }
    if (!lastName.trim()) return { isValid: false, error: "Last name is required" }
    if (!businessName.trim()) return { isValid: false, error: "Business name is required" }
    if (!phone.trim()) return { isValid: false, error: "Phone number is required" }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { isValid: false, error: "Please enter a valid email address" }
    }

    // Password validation
    if (password.length < 6) {
      return { isValid: false, error: "Password must be at least 6 characters long" }
    }

    if (password !== confirmPassword) {
      return { isValid: false, error: "Passwords do not match" }
    }

    // Name validation
    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      return { isValid: false, error: "First and last name must be at least 2 characters" }
    }

    // Business name validation
    if (businessName.trim().length < 2) {
      return { isValid: false, error: "Business name must be at least 2 characters" }
    }

    return { isValid: true }
  }

  /**
   * Update registration form field
   *
   * @param field - Field name to update
   * @param value - New field value
   */
  const updateRegisterField = (field: string, value: string) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (registerError) setRegisterError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SeaFable</span>
            </Link>
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to main site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Portal</h1>
            <p className="text-gray-600">Manage your water sports business with our comprehensive platform</p>
          </div>

          {/* Main Card with Tabs */}
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login" className="text-sm">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="register" className="text-sm">
                    Get Started
                  </TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="mt-6">
                  <CardTitle className="text-xl text-center mb-2">Welcome Back</CardTitle>
                  <CardDescription className="text-center">Sign in to your business account</CardDescription>

                  <form onSubmit={handleLogin} className="space-y-4 mt-6">
                    {loginError && (
                      <Alert variant="destructive">
                        <AlertDescription>{loginError}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="login-email">Business Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => {
                          setLoginEmail(e.target.value)
                          if (loginError) setLoginError("")
                        }}
                        placeholder="captain@yourcompany.com"
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => {
                          setLoginPassword(e.target.value)
                          if (loginError) setLoginError("")
                        }}
                        placeholder="Enter your password"
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>

                  {/* Demo Credentials */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-2">Demo Account:</p>
                    <p className="text-xs text-blue-800">
                      Email: captain@seafable.com
                      <br />
                      Password: password123
                    </p>
                  </div>
                </TabsContent>

                {/* Registration Tab */}
                <TabsContent value="register" className="mt-6">
                  <CardTitle className="text-xl text-center mb-2">Start Your Journey</CardTitle>
                  <CardDescription className="text-center">Create your business account in minutes</CardDescription>

                  <form onSubmit={handleRegister} className="space-y-4 mt-6">
                    {registerError && (
                      <Alert variant="destructive">
                        <AlertDescription>{registerError}</AlertDescription>
                      </Alert>
                    )}

                    {/* Personal Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={registerData.firstName}
                          onChange={(e) => updateRegisterField("firstName", e.target.value)}
                          placeholder="John"
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={registerData.lastName}
                          onChange={(e) => updateRegisterField("lastName", e.target.value)}
                          placeholder="Doe"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => updateRegisterField("email", e.target.value)}
                        placeholder="captain@yourcompany.com"
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => updateRegisterField("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        disabled={isLoading}
                        required
                      />
                    </div>

                    {/* Business Information */}
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        value={registerData.businessName}
                        onChange={(e) => updateRegisterField("businessName", e.target.value)}
                        placeholder="Ocean Adventures"
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type</Label>
                      <select
                        id="businessType"
                        value={registerData.businessType}
                        onChange={(e) => updateRegisterField("businessType", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                        required
                      >
                        <option value="sailing">Sailing School</option>
                        <option value="watersports">Water Sports Rental</option>
                        <option value="fishing">Fishing Charters</option>
                        <option value="diving">Diving Center</option>
                        <option value="yacht">Yacht Charter</option>
                        <option value="marina">Marina Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Password Fields */}
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => updateRegisterField("password", e.target.value)}
                        placeholder="Create a secure password"
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => updateRegisterField("confirmPassword", e.target.value)}
                        placeholder="Confirm your password"
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Business Account"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Looking for customer login?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                Contact support
              </Link>
            </p>
          </div>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Booking Management</h3>
              <p className="text-xs text-gray-600 mt-1">Streamline your reservations</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Team Management</h3>
              <p className="text-xs text-gray-600 mt-1">Manage staff and captains</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Analytics</h3>
              <p className="text-xs text-gray-600 mt-1">Track your performance</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
