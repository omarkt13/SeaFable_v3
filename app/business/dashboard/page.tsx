"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, DollarSign, Ship, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"
import type { BusinessDashboardData } from "@/types/business"
import { useAuth } from "@/components/auth-provider"

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled_user":
      case "cancelled_host":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "cancelled_user":
      case "cancelled_host":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
              <p className="text-gray-600">Manage your water activities business</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push("/business/calendar")}>
                <Calendar className="h-4 w-4 mr-2" />
                Calendar
              </Button>
              <Button onClick={() => router.push("/business/experiences/new")}>
                <Plus className="h-4 w-4 mr-2" />
                New Experience
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{dashboardData.overview.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+{dashboardData.overview.revenueGrowth}% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.overview.activeBookings}</div>
              <p className="text-xs text-muted-foreground">+{dashboardData.overview.bookingGrowth}% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Experiences Listed</CardTitle>
              <Ship className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.overview.totalExperiences}</div>
              <p className="text-xs text-muted-foreground">All active experiences</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.overview.averageRating}</div>
              <p className="text-xs text-muted-foreground">From customer reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bookings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your confirmed bookings for the next few days</CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.upcomingBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{booking.experienceTitle}</p>
                            <p className="text-sm text-gray-600">
                              {booking.customerName} • {booking.guests} guests
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming bookings</p>
                    <Button className="mt-4" onClick={() => router.push("/business/calendar")}>
                      Set Your Availability
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest customer bookings and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          {getStatusIcon(booking.status)}
                        </div>
                        <div>
                          <p className="font-medium">{booking.experienceTitle}</p>
                          <p className="text-sm text-gray-600">
                            {booking.customerName} • {booking.guests} guests
                          </p>
                          <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">€{booking.amount}</p>
                        <Badge className={getStatusColor(booking.status)}>{booking.status.replace("_", " ")}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Analytics & Earnings */}
          <div className="space-y-6">
            {/* Earnings Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Earnings</CardTitle>
                <CardDescription>Your financial overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">This Month</span>
                  <span className="text-lg font-bold">€{dashboardData.earnings.thisMonth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pending Payout</span>
                  <span className="text-sm text-yellow-600">€{dashboardData.earnings.pending.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600 mb-2">Next Payout</div>
                  <div className="text-lg font-semibold">
                    €{dashboardData.earnings.nextPayout.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(dashboardData.earnings.nextPayout.date).toLocaleDateString()}
                  </div>
                </div>
                <Button className="w-full" variant="outline" onClick={() => router.push("/business/finances")}>
                  View Financial Details
                </Button>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>Key business metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Booking Conversion</span>
                    <span className="text-sm text-green-600">{dashboardData.analytics.conversionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${dashboardData.analytics.conversionRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                    <span className="text-sm text-blue-600">{dashboardData.analytics.customerSatisfaction}/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(dashboardData.analytics.customerSatisfaction / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Repeat Customers</span>
                    <span className="text-sm text-purple-600">{dashboardData.analytics.repeatCustomerRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${dashboardData.analytics.repeatCustomerRate}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessDashboardPage
