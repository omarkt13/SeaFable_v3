"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BusinessDashboardData } from "@/types/business"
import { useAuth } from "@/components/auth-provider"
import { WelcomeBanner } from "@/components/business/dashboard/welcome-banner"
import { StatsOverview } from "@/components/business/dashboard/stats-overview"
import { QuickActions } from "@/components/business/dashboard/quick-actions"
import { BookingSummary } from "@/components/business/dashboard/booking-summary"
import { WeatherForecast } from "@/components/business/dashboard/weather-forecast"
import { EarningsSummary } from "@/components/business/dashboard/earnings-summary"
import { PerformanceMetrics } from "@/components/business/dashboard/performance-metrics"

function BusinessDashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<BusinessDashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== "host") {
        router.push("/business/login")
        return
      }
      loadDashboardData()
    }
  }, [user, authLoading, router])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/business/dashboard")

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/business/login")
          return
        }
        throw new Error("Failed to load dashboard data")
      }

      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error("Error loading dashboard:", error)
      setError(error instanceof Error ? error.message : "Unknown error")
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your business dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => loadDashboardData()}>Try Again</Button>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <WelcomeBanner user={user} businessName="SeaFable Host" setupProgress={75} hasNotifications={true} />

        {/* Stats Overview */}
        <StatsOverview stats={dashboardData.overview} />

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bookings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <BookingSummary
              upcomingBookings={dashboardData.upcomingBookings}
              recentBookings={dashboardData.recentBookings}
            />

            {/* Weather Forecast */}
            <WeatherForecast />
          </div>

          {/* Right Column - Analytics & Earnings */}
          <div className="space-y-6">
            {/* Earnings Summary */}
            <EarningsSummary earnings={dashboardData.earnings} />

            {/* Performance Metrics */}
            <PerformanceMetrics analytics={dashboardData.analytics} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessDashboardPage
