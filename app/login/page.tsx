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
import { Anchor } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("emma.johnson@email.com")
  const [password, setPassword] = useState("password123")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple mock authentication
    if (email === "emma.johnson@email.com" && password === "password123") {
      // Store simple auth state in localStorage for demo
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          email: "emma.johnson@email.com",
          name: "Emma Johnson",
        }),
      )

      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Anchor className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Sign in to SailVoyage</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-800">
              <strong>Demo credentials:</strong>
              <br />
              Email: emma.johnson@email.com
              <br />
              Password: password123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
