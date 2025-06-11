"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Anchor, Mail, Lock, User, Building, Phone, MapPin } from "lucide-react"

interface LoginFormData {
  email: string
  password: string
}

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
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  })

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/business/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Login failed")
        return
      }

      if (data.success) {
        // Store business user data
        localStorage.setItem("isBusinessAuthenticated", "true")
        localStorage.setItem("businessUser", JSON.stringify(data.user))
        router.push("/business/dashboard")
      } else {
        setError(data.error || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please try again.")
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-teal-600 rounded-full flex items-center justify-center">
            <Anchor className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">SeaFable Business</h2>
          <p className="mt-2 text-sm text-gray-600">Join our network of premium water experience providers</p>
        </div>

        <Card className="w-full">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to your business account to manage your water experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Business Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="captain@seafable.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>

                  <div className="text-center">
                    <Link href="/business/forgot-password" className="text-sm text-teal-600 hover:underline">
                      Forgot your password?
                    </Link>
                  </div>
                </form>
              </CardContent>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <CardHeader>
                <CardTitle>Join SeaFable</CardTitle>
                <CardDescription>
                  Create your business account and start offering premium water experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="business-name"
                          placeholder="Your Business"
                          className="pl-10"
                          value={registerData.businessName}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, businessName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Contact Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="contact-name"
                          placeholder="Your Name"
                          className="pl-10"
                          value={registerData.contactName}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, contactName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Business Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="contact@yourbusiness.com"
                        className="pl-10"
                        value={registerData.email}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          placeholder="+30 123 456 7890"
                          className="pl-10"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business-type">Business Type</Label>
                      <Select
                        value={registerData.businessType}
                        onValueChange={(value) => setRegisterData((prev) => ({ ...prev, businessType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="charter_operator">Charter Operator</SelectItem>
                          <SelectItem value="sailing_school">Water Sports School</SelectItem>
                          <SelectItem value="tour_operator">Tour Operator</SelectItem>
                          <SelectItem value="yacht_club">Yacht Club</SelectItem>
                          <SelectItem value="individual_captain">Individual Instructor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        placeholder="Santorini, Greece"
                        className="pl-10"
                        value={registerData.location}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, location: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us about your water sports business and the experiences you offer..."
                      value={registerData.description}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="Create password"
                          className="pl-10"
                          value={registerData.password}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm password"
                          className="pl-10"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert>
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Business Account"}
                  </Button>

                  <p className="text-xs text-gray-600 text-center">
                    By registering, you agree to our{" "}
                    <Link href="/terms" className="text-teal-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-teal-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center">
          <Link href="/" className="text-sm text-teal-600 hover:underline">
            ← Back to SeaFable
          </Link>
        </div>
      </div>
    </div>
  )
}
