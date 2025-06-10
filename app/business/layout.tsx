"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { BusinessSidebar } from "@/components/business/sidebar"
import { BusinessHeader } from "@/components/business/header"

/**
 * Business Layout Component
 *
 * This layout component handles authentication and navigation for all business pages.
 * It provides a consistent structure with sidebar navigation and header for authenticated
 * business users, while allowing public access to the main business portal page.
 *
 * Features:
 * - Authentication checking and redirection
 * - Conditional layout rendering based on route
 * - Loading states during authentication verification
 * - Responsive sidebar and header layout
 */

// Routes that don't require authentication
const PUBLIC_BUSINESS_ROUTES = ["/business"]

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  /**
   * Check authentication status on mount and route changes
   * Handles redirection logic for protected routes
   */
  useEffect(() => {
    checkAuthentication()
  }, [pathname, router])

  /**
   * Authentication checking function
   * Verifies if user is authenticated and handles redirections
   */
  const checkAuthentication = () => {
    // Skip authentication check for server-side rendering
    if (typeof window === "undefined") return

    const isPublicRoute = PUBLIC_BUSINESS_ROUTES.includes(pathname)

    try {
      const businessUserData = localStorage.getItem("seafable_business_user")
      const isUserAuthenticated = !!businessUserData

      // If user is not authenticated and trying to access protected route
      if (!isUserAuthenticated && !isPublicRoute) {
        router.push("/business")
        return
      }

      // If user is authenticated and on public route, redirect to dashboard
      if (isUserAuthenticated && isPublicRoute) {
        router.push("/business/dashboard")
        return
      }

      setIsAuthenticated(isUserAuthenticated)
    } catch (error) {
      console.error("Authentication check error:", error)
      // Clear potentially corrupted data
      localStorage.removeItem("seafable_business_user")
      setIsAuthenticated(false)

      if (!isPublicRoute) {
        router.push("/business")
      }
    }
  }

  // Show loading spinner while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Render public business portal page without sidebar/header
  if (PUBLIC_BUSINESS_ROUTES.includes(pathname)) {
    return <>{children}</>
  }

  // Render protected business pages with full layout
  if (isAuthenticated) {
    return (
      <div className="flex h-screen bg-gray-50">
        <BusinessSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <BusinessHeader />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    )
  }

  // Fallback - should not reach here due to redirects above
  return null
}
